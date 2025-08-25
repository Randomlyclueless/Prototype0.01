import streamlit as st
from db_utils import log_event

st.title("🌍 Real Life Implementation")

if st.button("Submit Real-Life Project"):
    log_event("user1", "ProjectSubmitted", metadata="RealLifeImplementation")
    st.success("RealLifeImplementation ProjectSubmitted logged ✅")
