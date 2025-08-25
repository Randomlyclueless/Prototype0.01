import streamlit as st
from db_utils import log_event

st.title("📊 Data Science Page")

if st.button("Attempt DS Quiz"):
    log_event("user1", "QuizAttempted", metadata="DS Quiz")
    st.success("QuizAttempted event logged ✅")
