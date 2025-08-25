import nltk
import re
from nltk.corpus import stopwords
from collections import Counter
from textstat import flesch_reading_ease

# Ensure stopwords are downloaded
nltk.download('stopwords')
STOPWORDS = set(stopwords.words('english'))

# Common sections to check
SECTIONS = ["education", "experience", "skills", "projects", "certifications", "summary", "objective", "achievements"]

def clean_text(text):
    if not text:
        return ""
    text = re.sub(r'[^\w\s]', '', text)  # remove punctuation
    text = text.lower()
    return text

def keyword_density(text):
    words = [w for w in clean_text(text).split() if w not in STOPWORDS]
    total = len(words)
    freq = Counter(words)
    return {k: round(v/total*100, 2) for k, v in freq.items()} if total else {}

def readability_score(text):
    try:
        score = flesch_reading_ease(text)
        return round(score, 2)
    except:
        return 0.0

def ats_score(text, job_keywords=[]):
    text_clean = clean_text(text)
    keywords_found = sum(1 for kw in job_keywords if kw.lower() in text_clean)
    keyword_score = (keywords_found / max(len(job_keywords), 1)) * 60  # weighted higher
    read_score = readability_score(text) / 2  # readability weighted less
    section_bonus = sum(section_completeness(text).values()) * 2  # 2 points per section present
    total_score = keyword_score + read_score + section_bonus
    return round(min(total_score, 100), 2)

def section_completeness(text):
    text_lower = text.lower()
    completeness = {}
    for sec in SECTIONS:
        pattern = rf'\b{sec}\b'
        completeness[sec] = int(bool(re.search(pattern, text_lower)))
    return completeness

def skill_match(resume_skills, job_keywords):
    resume_set = set([s.strip().lower() for s in resume_skills.split(',') if s.strip()])
    job_set = set([s.strip().lower() for s in job_keywords if s.strip()])
    match = resume_set & job_set
    match_percent = len(match) / max(len(job_set), 1) * 100
    return round(match_percent, 2), match
