import streamlit as st
import PyPDF2, re
from rake_nltk import Rake
from transformers import pipeline
from collections import Counter
import matplotlib.pyplot as plt
from wordcloud import WordCloud
import textstat

# -------------------------------
# CACHED MODEL LOADING
# -------------------------------
@st.cache_resource
def load_summarizer():
    return pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

summarizer = load_summarizer()

# -------------------------------
# PAGE SETUP
# -------------------------------
st.set_page_config(page_title="Research Paper Analyzer", layout="wide")
st.title("📄 Research Paper Analyzer")
st.write("Upload a PDF to extract summary, keyphrases, keywords, and readability metrics.")

# -------------------------------
# FILE UPLOADER
# -------------------------------
uploaded_file = st.file_uploader("Choose a PDF file", type="pdf")

if uploaded_file:
    text = ""
    try:
        pdf_reader = PyPDF2.PdfReader(uploaded_file)
        for page in pdf_reader.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text + " "
    except Exception as e:
        st.error(f"⚠️ Could not read PDF: {e}")
        st.stop()

    text = re.sub(r"\s+", " ", text)

    if not text.strip():
        st.error("⚠️ No extractable text found in this PDF.")
        st.stop()

    st.success("✅ PDF Uploaded and Text Extracted!")

    # -------------------------------
    # SUMMARIZATION (CHUNKED)
    # -------------------------------
    with st.spinner("Generating Summary..."):
        max_chunk = 3000
        chunks = [text[i:i+max_chunk] for i in range(0, len(text), max_chunk)]
        summaries = []
        for chunk in chunks:
            summary_chunk = summarizer(chunk, max_length=200, min_length=50, do_sample=False)[0]['summary_text']
            summaries.append(summary_chunk)
        final_summary = " ".join(summaries)

    with st.expander("📝 Summary"):
        st.info(final_summary)

    # -------------------------------
    # KEYPHRASES
    # -------------------------------
    rake = Rake()
    rake.extract_keywords_from_text(text)
    keyphrases = rake.get_ranked_phrases()[:15]

    with st.expander("🔑 Keyphrases"):
        st.write(", ".join(keyphrases))

    # -------------------------------
    # KEYWORDS
    # -------------------------------
    words = [w.lower() for w in text.split() if len(w) > 4]
    most_common = Counter(words).most_common(15)
    keywords, counts = zip(*most_common)

    with st.expander("🏷️ Keywords"):
        col1, col2 = st.columns([2,3])
        with col1:
            st.write(", ".join(keywords))
        with col2:
            fig, ax = plt.subplots()
            ax.barh(keywords[::-1], counts[::-1], color="teal")
            ax.set_xlabel("Frequency")
            st.pyplot(fig)

    # -------------------------------
    # WORDCLOUD
    # -------------------------------
    with st.expander("☁️ Word Cloud"):
        wordcloud = WordCloud(width=800, height=400, background_color='white', colormap='viridis').generate(text)
        fig_wc, ax_wc = plt.subplots(figsize=(10,5))
        ax_wc.imshow(wordcloud, interpolation='bilinear')
        ax_wc.axis("off")
        st.pyplot(fig_wc)

    # -------------------------------
    # READABILITY
    # -------------------------------
    fkgl = textstat.flesch_kincaid_grade(text)
    ari = textstat.automated_readability_index(text)

    with st.expander("📊 Readability Metrics"):
        col1, col2 = st.columns(2)
        col1.metric("Flesch-Kincaid Grade (FKGL)", fkgl)
        col2.metric("Automated Readability Index (ARI)", ari)

    st.success("🎉 Analysis Complete!")
