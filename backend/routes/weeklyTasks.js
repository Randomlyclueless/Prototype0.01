const express = require("express");
const router = express.Router();
const WeeklyTask = require("../models/WeeklyTask");

// Get weekly tasks
router.get("/:weekStart", async (req, res) => {
  try {
    const { weekStart } = req.params;
    const startDate = new Date(weekStart);
    const weekTasks = await WeeklyTask.findOne({ weekStart: startDate });
    res.json(weekTasks || { tasks: [] });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add or update weekly tasks
router.post("/", async (req, res) => {
  try {
    const { weekStart, weekEnd, tasks } = req.body;
    let week = await WeeklyTask.findOne({ weekStart });
    if (!week) {
      week = new WeeklyTask({ weekStart, weekEnd, tasks });
    } else {
      week.tasks = tasks;
    }
    await week.save();
    res.json(week);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
