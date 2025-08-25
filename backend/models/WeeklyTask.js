const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const WeekSchema = new mongoose.Schema({
  weekStart: { type: Date, required: true },
  weekEnd: { type: Date, required: true },
  tasks: [TaskSchema],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // if auth later
});

module.exports = mongoose.model("WeeklyTask", WeekSchema);
