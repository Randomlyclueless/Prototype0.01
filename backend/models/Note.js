const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String }, // optional AI summary
  diagrams: [
    {
      elements: { type: Array, required: true }, // store Excalidraw elements JSON
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", NoteSchema);
