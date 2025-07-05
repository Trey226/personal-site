from flask import Flask, request, jsonify
import re
import math

app = Flask(__name__)

# this is the NLTK stopwords list plus ones I have run into such as "eg"
STOPWORDS = {
    "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "yourself", "yourselves", 
    "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", 
    "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", 
    "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", 
    "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", 
    "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", 
    "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", 
    "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", 
    "s", "t", "can", "will", "just", "don", "should", "now", "eg", "work"
}

def preprocess_text(text):
    """Cleans text without NLTK."""
    text = text.lower()
    text = re.sub(r'[^a-z\s]', '', text)
    # Use simple split(), which works perfectly after removing punctuation.
    tokens = text.split()
    return [word for word in tokens if word not in STOPWORDS]

def cosine_similarity(vec1, vec2):
    """Calculates cosine similarity using pure Python."""
    dot_product = sum(v1 * v2 for v1, v2 in zip(vec1, vec2))
    norm_a = math.sqrt(sum(v**2 for v in vec1))
    norm_b = math.sqrt(sum(v**2 for v in vec2))
    norm_product = norm_a * norm_b
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

    resume_vec = [0] * len(all_words)
    for word in resume_tokens:
        if word in vocab:
            resume_vec[vocab[word]] += 1

    jd_vec = [0] * len(all_words)
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
