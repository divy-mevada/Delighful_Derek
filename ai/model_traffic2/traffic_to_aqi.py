import joblib

beta = joblib.load("traffic_to_aqi_beta.pkl")

def apply_traffic_to_aqi(base_aqi, traffic_signal):
    """
    Applies AI-learned traffic → AQI coefficient
    """
    return round(base_aqi * (1 + beta * traffic_signal), 2)
