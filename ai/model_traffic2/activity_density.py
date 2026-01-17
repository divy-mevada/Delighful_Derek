def compute_activity_density(population_density, hour):
    """
    Converts static population into time-aware activity demand
    """
    if 7 <= hour <= 10:        # morning peak
        return population_density * 1.2
    elif 17 <= hour <= 20:     # evening peak
        return population_density * 1.3
    elif 22 <= hour or hour <= 5:  # night
        return population_density * 0.6
    else:
        return population_density * 0.9
