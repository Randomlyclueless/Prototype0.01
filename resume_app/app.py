import streamlit as st
from resume_builder import generate_pdf_resume
from resume_analyzer import keyword_density, readability_score, ats_score, section_completeness, skill_match
import pandas as pd
import matplotlib.pyplot as plt

st.set_page_config(layout="wide", page_title="Resume Builder & Analyzer")

st.markdown("<h1 style='text-align:center; color:#6a0dad'>Advanced Resume Builder & Analyzer</h1>", unsafe_allow_html=True)

tab1, tab2 = st.tabs(["Build Resume", "Analyze Resume"])

# ----------------- Resume Builder -----------------
with tab1:
    st.subheader("Create Your Resume")
    name = st.text_input("Full Name")
    email = st.text_input("Email")
    phone = st.text_input("Phone")
    education = st.text_area("Education")
    experience = st.text_area("Experience")
    skills = st.text_input("Skills (comma separated)")
    
    if st.button("Generate Resume PDF"):
        data = {"name": name,"email": email,"phone": phone,"education": education,"experience": experience,"skills": skills}
        filename = generate_pdf_resume(data)
        st.success("Resume Generated!")
        st.download_button("Download PDF", data=open(filename,"rb"), file_name="resume.pdf")

# ----------------- Advanced Resume Analyzer -----------------
with tab2:
    st.subheader("Analyze Your Resume")
    uploaded_file = st.file_uploader("Upload your resume (.txt or .docx)")
    job_keywords = st.text_input("Job Description Keywords (comma separated)").split(",")

    if uploaded_file:
        try:
            text = uploaded_file.read().decode("utf-8")
        except:
            st.error("File format not supported. Use .txt for now.")
            text = ""
        
        if text:
            st.text_area("Resume Content", text, height=200)

            # Keyword density
            st.write("**Keyword Density:**")
            kd = keyword_density(text)
            top_keywords = dict(sorted(kd.items(), key=lambda x:x[1], reverse=True)[:10])
            st.bar_chart(pd.DataFrame(list(top_keywords.items()), columns=["Keyword","Density %"]).set_index("Keyword"))

            # Readability
            st.write(f"**Readability Score:** {readability_score(text)}")

            # Section completeness
            sections = section_completeness(text)
            st.write("**Section Completeness:**")
            st.dataframe(pd.DataFrame([sections]).T.rename(columns={0:"Present (1)/Missing (0)"}))

            # ATS score
            if job_keywords != [""]:
                score = ats_score(text, job_keywords)
                st.success(f"ATS Score: {score}/100")
                
                # Skill match
                match_percent, match_skills = skill_match(text, job_keywords)
                st.write(f"**Skill Match:** {match_percent}%")
                st.write(f"Matching Keywords: {', '.join(match_skills) if match_skills else 'None'}")

            # Suggestions
            suggestions = []
            if sections["education"] == 0: suggestions.append("Add Education section")
            if sections["experience"] == 0: suggestions.append("Add Experience section")
            if sections["skills"] == 0: suggestions.append("Add Skills section")
            if readability_score(text) < 50: suggestions.append("Improve readability")
            if job_keywords != [""] and score < 70: suggestions.append("Add relevant job keywords")
            if suggestions:
                st.warning("**Suggestions to Improve Resume:**")
                for s in suggestions:
                    st.write(f"- {s}")
