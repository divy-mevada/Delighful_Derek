
import sys
import os

# Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))

from ai.model_ai1.config import AQICN_API_KEY
from ai.model_ai1.fetch_current_api import fetch_current_aqi

def verify_aqicn():
    lat = 23.1175
    lon = 72.5767
    
    print(f"Testing AQICN API for: {lat}, {lon}")
    print(f"Using Token: {AQICN_API_KEY}")
    
    aqi = fetch_current_aqi(lat, lon, AQICN_API_KEY)
    
    if aqi:
        print(f"[SUCCESS] Real AQI: {aqi}")
    else:
        print(f"[FAILED] Failed or Invalid Token. Please update config.py")

if __name__ == "__main__":
    verify_aqicn()
