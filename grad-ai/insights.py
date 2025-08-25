def generate_recommendations(skill_scores):
    recommendations = []

    for skill, score in skill_scores.items():
        if score < 40:
            recommendations.append(f"⚡ Focus more on {skill} — try completing tutorials or projects.")
        elif score < 70:
            recommendations.append(f"📈 You're improving in {skill}, but more practice will boost your mastery.")
        else:
            recommendations.append(f"✅ Great job in {skill}! Keep maintaining consistency.")

    return recommendations
