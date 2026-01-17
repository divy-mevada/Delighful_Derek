from datetime import datetime
import pandas as pd
from ai.model_ai1.config import OPENWEATHER_API_KEY
from ai.model_ai1.fetch_current_api import fetch_current_aqi
from ai.model_traffic2.config import TRAFFIC_STATIONS


def collect_aqi_snapshot():
    rows = []
    for s in TRAFFIC_STATIONS:
        aqi = fetch_current_aqi(s["lat"], s["lon"], OPENWEATHER_API_KEY)
        rows.append({
            "station": s["id"],
            "timestamp": datetime.now(),
            "observed_aqi": aqi
        })
    return pd.DataFrame(rows)
