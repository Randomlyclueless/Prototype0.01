import React, { useState } from "react";
import axios from "axios";

const SelectionToolbar = ({ onSummaryGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [highlightColor, setHighlightColor] = useState("yellow");

  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection ? selection.toString().trim() : "";
  };

  // Summarize selected text
  const handleSummarize = async () => {
    const text = getSelectedText();
    if (!text) {
      alert("Please select some text first to summarize.");
      return;
    }

    setLoading(true);
    try {
      console.log("Sending request to backend with text:", text);
      const res = await axios.post("http://localhost:5000/api/summarize", {
        text,
      });
      console.log("Backend response:", res.data);
      onSummaryGenerated(res.data.summary);
    } catch (err) {
      console.error("Summarize error:", err);
      if (err.response) {
        alert(
          `Backend Error: ${err.response.status} - ${
            err.response.data.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        alert(
          "Cannot connect to backend. Make sure your server is running on http://localhost:5000"
        );
      } else {
        alert("Error setting up request: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Apply highlighting to selected text
  const handleHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      alert("Please select some text first to highlight.");
      return;
    }

    try {
      const range = selection.getRangeAt(0);

      // Check if we can use surroundContents (works for simple selections)
      const canUseSurroundContents =
        range.startContainer === range.endContainer;

      if (canUseSurroundContents) {
        // Simple case: selection is within single text node
        const span = document.createElement("span");
        const colorMap = {
          yellow: "#ffff99",
          red: "#ffcccc",
          lightblue: "#ccf2ff",
          green: "#ccffcc",
        };

        span.style.backgroundColor = colorMap[highlightColor] || "#ffff99";
        span.style.padding = "1px 2px";
        span.style.borderRadius = "2px";

        try {
          range.surroundContents(span);
          selection.removeAllRanges();
          alert("Text highlighted successfully!");
        } catch (e) {
          console.error("SurroundContents failed:", e);
          handleComplexHighlight(selection, range, highlightColor);
        }
      } else {
        // Complex case: selection spans multiple elements
        handleComplexHighlight(selection, range, highlightColor);
      }
    } catch (error) {
      console.error("Highlight error:", error);
      alert(
        "Unable to highlight this text. Try selecting simpler text within a single paragraph."
      );
    }
  };

  // Handle complex highlighting (spans multiple elements)
  const handleComplexHighlight = (selection, range, color) => {
    try {
      const colorMap = {
        yellow: "#ffff99",
        red: "#ffcccc",
        lightblue: "#ccf2ff",
        green: "#ccffcc",
      };

      // Extract the contents and wrap in span
      const contents = range.extractContents();
      const span = document.createElement("span");
      span.style.backgroundColor = colorMap[color] || "#ffff99";
      span.style.padding = "1px 2px";
      span.style.borderRadius = "2px";
      span.appendChild(contents);

      // Insert the highlighted span back
      range.insertNode(span);
      selection.removeAllRanges();
      alert("Text highlighted successfully!");
    } catch (e) {
      console.error("Complex highlight failed:", e);
      alert(
        "Unable to highlight this selection. Please try selecting text within a single paragraph."
      );
    }
  };

  // Apply underline to selected text
  const handleUnderline = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) {
      alert("Please select some text first to underline.");
      return;
    }

    try {
      const range = selection.getRangeAt(0);
      const canUseSurroundContents =
        range.startContainer === range.endContainer;

      if (canUseSurroundContents) {
        const span = document.createElement("span");
        span.style.textDecoration = "underline";
        span.style.textDecorationColor = "#007bff";
        span.style.textDecorationThickness = "2px";

        try {
          range.surroundContents(span);
          selection.removeAllRanges();
          alert("Text underlined successfully!");
        } catch (e) {
          console.error("Underline surroundContents failed:", e);
          handleComplexUnderline(selection, range);
        }
      } else {
        handleComplexUnderline(selection, range);
      }
    } catch (error) {
      console.error("Underline error:", error);
      alert(
        "Unable to underline this text. Try selecting simpler text within a single paragraph."
      );
    }
  };

  // Handle complex underlining
  const handleComplexUnderline = (selection, range) => {
    try {
      const contents = range.extractContents();
      const span = document.createElement("span");
      span.style.textDecoration = "underline";
      span.style.textDecorationColor = "#007bff";
      span.style.textDecorationThickness = "2px";
      span.appendChild(contents);

      range.insertNode(span);
      selection.removeAllRanges();
      alert("Text underlined successfully!");
    } catch (e) {
      console.error("Complex underline failed:", e);
      alert(
        "Unable to underline this selection. Please try selecting text within a single paragraph."
      );
    }
  };

  return (
    <div
      style={{
        marginBottom: "20px",
        padding: "15px",
        background: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #dee2e6",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          color: "#495057",
          marginRight: "10px",
        }}
      >
        📝 Text Tools:
      </div>

      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{
          padding: "8px 16px",
          backgroundColor: loading ? "#6c757d" : "#007bff",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        {loading ? "Summarizing..." : "✨ Summarize Selected"}
      </button>

      <select
        value={highlightColor}
        onChange={(e) => setHighlightColor(e.target.value)}
        style={{
          padding: "8px 12px",
          fontSize: "14px",
          borderRadius: "6px",
          border: "1px solid #ced4da",
          backgroundColor: "#fff",
        }}
      >
        <option value="yellow">🟡 Yellow Highlight</option>
        <option value="red">🔴 Red Highlight</option>
        <option value="lightblue">🔵 Blue Highlight</option>
        <option value="green">🟢 Green Highlight</option>
      </select>

      <button
        onClick={handleHighlight}
        style={{
          padding: "8px 16px",
          backgroundColor: "#ffc107",
          color: "#000",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        🖍️ Highlight Selected
      </button>

      <button
        onClick={handleUnderline}
        style={{
          padding: "8px 16px",
          backgroundColor: "#28a745",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "14px",
        }}
      >
        📝 Underline Selected
      </button>
    </div>
  );
};

export default SelectionToolbar;
