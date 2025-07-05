from flask import Flask, request, jsonify
import numpy as np
import nltk
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

app = Flask(__name__)

# Download required NLTK data. This is idempotent (safe to run every time)
# and works both locally and in serverless environments like Vercel.
nltk.download(['punkt', 'stopwords', 'punkt_tab'], quiet=True)

STOPWORDS = set(stopwords.words('english'))

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    tokens = word_tokenize(text)
    return [word for word in tokens if word not in STOPWORDS]

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_product = np.linalg.norm(vec1) * np.linalg.norm(vec2)
    return dot_product / norm_product if norm_product != 0 else 0.0

@app.route("/api/analyze", methods=['POST'])
def analyze_route():
    try:
        data = request.get_json()
        resume_text = data['resume']
        job_description_text = data['job_description']
    except (TypeError, KeyError):
        return jsonify({"error": "Request must be JSON with 'resume' and 'job_description' keys."}), 400

    resume_tokens = preprocess_text(resume_text)
    jd_tokens = preprocess_text(job_description_text)

    if not resume_tokens or not jd_tokens:
        return jsonify({ 'match_score': 0.0, 'missing_keywords': list(set(jd_tokens))[:15] })

    all_words = sorted(list(set(resume_tokens + jd_tokens)))
    vocab = {word: i for i, word in enumerate(all_words)}

    resume_vec = np.zeros(len(all_words))
    for word in resume_tokens:
        if word in vocab:
            resume_vec[vocab[word]] += 1

    jd_vec = np.zeros(len(all_words))
    for word in jd_tokens:
        if word in vocab:
            jd_vec[vocab[word]] += 1

    score = cosine_similarity(resume_vec, jd_vec)

    jd_words = set(jd_tokens)
    resume_words = set(resume_tokens)
    missing_keywords = list(jd_words - resume_words)
    missing_keywords.sort(key=lambda x: jd_tokens.count(x), reverse=True)

    response_data = {
        'match_score': score,
        'missing_keywords': missing_keywords[:15]
    }
    return jsonify(response_data)

if __name__ == "__main__":
    app.run(port=5328, debug=True)
