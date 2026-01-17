def validate(parsed):
    allowed = {"bridge", "road", "hospital", "school"}
    if parsed["construction_type"] not in allowed:
        raise ValueError("Unsupported type")
    return parsed
