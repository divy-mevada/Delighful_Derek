from ai.model_traffic2.activity_density import compute_activity_density
from ai.model_traffic2.population_density import get_population_density
from ai.model_traffic2.road_density import compute_road_density
from ai.model_traffic2.config import TRAFFIC_STATIONS
import pandas as pd

def build_dataset(df):
    df["timestamp"] = pd.to_datetime(df["timestamp"])

    df["hour"] = df["timestamp"].dt.hour
    df["month"] = df["timestamp"].dt.month
    df["is_weekend"] = (df["timestamp"].dt.weekday >= 5).astype(int)

    road_map = {
        s["id"]: compute_road_density(s["lat"], s["lon"])
        for s in TRAFFIC_STATIONS
    }

    df["road_density"] = df["station"].map(road_map)

    df["population_density"] = df["station"].apply(get_population_density)

    # 🔥 NEW: activity-based demand
    df["activity_density"] = df.apply(
        lambda x: compute_activity_density(
            x["population_density"], x["hour"]
        ),
        axis=1
    )

    df["traffic_signal"] = df["activity_density"] * df["road_density"]

    df["baseline_aqi"] = df.groupby("station")["observed_aqi"].transform("mean")

    df["aqi_change"] = (
        df["observed_aqi"] - df["baseline_aqi"]
    ) / df["baseline_aqi"]

    return df[[
        "hour",
        "is_weekend",
        "month",
        "road_density",
        "activity_density",
        "traffic_signal",
        "aqi_change"
    ]]
