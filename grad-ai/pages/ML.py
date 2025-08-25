import streamlit as st
from db_utils import log_event

st.title("🤖 Machine Learning Page")

if st.button("Attempt ML Quiz"):
    log_event("user1", "QuizAttempted", metadata="ML Quiz")
    st.success("QuizAttempted event logged ✅")
