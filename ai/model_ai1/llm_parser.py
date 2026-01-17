import json

def parse_sentence(llm, sentence):
    prompt = f"""
Extract only explicitly stated info.
Return JSON with keys:
construction_type, location, duration_months.

Sentence: "{sentence}"
"""
    response = llm(prompt)
    return json.loads(response)
