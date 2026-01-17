from config import AQI_STATIONS, OPENWEATHER_API_KEY
from fetch_current import fetch_current_aqi
from synthetic import generate_synthetic_history
from train_forecast import train_prophet, predict_future
from spatial_interpolation import idw_interpolation
from confidence import compute_confidence

def run_model(user_lat, user_lon):
    station_preds = []

    for s in AQI_STATIONS:
        aqi = fetch_current_aqi(s["lat"], s["lon"], OPENWEATHER_API_KEY)
        df = generate_synthetic_history(aqi)
        model = train_prophet(df)

        station_preds.append({
            "lat": s["lat"],
            "lon": s["lon"],
            "aqi_6m": predict_future(model, 180).iloc[-1]["yhat"]
        })

    aqi_6m = idw_interpolation(
        user_lat, user_lon,
        [{"lat": s["lat"], "lon": s["lon"], "aqi": s["aqi_6m"]} for s in station_preds]
    )

    return {
        "aqi_6_month": aqi_6m,
        "confidence": compute_confidence(user_lat, user_lon, AQI_STATIONS, 6)
    }

if __name__ == "__main__":
    print(run_model(23.03, 72.58))
