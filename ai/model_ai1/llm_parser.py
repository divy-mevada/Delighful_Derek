import json

def parse_sentence(llm_client, sentence):
    system_prompt = (
        "You are an environmental impact expert specialized in urban air quality (AQI). "
        "Analyze the user's scenario and estimate its impact on air pollution. "
        "Return valid JSON only."
    )

    user_prompt = f"""
    Scenario:
    "{sentence}"

    Extract the following fields in JSON format:
    - construction_type: (string) simplified type (e.g., "bridge", "factory", "park")
    - location: (string) inferred location
    - duration_months: (int) estimated duration of construction/setup (0 if not applicable)
    - construction_impact_score: (float, -1.0 to 1.0) Impact on AQI during construction phase. Positive means MORE pollution (e.g., dust). Negative means LESS pollution.
    - operational_impact_score: (float, -1.0 to 1.0) Impact on AQI after completion. Positive = pollution source. Negative = clean air/greenery.
    - reasoning: (string) Brief explanation of why you assigned these scores.
    """

    response = llm_client.chat(
        system=system_prompt,
        user=user_prompt
    )

    try:
        return json.loads(response)
    except json.JSONDecodeError:
        # Fallback for empty or malformed response
        print(f"LLM Parse Error. Response: {response}")
        return {
            "construction_type": "unknown",
            "duration_months": 0,
            "construction_impact_score": 0.0,
            "operational_impact_score": 0.0,
            "reasoning": "Failed to parse scenario."
        }
