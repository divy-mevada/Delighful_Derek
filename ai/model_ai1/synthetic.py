import pandas as pd
import numpy as np

def generate_synthetic_history(current_aqi, days=180, seed=42):
    np.random.seed(seed)
    dates = pd.date_range(end=pd.Timestamp.today(), periods=days)
    noise = np.random.normal(0, 10, days)
    trend = np.linspace(5, -5, days)
    values = np.clip(current_aqi + noise + trend, 50, 300)
    return pd.DataFrame({"ds": dates, "y": values})
