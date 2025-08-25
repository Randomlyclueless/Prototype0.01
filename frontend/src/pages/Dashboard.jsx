// frontend/src/pages/Dashboard.jsx
import React from "react";

export default function Dashboard() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <iframe
        src="http://localhost:8502"   // 👈 Streamlit runs on 8502 now
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Gradai Dashboard"
      />
    </div>
  );
}
