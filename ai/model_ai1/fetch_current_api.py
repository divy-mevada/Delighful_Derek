import requests

def fetch_current_aqi(lat, lon, api_key):
    url = "http://api.openweathermap.org/data/2.5/air_pollution"
    params = {"lat": lat, "lon": lon, "appid": api_key}
    data = requests.get(url, params=params).json()
    return data["list"][0]["main"]["aqi"] * 50
