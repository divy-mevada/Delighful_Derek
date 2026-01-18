import json
import re

def parse_what_if_scenario(llm_client, sentence):
    """
    Extracts structured parameters from a natural language What-If scenario.
    Expected fields:
    - action: "reduce", "increase", "add_infrastructure", "new_project"
    - magnitude_percent: e.g. 20 (for 20%)
    - location: e.g. "bopal", "all"
    - duration_months: e.g. 6 (implied or stated)
    - traffic_impact: estimated percentage change in traffic (e.g. -15 for 15% reduction)
    """

    system_prompt = (
        "You are an AI expert in urban traffic analytics. "
        "Analyze the user's 'What-If' scenario. "
        "Predict the impact on traffic density. "
        "Return strictly valid JSON with keys: 'action', 'magnitude_percent' (number), 'location', 'duration_months' (number), 'traffic_impact' (number, signed percent). "
        "Examples: "
        "'New Metro' -> {action: 'new_project', traffic_impact: -20, duration: 48}. "
        "'Bridge Construction' -> {action: 'new_project', traffic_impact: -10, duration: 24} (diversion). "
        "'Festival' -> {action: 'event', traffic_impact: 30, duration: 1}. "
    )

    try:
        if llm_client:
            response = llm_client.chat(
                system=system_prompt,
                user=f'Scenario: "{sentence}"'
            )
            # Handle case where LLM returns markdown code block
            clean_response = response.replace("```json", "").replace("```", "").strip()
            return json.loads(clean_response)
        else:
             return _heuristic_fallback(sentence)
    except Exception as e:
        print(f"LLM Parse Error: {e}, falling back to heuristic.")
        return _heuristic_fallback(sentence)


def _heuristic_fallback(sentence):
    """
    Simple rule-based fallback for testing or when LLM fails.
    """
    sentence = sentence.lower()
    data = {
        "action": "unknown",
        "magnitude_percent": 0.0,
        "location": "all",
        "duration_months": 6
    }

    # Location extraction (simple match against known stations or default to "all")
    # In a real app, pass the list of stations to check against
    
    # Magnitude
    percent_match = re.search(r"(\d+)%", sentence)
    if percent_match:
        data["magnitude_percent"] = float(percent_match.group(1))

    # Action & Logic
    # Action & Logic
    if "bridge" in sentence:
        data["action"] = "add_infrastructure"
        data["magnitude_percent"] = 15.0 # Implicit 15% reduction
    elif "metro" in sentence:
        data["action"] = "add_infrastructure" 
        data["magnitude_percent"] = 25.0
    elif "reduce" in sentence or "decrease" in sentence:
        data["action"] = "reduce"
        # magnitude is positive in the text (reduce by 20%), but logic handles sign later
    elif "increase" in sentence:
        data["action"] = "increase"

    return data
