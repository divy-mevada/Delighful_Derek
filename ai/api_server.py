from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
import os
import sys

# Ensure modules are importable
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'model_ai1')))
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), 'model_traffic2')))

from integrated_runner import calculate_integrated_scenario
from model_ai1.what_if_engine import simulate_what_if

app = FastAPI(title="CityView Integrated AI Model")

class SimulationRequest(BaseModel):
    lat: float
    lon: float
    scenario: str
    duration_months: int = 6  # User selected duration: 1, 3, 6

@app.post("/predict")
async def predict_impact(request: SimulationRequest):
    """
    Endpoint for Frontend -> Backend -> ML Model connection.
    Accepts scenario and coordinates, returns impact analysis.
    """
    try:
        # 1. Run the integrated logic (Traffic + AQI Analysis)
        # We pass the scenario text to Gemini
        # Note: calculate_integrated_scenario currently defaults to 6 months snapshot internally
        # We need to respect request.duration_months for the final result
        
        # We can re-use the function but we might need to override the forecast horizon?
        # Let's call it and then re-calculate final step if needed, or update the function.
        # Actually, the function calculates 'final_aqi' for a fixed horizon. 
        # Let's get the intermediate data and re-simulate for the requested duration.
        
        result_data = calculate_integrated_scenario(request.lat, request.lon, request.scenario)
        
        if "error" in result_data:
             raise HTTPException(status_code=500, detail=result_data["error"])

        # EXTRACT INTERMEDIATES FOR CUSTOM DURATION
        baseline_aqi = result_data.get("baseline_aqi", 150)
        traffic_shift = result_data.get("traffic_aqi_shift", 0)
        
        aqi_data = result_data["aqi_prediction"]
        con_score = aqi_data.get("construction_impact_score", 0)
        ops_score = aqi_data.get("operational_impact_score", 0)
        project_duration = aqi_data.get("duration_months", 6)

        # Re-calc for USER SELECTED duration (e.g. 1 month vs 6 months)
        # Because the user on frontend selected "Show me impact after 1 month"
        adjusted_base = baseline_aqi + traffic_shift
        
        final_aqi = simulate_what_if(
            base_aqi=adjusted_base, 
            months_ahead=request.duration_months, # User selected 1, 3, or 6
            duration_months=project_duration,
            construction_score=con_score,
            operational_score=ops_score
        )
        
        # Construct simplified response for Frontend
        response = {
            "annotated_aqi": round(final_aqi, 2),
            "baseline_aqi": round(baseline_aqi, 2),
            "impact_percentage": round(((final_aqi - baseline_aqi)/baseline_aqi)*100, 2),
            "details": {
                "traffic_change_percent": result_data["traffic_prediction"].get("traffic_impact", 0),
                "construction_phase": "Construction" if request.duration_months < project_duration else "Operational",
                "reasoning": aqi_data.get("reasoning", "AI Analysis")
            }
        }
        
        return response

    except Exception as e:
        print(f"Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
