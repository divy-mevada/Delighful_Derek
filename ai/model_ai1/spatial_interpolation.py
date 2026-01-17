import math

def haversine(lat1, lon1, lat2, lon2):
    R = 6371
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat/2)**2 + math.cos(math.radians(lat1))*math.cos(math.radians(lat2))*math.sin(dlon/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))

def idw_interpolation(user_lat, user_lon, stations):
    num, den = 0, 0
    for s in stations:
        d = max(haversine(user_lat, user_lon, s["lat"], s["lon"]), 0.1)
        w = 1 / (d*d)
        num += w * s["aqi"]
        den += w
    return round(num / den, 2)
