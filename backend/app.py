from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import yfinance as yf
from datetime import datetime, timedelta
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense

import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})


@app.route("/market", methods=["POST"])
def market_prediction():
    try:
        data = request.get_json()
        symbol = data.get("symbol", "").upper()
        days_to_predict = data.get("days", 30)

        if not symbol:
            return jsonify({"error": "Stock symbol is required"}), 400

        end_date = datetime.now()
        start_date = end_date - timedelta(days=365*2)

        df = yf.download(symbol, start=start_date, end=end_date, progress=False)
        if df.empty:
            return jsonify({"error": f"No data found for {symbol}"}), 404

        df = df[['Close']].dropna()

        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(df.values)

        seq_len = 60
        X, y = [], []
        for i in range(seq_len, len(scaled_data)):
            X.append(scaled_data[i - seq_len:i, 0])
            y.append(scaled_data[i, 0])
        X, y = np.array(X), np.array(y)
        X = np.reshape(X, (X.shape[0], X.shape[1], 1))
        
        model = Sequential([
            LSTM(50, return_sequences=True, input_shape=(X.shape[1], 1)),
            LSTM(50, return_sequences=False),
            Dense(25),
            Dense(1)
        ])

        model.compile(optimizer="adam", loss="mean_squared_error")
        model.fit(X, y, epochs=5, batch_size=32, verbose=0)

        last_60 = scaled_data[-seq_len:]
        future_predictions = []
        current_batch = last_60.reshape((1, seq_len, 1))

        for _ in range(days_to_predict):
            pred = model.predict(current_batch, verbose=0)[0][0]
            future_predictions.append(pred)
            current_batch = np.append(current_batch[:, 1:, :], [[[pred]]], axis=1)

        predicted_prices = scaler.inverse_transform(np.array(future_predictions).reshape(-1, 1)).flatten()

        future_dates = [(end_date + timedelta(days=i + 1)).strftime("%Y-%m-%d") for i in range(days_to_predict)]

        response = {
            "symbol": symbol,
            "predictions": [
                {"date": d, "predicted_price": round(float(p), 2)}
                for d, p in zip(future_dates, predicted_prices)
            ],
            "current_price": round(float(df["Close"].iloc[-1]), 2),
            "trend": "Bullish" if predicted_prices[-1] > df["Close"].iloc[-1] else "Bearish"
        }

        return jsonify(response)

    except Exception as e:
        print(f"❌ Error: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Flask API is running"})

if __name__ == "__main__":
    print("=" * 50)
    print("🚀 Flask LSTM Stock Prediction API")
    print("Frontend: http://localhost:3000")
    print("Backend:  http://localhost:5000")
    print("=" * 50)
    app.run(debug=True, host="0.0.0.0", port=5000)
