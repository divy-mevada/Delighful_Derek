import sys
import os
import json
import joblib

# Add both model directories to path so we can import modules
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'model_ai1')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'model_traffic2')))

from model_ai1.config import GEMINI_API_KEY
from model_ai1.llm_client import GeminiClient

# Import Traffic components
from model_traffic2.llm_parser import parse_what_if_scenario as parse_traffic_scenario
from model_traffic2.traffic_what_if import apply_traffic_what_if

# Import AQI components
from model_ai1.llm_parser import parse_sentence as parse_aqi_scenario
from model_ai1.what_if_engine import simulate_what_if as simulate_aqi_what_if
from model_ai1.run_model import fetch_station_data

def calculate_integrated_scenario(lat, lon, user_prompt):
    """
    Returns a dictionary with the Integrated Simulation results.
    """
    result = {}
    
    if not GEMINI_API_KEY:
        return {"error": "GEMINI_API_KEY_MISSING"}

    client = GeminiClient(GEMINI_API_KEY)

    # 1. Analyze with Traffic Model
    traffic_data = parse_traffic_scenario(client, user_prompt)
    result["traffic_prediction"] = traffic_data
    
    # Calculate Traffic Impact
    base_traffic_signal = 0.5 
    new_traffic_signal = apply_traffic_what_if(base_traffic_signal, traffic_data)
    result["base_traffic"] = base_traffic_signal
    result["new_traffic"] = new_traffic_signal

    # Wait for rate limit before next big calc if needed
    import time
    time.sleep(2) # Short sleep for API stability

    # 2. Analyze with AQI Model
    aqi_data = parse_aqi_scenario(client, user_prompt)
    result["aqi_prediction"] = aqi_data

    # 3. Fetch Baseline AQI
    try:
        # fetch_station_data expects a dictionary: {"id":..., "lat":..., "lon":...}
        station_dict = {"id": "integrated_test", "lat": lat, "lon": lon}
        df = fetch_station_data(station_dict)
        current_aqi = df['y'].iloc[-1]
    except Exception as e:
        print(f"Warning: {e}")
        current_aqi = 150.0  # Fallback

    result["baseline_aqi"] = current_aqi
    
    # Wait for rate limit before next big calc if needed
    time.sleep(2)

    # 4. Integrate Traffic Influence into AQI
    try:
        beta = joblib.load('model_traffic2/traffic_to_aqi_beta.pkl')
    except:
        beta = 0.5 # Default strict connection
    
    traffic_induced_aqi_change = (new_traffic_signal - base_traffic_signal) * beta * current_aqi
    result["traffic_aqi_shift"] = traffic_induced_aqi_change

    # 5. Run Final What-If Simulation
    adjusted_base_aqi = current_aqi + traffic_induced_aqi_change

    months_ahead = 6 
    if "long term" in user_prompt.lower():
        months_ahead = 24
    
    # Check if user specified duration in text not handled by logic, but usually done by parse_aqi_scenario
    # The duration_months from aqi_data is construction duration.
    # The "months_ahead" is the forecast horizon.
    # We will return the result for the requested horizon.
    
    final_aqi = simulate_aqi_what_if(
        base_aqi=adjusted_base_aqi,
        months_ahead=months_ahead,
        duration_months=aqi_data.get('duration_months', 6),
        construction_score=aqi_data.get('construction_impact_score', 0),
        operational_score=aqi_data.get('operational_impact_score', 0)
    )

    result["final_aqi"] = final_aqi
    result["forecast_horizon_months"] = months_ahead
    
    return result

def run_integrated_simulation(lat, lon, user_prompt):
    print(f"--- Running Integrated Simulation for: '{user_prompt}' ---")
    data = calculate_integrated_scenario(lat, lon, user_prompt)
    print(json.dumps(data, indent=2))


if __name__ == "__main__":
    # Allow dynamic input from command line
    if len(sys.argv) > 1:
        # Join all args to form the full sentence (handling spaces)
        user_prompt = " ".join(sys.argv[1:])
    else:
        # Default fallback
        user_prompt = "What if we build a new metro line?"

    run_integrated_simulation(23.03, 72.58, user_prompt)
