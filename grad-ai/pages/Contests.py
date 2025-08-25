import streamlit as st
from db_utils import log_event

st.title("🏆 Contests")

if st.button("Participate in Contest"):
    log_event("user1", "ContestParticipated")
    st.success("ContestParticipated event logged ✅")
