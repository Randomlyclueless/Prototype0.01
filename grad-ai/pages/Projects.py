import streamlit as st
from db_utils import log_event

st.title("🛠️ Projects")

if st.button("Submit Project"):
    log_event("user1", "ProjectSubmitted")
    st.success("ProjectSubmitted event logged ✅")
