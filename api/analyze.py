from http.server import BaseHTTPRequestHandler
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
import re

# Download NLTK data (Vercel will cache this)
try:
    nltk.data.find('tokenizers/punkt')
except nltk.downloader.DownloadError:
    nltk.download('punkt', quiet=True)

try:
    nltk.data.find('corpora/stopwords')
except nltk.downloader.DownloadError:
    nltk.download('stopwords', quiet=True)

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

# Define stopwords
STOPWORDS = set(stopwords.words('english'))

def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()
    # Remove special characters and numbers
    text = re.sub(r'[^a-z\s]', '', text)
    # Tokenize
    tokens = word_tokenize(text)
    # Remove stopwords
    filtered_tokens = [word for word in tokens if word not in STOPWORDS]
    return " ".join(filtered_tokens)

# This is the main Vercel entry point
class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        # Get the body of the request
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        resume_text = data.get('resume', '')
        job_description_text = data.get('job_description', '')

        # --- NLP Analysis ---
        cleaned_resume = preprocess_text(resume_text)
        cleaned_jd = preprocess_text(job_description_text)

        # Create a corpus
        corpus = [cleaned_resume, cleaned_jd]

        # Vectorize the text using Bag-of-Words
        vectorizer = CountVectorizer()
        vectors = vectorizer.fit_transform(corpus)

        # Calculate Cosine Similarity
        score_matrix = cosine_similarity(vectors)
        score = score_matrix[0][1] # Get the similarity between doc1 and doc2

        # --- Keyword Analysis ---
        jd_words = set(cleaned_jd.split())
        resume_words = set(cleaned_resume.split())
        missing_keywords = list(jd_words - resume_words)

        # Sort missing keywords by their frequency in the job description for relevance
        jd_tokens = cleaned_jd.split()
        missing_keywords.sort(key=lambda x: jd_tokens.count(x), reverse=True)


        # --- Prepare the Response ---
        response_data = {
            'match_score': score,
            'missing_keywords': missing_keywords[:15] # Return top 15
        }

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return