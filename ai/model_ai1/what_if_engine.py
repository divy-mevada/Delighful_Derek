def bridge_aqi_impact(progress):
    if progress < 0.3:
        return 0.10
    elif progress < 0.7:
        return 0.10 - (progress - 0.3) * 0.25
    else:
        return -0.05 * (progress - 0.7) / 0.3

def simulate_what_if(base_aqi, duration, elapsed):
    progress = min(elapsed / duration, 1)
    impact = bridge_aqi_impact(progress)
    return round(base_aqi * (1 + impact), 2)
