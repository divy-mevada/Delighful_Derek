import google.generativeai as genai
import os

class GeminiClient:
    def __init__(self, api_key=None):
        if not api_key:
            api_key = os.getenv("GEMINI_API_KEY")
        
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found. Please set it in your .env file.")

        genai.configure(api_key=api_key)
        
        # Use a model that supports JSON mode if possible, or just robust prompting
        # gemini-2.0-flash is available and fast
        self.model = genai.GenerativeModel('gemini-2.0-flash')

    def chat(self, system, user):
        """
        Sends a message to Gemini.
        combines system and user prompts since Gemini's chat interface 
        handles them best as a structured conversation or concatenated context.
        """
        try:
            # Combine system instruction with user prompt for strong context adherence
            combined_prompt = f"{system}\n\nUser Request:\n{user}"
            
            response = self.model.generate_content(
                combined_prompt,
                generation_config=genai.types.GenerationConfig(
                    temperature=0.7
                )
            )
            
            return response.text
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return "{}"
