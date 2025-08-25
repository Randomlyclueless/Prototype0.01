import streamlit as st
from db_utils import log_event

st.title("📄 Resume Builder")

if st.button("Update Resume"):
    log_event("user1", "ResumeUpdated")
    st.success("ResumeUpdated event logged ✅")
