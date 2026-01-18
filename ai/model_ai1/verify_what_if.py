from scenario_runner import run_scenario
import json

class MockLLM:
    def chat(self, system, user):
        # The 'user' string contains the full prompt including instructions and examples.
        # We must extract the actual scenario sentence to avoid matching keywords in the instructions.
        # Prompt format:
        # Scenario:
        # "{sentence}"
        
        import re
        # Find content inside quotes after "Scenario:"
        match = re.search(r'Scenario:\s*\n\s*"(.+?)"', user, re.DOTALL)
        
        if match:
            user_lower = match.group(1).lower()
        else:
            # Fallback if regex fails (shouldn't happen with our parser)
            user_lower = user.lower()

        if "bridge" in user_lower:
            return json.dumps({
                "construction_type": "bridge",
                "location": "Riverfront",
                "duration_months": 24,
                "construction_impact_score": 0.15, # High dust
                "operational_impact_score": 0.02,  # Slight traffic increase?
                "reasoning": "Bridge construction causes significant dust. Operation adds traffic."
            })
        elif "small metro" in user_lower:
            return json.dumps({
                "construction_type": "metro",
                "location": "City Center",
                "duration_months": 2, # Finished by month 6
                "construction_impact_score": 0.05, 
                "operational_impact_score": -0.05,
                "reasoning": "Short construction."
            })
        elif "metro" in user_lower:
            return json.dumps({
                "construction_type": "metro",
                "location": "City Center",
                "duration_months": 36,
                "construction_impact_score": 0.05, # Moderate dust
                "operational_impact_score": -0.05, # Traffic reduction
                "reasoning": "Metro construction dust is managed. Operations reduce vehicle emissions."
            })
        elif "nuclear" in user_lower:
             return json.dumps({
                "construction_type": "power_plant",
                "location": "Outskirts",
                "duration_months": 60,
                "construction_impact_score": 0.10,
                "operational_impact_score": 0.0, # Zero emissions
                "reasoning": "Construction is heavy industrial. Operation is clean energy."
            })
        elif "volcano" in user_lower:
             return json.dumps({
                "construction_type": "natural_disaster",
                "location": "Mountain",
                "duration_months": 1, 
                "construction_impact_score": 0.50, # Massive ash
                "operational_impact_score": 0.10,  # Lingering ash
                "reasoning": "Volcanic ash causes severe PM2.5 spikes."
            })
        else:
            # Fallback / Unknown
            return json.dumps({
                "construction_type": "unknown",
                "location": "unknown",
                "duration_months": 0,
                "construction_impact_score": 0.0,
                "operational_impact_score": 0.0,
                "reasoning": "No impact inferred."
            })

from scenario_runner import run_scenario
from llm_client import GeminiClient
from config import GEMINI_API_KEY
import json
import os

# ... MockLLM class definition remains for fallback ...

def test_scenarios():
    # Toggle between Real and Mock
    if GEMINI_API_KEY:
        print("[INFO] Using REAL Gemini LLM")
        llm = GeminiClient(GEMINI_API_KEY)
    else:
        print("[INFO] GEMINI_API_KEY not found. Using Mock LLM")
        llm = MockLLM()
        
    lat, lon = 23.03, 72.58
    
    scenarios = [
        # TIMELINE AWARENESS TEST
        # 1. Metro Construction Phase (Month 3 of 36) -> Expect POSITIVE impact (0.05)
        ("What if a new metro line is built?", 3), 
        
        # 2. Metro Operational Phase 
        # Trick: Set timeline to 6 months (max supported), but pretend duration was short (e.g. 2 months)
        # The MockLLM needs to be smart enough or we need a specific prompt to trigger short duration?
        # Actually, for this test script, we can key off the input string in MockLLM.
        ("What if a small metro line is built quickly?", 6),

        # COMPLEX SCENARIOS
        # 3. Nuclear Plant (Construction)
        ("What if a nuclear power plant is built?", 6),
        
        # 4. Extreme Event
        ("What if a volcano erupts nearby?", 1)
    ]
    
    print(f"{'SCENARIO':<55} | {'MONTH':<5} | {'BASE':<8} | {'NEW':<8} | {'CHANGE'}")
    print("-" * 100)
    
    for sentence, months in scenarios:
        try:
            result = run_scenario(lat, lon, sentence, months, llm)
            base = result["baseline_aqi"]
            new = result["scenario_aqi"]
            diff = round(((new - base) / base) * 100, 2)
            
            # Debug: Print the scenario details extracted
            details = result['scenario_details']
            print(f"[DEBUG] Type: {details.get('construction_type')} | ConScore: {details.get('construction_impact_score')} | OpScore: {details.get('operational_impact_score')}")

            print(f"{sentence[:50]:<55} | {months:<5} | {base:<8} | {new:<8} | {diff}%")
            
            import time
            time.sleep(10)
        except Exception as e:
            print(f"Error running scenario '{sentence}': {e}")

if __name__ == "__main__":
    test_scenarios()
