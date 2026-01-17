from ai.model_traffic2.collect_aqi import collect_aqi_snapshot
from ai.model_traffic2.dataset_builder import build_dataset

df_raw = collect_aqi_snapshot()
df = build_dataset(df_raw)

print(df.head())
print("\nColumns:", df.columns.tolist())
