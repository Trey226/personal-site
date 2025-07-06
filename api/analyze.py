import re
import math
import json
from http.server import BaseHTTPRequestHandler

# It's more efficient to define these helpers and constants outside the class
# so they are not recreated for every single request.

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
    tokens = text.split()
    return [word for word in tokens if word not in STOPWORDS]

def cosine_similarity(vec1, vec2):
    """Calculates cosine similarity using pure Python."""
    dot_product = sum(v1 * v2 for v1, v2 in zip(vec1, vec2))
    norm_a = math.sqrt(sum(v**2 for v in vec1))
    norm_b = math.sqrt(sum(v**2 for v in vec2))
    norm_product = norm_a * norm_b
    return dot_product / norm_product if norm_product != 0 else 0.0

class handler(BaseHTTPRequestHandler):
    
    def do_POST(self):
        """
        Handles POST requests, gets the JSON body, processes it,
        and returns the analysis.
        """
        # 1. Read the body of the POST request
        try:
            content_length = int(self.headers['Content-Length'])
            body = self.rfile.read(content_length)
            data = json.loads(body)
            resume_text = data['resume']
            job_description_text = data['job_description']
        except (json.JSONDecodeError, TypeError, KeyError):
            # If body is not valid JSON or keys are missing, send an error
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            error_response = {"error": "Request must be JSON with 'resume' and 'job_description' keys."}
            self.wfile.write(json.dumps(error_response).encode('utf-8'))
            return

        # --- Your original analysis logic starts here ---
        resume_tokens = preprocess_text(resume_text)
        jd_tokens = preprocess_text(job_description_text)

        if not resume_tokens or not jd_tokens:
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            response_data = {'match_score': 0.0, 'missing_keywords': list(set(jd_tokens))[:15]}
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            return

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
        # --- Your analysis logic ends here ---

        # 2. Send a successful response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return