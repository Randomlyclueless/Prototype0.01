import React, { useState } from "react";
import html2pdf from "html2pdf.js";

export default function ResumeBuilder() {
  const [resumeData, setResumeData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    skills: "",
    experience: "",
  });

  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const downloadPDF = () => {
    const element = document.getElementById("resume-preview");
    const opt = {
      margin: 0.5,
      filename: `${resumeData.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const saveResume = async () => {
    // Placeholder for backend API
    alert("Resume saved successfully!");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#121212", // black background
        color: "#fff",
        padding: "20px",
        gap: "20px",
      }}
    >
      {/* Left: Form */}
      <div style={{ flex: 1 }}>
        <h2 style={{ color: "#944a81ff" }}>Build Your Resume</h2>
        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="education"
          placeholder="Education"
          onChange={handleChange}
          style={textareaStyle}
        ></textarea>
        <textarea
          name="skills"
          placeholder="Skills"
          onChange={handleChange}
          style={textareaStyle}
        ></textarea>
        <textarea
          name="experience"
          placeholder="Experience"
          onChange={handleChange}
          style={textareaStyle}
        ></textarea>

        {/* Buttons */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={downloadPDF} style={buttonStyle}>
            Download PDF
          </button>
          <button
            onClick={saveResume}
            style={{
              ...buttonStyle,
              backgroundColor: "#944a81ff",
              color: "#000",
            }}
          >
            Save Resume
          </button>
        </div>
      </div>

      {/* Right: Preview */}
      <div
        id="resume-preview"
        style={{
          flex: 1,
          backgroundColor: "#fff",
          color: "#000",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h1 style={{ color: "#370d5cff" }}>{resumeData.name || "Your Name"}</h1>
        <p>
          {resumeData.email || "Email"} | {resumeData.phone || "Phone"}
        </p>
        <h3 style={{ color: "#370d5cff" }}>Education</h3>
        <p>{resumeData.education || "Your education details"}</p>
        <h3 style={{ color: "#370d5cff" }}>Skills</h3>
        <p>{resumeData.skills || "Your skills"}</p>
        <h3 style={{ color: "#370d5cff" }}>Experience</h3>
        <p>{resumeData.experience || "Your experience"}</p>
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  width: "100%",
  margin: "10px 0",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #333",
  backgroundColor: "#1f1f1f",
  color: "#fff",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "80px",
};

const buttonStyle = {
  marginRight: "10px",
  padding: "10px 15px",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#944a81ff",
  color: "#000",
  fontWeight: "bold",
  cursor: "pointer",
};
