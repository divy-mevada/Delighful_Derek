from run_model import run_model
from what_if_engine import simulate_what_if
from llm_parser import parse_sentence


def run_scenario(user_lat, user_lon, sentence, timeline_months, llm_client):
    # 1️⃣ Parse sentence
    scenario = parse_sentence(llm_client, sentence)

    # 2️⃣ Get baseline AQI
    baseline = run_model(user_lat, user_lon)

    base_aqi = baseline["aqi"][f"{timeline_months}_month"]
    confidence = baseline["confidence"][f"{timeline_months}_month"]

    # 3️⃣ Apply what-if logic
    scenario_aqi = simulate_what_if(
        base_aqi=base_aqi,
        construction_type=scenario.get("construction_type"),
        duration_months=scenario.get("duration_months"),
        months_ahead=timeline_months
    )

    return {
        "timeline": f"{timeline_months} months",
        "baseline_aqi": base_aqi,
        "scenario_aqi": scenario_aqi,
        "confidence": confidence,
        "scenario_details": scenario
    }


# -------- Local Test --------
if __name__ == "__main__":
    class DummyLLM:
        def chat(self, system, user):
            return """{
                "construction_type": "bridge",
                "location": "SG Highway",
                "duration_months": 12
            }"""

    llm = DummyLLM()

    sentence = "What if a bridge is built near SG Highway for 12 months?"

    result = run_scenario(
        user_lat=23.03,
        user_lon=72.58,
        sentence=sentence,
        timeline_months=6,
        llm_client=llm
    )

    print(result)