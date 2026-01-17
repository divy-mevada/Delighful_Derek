import joblib
from datetime import datetime
import os

from ai.model_traffic2.activity_density import compute_activity_density
from ai.model_traffic2.population_density import get_population_density

BASE_DIR = os.path.dirname(__file__)
model = joblib.load(os.path.join(BASE_DIR, "traffic_ai_model.pkl"))

def predict_traffic_signal(road_density, station_id):
    """
    Predicts traffic proxy signal using AI-trained model
    """
    now = datetime.now()

    population_density = get_population_density(station_id)
    activity_density = compute_activity_density(
        population_density,
        now.hour
    )

    traffic_signal = activity_density * road_density

    X = [[
        now.hour,
        1 if now.weekday() >= 5 else 0,
        now.month,
        traffic_signal
    ]]

    return model.predict(X)[0]
