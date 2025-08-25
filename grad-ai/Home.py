import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
from db_utils import get_events
from analytics import compute_skill_index
from insights import generate_recommendations

st.set_page_config(page_title="Gradai Dashboard", layout="wide")

st.title("📊 Gradai - Dashboard & Insights")

# Load events
events_df = get_events()

if events_df.empty:
    st.warning("No events logged yet. Go to the pages to perform actions.")
else:
    st.subheader("All Events")
    st.dataframe(events_df)

    # Compute analytics
    skill_scores, overall_index = compute_skill_index(events_df)

    col1, col2 = st.columns(2)

    with col1:
        st.metric("Skill Mastery Index", f"{overall_index:.2f}")

        st.subheader("Skill Breakdown")
        st.bar_chart(pd.DataFrame(skill_scores, index=["Score"]).T)

    with col2:
        st.subheader("Progress Over Time")
        trend = events_df.groupby("timestamp").size().reset_index(name="count")
        st.line_chart(trend.set_index("timestamp"))

    # Insights
    st.subheader("🔮 Predictive Insights")
    recommendations = generate_recommendations(skill_scores)
    for rec in recommendations:
        st.info(rec)
