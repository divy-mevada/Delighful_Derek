from spatial_interpolation import haversine

def station_influence(user_lat, user_lon, stations, power=2):
    influences = []

    total_weight = 0
    for s in stations:
        dist = haversine(user_lat, user_lon, s["lat"], s["lon"])
        dist = max(dist, 0.1)
        weight = 1 / (dist ** power)
        total_weight += weight

        influences.append({
            "station": s["id"],
            "distance_km": round(dist, 2),
            "raw_weight": weight
        })

    for i in influences:
        i["influence_percent"] = round(
            (i["raw_weight"] / total_weight) * 100, 2
        )
        del i["raw_weight"]

    return sorted(influences, key=lambda x: -x["influence_percent"])
