from ai.model_traffic2.traffic_model import predict_traffic_signal

print(
    "Traffic impact:",
    predict_traffic_signal(
        road_density=42,
        station_id="maninagar"
    )
)
