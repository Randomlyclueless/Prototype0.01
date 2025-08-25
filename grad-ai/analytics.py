def compute_skill_index(events_df):
    """
    Compute skill mastery index from logged events
    """
    skills = {
        "QuizAttempted": "Data Science / ML",
        "TutorialRead": "Learning",
        "ResumeUpdated": "Resume",
        "ResearchSubmitted": "Research",
        "ProjectSubmitted": "Projects",
        "ContestParticipated": "Contests"
    }

    skill_scores = {v: 0 for v in set(skills.values())}

    # Assign weights to event types
    weights = {
        "QuizAttempted": 10,
        "TutorialRead": 5,
        "ResumeUpdated": 15,
        "ResearchSubmitted": 20,
        "ProjectSubmitted": 25,
        "ContestParticipated": 20
    }

    for _, row in events_df.iterrows():
        etype = row["event_type"]
        if etype in skills:
            skill_scores[skills[etype]] += weights[etype]

    # Normalize scores to 0-100
    max_score = max(skill_scores.values()) if skill_scores else 1
    normalized_scores = {k: (v / max_score) * 100 if max_score > 0 else 0 for k, v in skill_scores.items()}

    overall_index = sum(normalized_scores.values()) / len(normalized_scores) if normalized_scores else 0

    return normalized_scores, overall_index
