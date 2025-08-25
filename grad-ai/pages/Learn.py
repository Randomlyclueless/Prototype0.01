import streamlit as st
from db_utils import log_event

st.title("📘 Learn Page")

if st.button("Mark Tutorial as Read"):
    log_event("user1", "TutorialRead")
    st.success("TutorialRead event logged ✅")
