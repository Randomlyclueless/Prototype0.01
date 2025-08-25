import React from "react";

export default function ResumeBuilder() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#121212",
      }}
    >
      <iframe
        src="http://localhost:8501" // your Streamlit app URL
        title="Resume Builder"
        style={{
          width: "100%",
          height: "100vh",
          border: "none",
          borderRadius: "8px",
        }}
      />
    </div>
  );
}
