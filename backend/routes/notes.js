const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// --------------------
// Create a new note
// --------------------
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const note = new Note({ title, content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: error.message });
  }
});

// --------------------
// Get all notes
// --------------------
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: error.message });
  }
});

// --------------------
// Add diagram to a note
// --------------------
router.post("/:id/diagram", async (req, res) => {
  const { elements } = req.body;
  if (!elements)
    return res.status(400).json({ message: "Diagram elements are required" });

  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.diagrams.push({ elements });
    await note.save();

    res.json({ message: "Diagram saved", diagrams: note.diagrams });
  } catch (err) {
    console.error("Error saving diagram:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// --------------------
// Update AI summary for a note
// --------------------
router.put("/:id/summary", async (req, res) => {
  const { summary } = req.body;
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });

    note.summary = summary;
    await note.save();
    res.json({ message: "Summary updated", summary: note.summary });
  } catch (err) {
    console.error("Error updating summary:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
