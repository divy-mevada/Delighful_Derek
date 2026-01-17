def seasonal_multiplier(month):
    if month in [11, 12, 1]:       # Winter
        return 1.10
    elif month in [3, 4, 5]:      # Summer
        return 0.95
    elif month in [7, 8]:         # Monsoon
        return 0.90
    else:
        return 1.00
