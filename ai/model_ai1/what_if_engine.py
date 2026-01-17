def bridge_aqi_impact(progress):
    if progress < 0.3:
        return 0.10
    elif progress < 0.7:
        return 0.10 - (progress - 0.3) * 0.25
    else:
        return -0.05 * (progress - 0.7) / 0.3


def simulate_what_if(base_aqi, construction_type, duration_months, months_ahead):
    if not duration_months or not construction_type:
        return base_aqi

    progress = min(months_ahead / duration_months, 1)

    if construction_type == "bridge":
        impact = bridge_aqi_impact(progress)
    else:
        impact = 0

    return round(base_aqi * (1 + impact), 2)
