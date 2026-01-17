from spatial_interpolation import haversine

def compute_confidence(user_lat, user_lon, stations, horizon_months):
    distances = [haversine(user_lat, user_lon, s["lat"], s["lon"]) for s in stations]
    nearest = min(distances)

    score = 90 if nearest <= 2 else 70 if nearest <= 5 else 50 if nearest <= 10 else 30
    score -= 10 if horizon_months == 3 else 20 if horizon_months == 6 else 0

    label = "HIGH" if score >= 75 else "MEDIUM" if score >= 50 else "LOW"
    return {"score": score, "label": label}
