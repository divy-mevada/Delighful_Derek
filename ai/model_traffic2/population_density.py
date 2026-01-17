POPULATION_DENSITY = {
    "bopal": 3500,
    "maninagar": 12000,
    "chandkheda": 8000,
    "paldi": 10000,
    "vastrapur": 10500,
    "naroda": 9000,
}

def get_population_density(station_id):
    """
    Returns population density for a given station.
    Falls back to city average if unknown.
    """
    return POPULATION_DENSITY.get(station_id, 8000)
