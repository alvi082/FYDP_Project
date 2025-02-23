import sys
import json
import os
import traceback
from PyPDF2 import PdfReader, errors as pdf_errors
from docx import Document
from docx.opc.exceptions import PackageNotFoundError
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle

def load_model():
    try:
        with open('tfidf_vectorizer.pkl', 'rb') as f:
            return pickle.load(f)
    except Exception as e:
        print(f"Model loading failed: {str(e)}")
        raise

def extract_text(file_path, file_type):
    try:
        if file_type == 'pdf':
            with open(file_path, 'rb') as f:
                try:
                    reader = PdfReader(f)
                    return ' '.join([page.extract_text() for page in reader.pages if page.extract_text()])
                except pdf_errors.PdfReadError:
                    print(f"Invalid PDF file: {file_path}")
                    return ""
        elif file_type == 'docx':
            try:
                doc = Document(file_path)
                return ' '.join([para.text for para in doc.paragraphs if para.text])
            except PackageNotFoundError:
                print(f"Invalid DOCX file: {file_path}")
                return ""
        else:
            print(f"Unsupported file type: {file_type}")
            return ""
    except Exception as e:
        print(f"Error processing {file_path}: {traceback.format_exc()}")
        return ""

def analyze(data):
    try:
        vectorizer = load_model()
        job_desc = data.get('job_description', '')
        
        if not job_desc:
            raise ValueError("Empty job description")
            
        job_vector = vectorizer.transform([job_desc])
        
        results = []
        for cv in data.get('cvs', []):
            text = extract_text(cv['path'], cv.get('type', ''))
            if not text:
                continue
                
            cv_vector = vectorizer.transform([text])
            similarity = cosine_similarity(job_vector, cv_vector)[0][0]
            results.append({
                'cv_id': cv['cv_id'],
                'score': round(similarity * 100, 2)
            })
            
        return results
        
    except Exception as e:
        print(f"Analysis error: {traceback.format_exc()}")
        raise

if __name__ == "__main__":
    try:
        temp_dir = sys.argv[1]
        input_data = json.load(sys.stdin)
        
        if not os.path.exists(temp_dir):
            os.makedirs(temp_dir)
            
        # ... rest of the code ...
        
    except Exception as e:
        print(json.dumps({"error": str(e), "trace": traceback.format_exc()}))
        sys.exit(1)