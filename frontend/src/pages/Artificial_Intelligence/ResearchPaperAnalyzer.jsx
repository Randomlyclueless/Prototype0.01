import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Analyzer() {
  const [showStreamlit, setShowStreamlit] = useState(false);

  const openStreamlit = () => setShowStreamlit(true);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center display-5">📄 Research Paper Analyzer</h1>

      <div className="card p-4 shadow-lg border-0 mb-4 bg-light">
        <button
          className="btn btn-primary w-100 fw-bold"
          onClick={openStreamlit}
        >
          Open Analyzer
        </button>
      </div>

      {/* Streamlit Modal */}
      {showStreamlit && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              width: "90%",
              height: "90%",
              backgroundColor: "#fff",
              borderRadius: "10px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowStreamlit(false)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                zIndex: 1001,
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Close
            </button>

            <iframe
              src="http://localhost:8501"
              title="Research Paper Analyzer"
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
