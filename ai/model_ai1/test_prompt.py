from llm_client import GeminiClient
from config import GEMINI_API_KEY
import json

if not GEMINI_API_KEY:
    print("No API Key")
    exit(1)

client = GeminiClient(GEMINI_API_KEY)

# Test a completely random, complex scenario
sentence = "What if a massive alien spaceship lands in the city center and hovers there for 5 years?"

print(f"Testing Scenaro: {sentence}")
response = client.chat(
    system="You are an environmental impact expert. Return JSON with fields: construction_type, duration_months, construction_impact_score, operational_impact_score, reasoning.",
    user=f'Scenario: "{sentence}"'
)

print("Response:")
print(response)
