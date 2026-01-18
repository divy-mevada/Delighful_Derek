def apply_traffic_what_if(base_impact, parsed_scenario_data):
    """
    Applies the traffic impact from the parsed scenario.
    Can accept a float (simple percent) or a dictionary (from LLM).
    """
    if isinstance(parsed_scenario_data, dict):
        change_percent = parsed_scenario_data.get("traffic_impact", 0) / 100.0
    else:
        change_percent = parsed_scenario_data
        
    return base_impact * (1 + change_percent)
