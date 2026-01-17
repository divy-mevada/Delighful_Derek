from traffic_to_aqi import apply_traffic_to_aqi

base_aqi = 240

low_traffic = apply_traffic_to_aqi(base_aqi, traffic_signal=0.1)
high_traffic = apply_traffic_to_aqi(base_aqi, traffic_signal=0.3)

print("Low traffic AQI:", low_traffic)
print("High traffic AQI:", high_traffic)
