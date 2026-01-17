from prophet import Prophet

def train_prophet(df):
    model = Prophet()
    model.fit(df)
    return model

def predict_future(model, days):
    future = model.make_future_dataframe(periods=days)
    forecast = model.predict(future)
    return forecast[["ds", "yhat"]].tail(days)
