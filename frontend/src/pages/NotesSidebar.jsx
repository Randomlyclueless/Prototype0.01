import { useState, useEffect } from "react";
import axios from "axios";

export default function NotesSidebar() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

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
      <h2 style={{ marginBottom: "15px", color: "#333" }}>My Notes</h2>

      {/* New Note Input */}
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

      {/* Notes List */}
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
              {loadingSummary ? "Summarizing..." : "Summarize"}
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
