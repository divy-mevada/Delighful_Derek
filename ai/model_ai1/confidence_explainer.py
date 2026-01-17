def explain_confidence(label, distance_km, horizon):
    if label == "HIGH":
        return "High confidence due to proximity to monitoring stations and short forecast horizon."
    if label == "MEDIUM":
        return "Moderate confidence due to distance from stations or longer forecast horizon."
    return "Low confidence due to limited nearby monitoring data and long-term forecast."
