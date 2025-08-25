import { useState, useEffect } from "react";
import axios from "axios";

export default function NotesSidebar() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [highlightColor, setHighlightColor] = useState("yellow");
  const [toolbarLoading, setToolbarLoading] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes");
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      await axios.post("http://localhost:5000/api/notes", {
        title: "Quick Note",
        content: newNote,
      });
      setNewNote("");
      fetchNotes();
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleSummarize = async (noteId, content) => {
    setLoadingSummary(true);
    try {
      const res = await axios.post("http://localhost:5000/api/summarize", {
        text: content,
      });
      const summary = res.data.summary;
      setNotes((prev) =>
        prev.map((note) => (note._id === noteId ? { ...note, summary } : note))
      );
    } catch (error) {
      console.error("Error summarizing note:", error);
    } finally {
      setLoadingSummary(false);
    }
  };

  // Selection toolbar actions
  const getSelectedText = () => {
    const selection = window.getSelection();
    return selection ? selection.toString().trim() : "";
  };

  const handleToolbarSummarize = async () => {
    const text = getSelectedText();
    if (!text) return alert("Select text to summarize!");

    setToolbarLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/summarize", {
        text,
      });
      alert("Summary: " + res.data.summary);
    } catch (err) {
      console.error(err);
      alert("Error summarizing selected text.");
    } finally {
      setToolbarLoading(false);
    }
  };

  const handleHighlight = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return alert("Select text first");

    const range = selection.getRangeAt(0);
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
    span.appendChild(range.extractContents());
    range.insertNode(span);
    selection.removeAllRanges();
  };

  const handleUnderline = () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return alert("Select text first");

    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    span.style.textDecoration = "underline";
    span.style.textDecorationColor = "#007bff";
    span.style.textDecorationThickness = "2px";
    span.appendChild(range.extractContents());
    range.insertNode(span);
    selection.removeAllRanges();
  };

  return (
    <div
      style={{
        width: "320px",
        position: "fixed",
        right: 0,
        top: 0,
        height: "100%",
        background: "#f9f9f9",
        padding: "15px",
        overflowY: "auto",
        boxShadow: "-3px 0 8px rgba(0,0,0,0.1)",
        zIndex: 1000,
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "15px", color: "#333" }}>📝 Notes & Tools</h2>

      {/* --- Selection Toolbar --- */}
      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "#f0f4f8",
          borderRadius: "8px",
          border: "1px solid #ddd",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <button
          onClick={handleToolbarSummarize}
          disabled={toolbarLoading}
          style={{
            padding: "8px",
            backgroundColor: toolbarLoading ? "#6c757d" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: toolbarLoading ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          {toolbarLoading ? "Summarizing..." : "✨ Summarize Selected Text"}
        </button>

        <select
          value={highlightColor}
          onChange={(e) => setHighlightColor(e.target.value)}
          style={{
            padding: "6px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        >
          <option value="yellow">🟡 Yellow</option>
          <option value="red">🔴 Red</option>
          <option value="lightblue">🔵 Blue</option>
          <option value="green">🟢 Green</option>
        </select>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleHighlight}
            style={{
              flex: 1,
              padding: "8px",
              backgroundColor: "#ffc107",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            🖍 Highlight
          </button>
          <button
            onClick={handleUnderline}
            style={{
              flex: 1,
              padding: "8px",
              backgroundColor: "#28a745",
              border: "none",
              borderRadius: "6px",
              color: "white",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            📝 Underline
          </button>
        </div>
      </div>

      {/* --- New Note Input --- */}
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        placeholder="Type your note here..."
        rows={4}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          marginBottom: "8px",
          resize: "none",
        }}
      />
      <button
        onClick={handleAddNote}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        Add Note
      </button>

      {/* --- Notes List --- */}
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {notes.map((note) => (
          <div
            key={note._id}
            style={{
              background: "#fff",
              padding: "12px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
            }}
          >
            <div style={{ fontWeight: "bold", color: "#555" }}>
              {note.title}
            </div>
            <div style={{ color: "#333" }}>{note.content}</div>

            {note.summary && (
              <div
                style={{
                  marginTop: "6px",
                  padding: "8px",
                  background: "#f0f4f8",
                  borderRadius: "6px",
                  fontSize: "14px",
                  color: "#222",
                }}
              >
                <strong>Summary:</strong> {note.summary}
              </div>
            )}

            <button
              onClick={() => handleSummarize(note._id, note.content)}
              style={{
                padding: "6px 10px",
                marginTop: "6px",
                alignSelf: "flex-start",
                borderRadius: "6px",
                border: "none",
                backgroundColor: "#2196F3",
                color: "white",
                fontSize: "13px",
                cursor: "pointer",
              }}
              disabled={loadingSummary}
            >
              {loadingSummary ? "Summarizing..." : "Summarize Note"}
            </button>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: "20px",
          fontSize: "12px",
          color: "#888",
          textAlign: "center",
        }}
      >
        Notes powered by GradAI
      </div>
    </div>
  );
}
