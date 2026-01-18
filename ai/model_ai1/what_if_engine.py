def simulate_what_if(base_aqi, duration_months, months_ahead, construction_score, operational_score):
    """
    Universal What-If Engine.
    Uses LLM-provided scores (-1.0 to 1.0) to determine impact.
    """
    
    # Safety checks
    if not duration_months:
        duration_months = 0
    
    # Logic:
    # If months_ahead <= duration: We are in CONSTRUCTION phase.
    # If months_ahead > duration: We are in OPERATIONAL phase.
    
    impact = 0.0
    
    if months_ahead <= duration_months:
        # Construction Phase
        # Simple Model: Construction impact is constant during the phase
        # (Could use a bell curve in future for peak dust)
        impact = construction_score
        
    else:
        # Operational Phase
        # Transition to operational impact
        impact = operational_score

    # Apply impact
    # Scores are direct percentage modifiers (0.1 = +10%, -0.05 = -5%)
    # Add dynamic saturation for very high pollution if operational impact is positive
    if base_aqi > 200 and impact > 0:
         # Dampen further pollution if already saturated
         impact *= 0.7

    return round(base_aqi * (1 + impact), 2)
