# run_model.py

from config import AQI_STATIONS, OPENWEATHER_API_KEY
from fetch_current_api import fetch_current_aqi
from synthetic import generate_synthetic_history
from train_forecast import train_prophet, predict_future
from spatial_interpolation import idw_interpolation
from confidence import compute_confidence
from station_influence import station_influence
from datetime import datetime
from seasonality import seasonal_multiplier
from confidence_explainer import explain_confidence



month = datetime.now().month
season_factor = seasonal_multiplier(month)




def fetch_station_data(station):
    """
    Fetch current AQI for a station and generate synthetic history.
    """
    current_aqi = fetch_current_aqi(
        station["lat"],
        station["lon"],
        OPENWEATHER_API_KEY
    )

    df = generate_synthetic_history(current_aqi)
    df["station_id"] = station["id"]
    return df


def run_model(user_lat, user_lon):
    """
    Returns AQI forecast + confidence for 1, 3, 6 months
    """
    station_predictions = []

    # -------- Train model for each station --------
    for station in AQI_STATIONS:
        df = fetch_station_data(station)

        if len(df) < 30:
            continue

        model = train_prophet(df)

        pred_1m = predict_future(model, 30).iloc[-1]["yhat"]
        pred_3m = predict_future(model, 90).iloc[-1]["yhat"]
        pred_6m = predict_future(model, 180).iloc[-1]["yhat"]

        station_predictions.append({
            "lat": station["lat"],
            "lon": station["lon"],
            "aqi_1m": pred_1m,
            "aqi_3m": pred_3m,
            "aqi_6m": pred_6m
        })

    # -------- Spatial interpolation --------
    aqi_1m = idw_interpolation(
        user_lat, user_lon,
        [{"lat": s["lat"], "lon": s["lon"], "aqi": s["aqi_1m"]} for s in station_predictions]
    )

    aqi_3m = idw_interpolation(
        user_lat, user_lon,
        [{"lat": s["lat"], "lon": s["lon"], "aqi": s["aqi_3m"]} for s in station_predictions]
    )

    aqi_6m = idw_interpolation(
        user_lat, user_lon,
        [{"lat": s["lat"], "lon": s["lon"], "aqi": s["aqi_6m"]} for s in station_predictions]
    )

    aqi_1m *= season_factor
    aqi_3m *= season_factor
    aqi_6m *= season_factor

    # -------- Confidence --------
    confidence_1m = compute_confidence(
        user_lat, user_lon, AQI_STATIONS, horizon_months=1
    )

    confidence_3m = compute_confidence(
        user_lat, user_lon, AQI_STATIONS, horizon_months=3
    )

    confidence_6m = compute_confidence(
        user_lat, user_lon, AQI_STATIONS, horizon_months=6
    )

    confidence_6m["explanation"] = explain_confidence(
    confidence_6m["label"],
    distance_km=confidence_6m["score"],
    horizon=6
    ) 

    # -------- Final result --------
    return {
        "aqi": {
            "1_month": round(float(aqi_1m), 2),
            "3_month": round(float(aqi_3m), 2),
            "6_month": round(float(aqi_6m), 2)
        },
        "confidence": {
            "1_month": confidence_1m,
            "3_month": confidence_3m,
            "6_month": confidence_6m
        },
        "station_influence": station_influence(user_lat, user_lon, AQI_STATIONS)
    }


# -------- Local Test --------
if __name__ == "__main__":
    user_lat = 23.0300
    user_lon = 72.5800

    result = run_model(user_lat, user_lon)
    print(result)
