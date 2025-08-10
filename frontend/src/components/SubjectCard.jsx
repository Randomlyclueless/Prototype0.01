// src/components/SubjectCard.jsx
import React from "react";

export default function SubjectCard({ title }) {
  return (
    <div style={cardStyles.card}>
      <h3>{title}</h3>
      <p>Explore topics, ask doubts, and build projects.</p>
    </div>
  );
}

const cardStyles = {
  card: {
    padding: "1.5rem",
    border: "1px solid #ddd",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    transition: "0.3s",
    cursor: "pointer",
  },
};
