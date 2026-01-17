from traffic_to_aqi import apply_traffic_to_aqi

base_aqi = 240
base_signal = 0.25

# what if traffic reduces by 20%
reduced_signal = base_signal * 0.8

print("Baseline AQI:", apply_traffic_to_aqi(base_aqi, base_signal))
print("Post-metro AQI:", apply_traffic_to_aqi(base_aqi, reduced_signal))
