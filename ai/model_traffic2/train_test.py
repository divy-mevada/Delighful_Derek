from ai.model_traffic2.collect_aqi import collect_aqi_snapshot
from ai.model_traffic2.dataset_builder import build_dataset
from ai.model_traffic2.train_traffic_ai import train_traffic_model

# Collect AQI snapshot
df_raw = collect_aqi_snapshot()

# Build training dataset
df = build_dataset(df_raw)

# Train AI model and save files
model, beta = train_traffic_model(df)

print("Traffic AI model trained")
print("Learned beta coefficient:", beta)
