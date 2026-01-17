import json

def parse_sentence(llm_client, sentence):
    system_prompt = (
        "You are an information extraction assistant. "
        "Extract only explicitly stated information. "
        "Do not infer or guess missing values. "
        "Return valid JSON only."
    )

    user_prompt = f"""
    Sentence:
    "{sentence}"

    Extract the following fields:
    construction_type,
    location,
    duration_months
    """

    response = llm_client.chat(
        system=system_prompt,
        user=user_prompt
    )

    return json.loads(response)
