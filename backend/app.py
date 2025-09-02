from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import os

app = Flask(__name__)
CORS(app)

analyzer = SentimentIntensityAnalyzer()

# In-memory storage for stats
stats = {
    "positive": 0,
    "neutral": 0,
    "negative": 0,
    "total": 0
}

@app.route("/")
def home():
    return jsonify({"message": "Sentiment Analyzer Backend is Running"})

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")

    vs = analyzer.polarity_scores(text)
    compound = vs['compound']

    if compound >= 0.05:
        sentiment = "positive"
        stats["positive"] += 1
    elif compound <= -0.05:
        sentiment = "negative"
        stats["negative"] += 1
    else:
        sentiment = "neutral"
        stats["neutral"] += 1

    stats["total"] += 1
    return jsonify({"sentiment": sentiment})

@app.route("/stats", methods=["GET"])
def get_stats():
    return jsonify(stats)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)