import requests

def fetch_current_aqi(lat, lon, api_key):
    url = f"https://api.waqi.info/feed/geo:{lat};{lon}/"
    params = {"token": api_key}
    
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        data = response.json()
    except requests.exceptions.RequestException as e:
        print(f"Network error fetching AQI: {e}")
        return None

    if data.get("status") != "ok":
        print(f"API Error: {data.get('data', 'Unknown error')}")
        return None
        
    try:
        # AQICN returns AQI directly
        aqi = data["data"]["aqi"]
        # Handle case where AQI might be '-' or invalid
        if isinstance(aqi, (int, float)):
             return float(aqi)
        else:
             print(f"Invalid AQI value received: {aqi}")
             return None
    except (KeyError, TypeError) as e:
        print(f"Error parsing AQICN response: {e}")
        return None
