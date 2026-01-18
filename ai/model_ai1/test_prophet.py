from prophet import Prophet
print("Prophet imported")
try:
    m = Prophet()
    print("Prophet initialized successfully")
except Exception as e:
    print(f"Error: {e}")
