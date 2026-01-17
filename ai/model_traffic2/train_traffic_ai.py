from sklearn.linear_model import LinearRegression
import joblib

def train_traffic_model(df):
    X = df[[
        "hour",
        "is_weekend",
        "month",
        "traffic_signal"
    ]]
    y = df["aqi_change"]

    model = LinearRegression()
    model.fit(X, y)

    # 🔥 Extract β coefficient
    beta = model.coef_[-1]

    joblib.dump(model, "traffic_ai_model.pkl")
    joblib.dump(beta, "traffic_to_aqi_beta.pkl")

    return model, beta