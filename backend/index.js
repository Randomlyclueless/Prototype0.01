const express = require("express");
const ConnectMongo = require("./DB");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

ConnectMongo();

app.use(cors());
app.use(express.json());

// Auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Notes routes
const notesRoutes = require("./routes/notes"); // Make sure you have this file
app.use("/api/notes", notesRoutes);

const summarizeRoutes = require("./routes/summarize");
app.use("/api/summarize", summarizeRoutes);

app.use("/api/weekly_tasks", require("./routes/weeklyTasks"));

app.listen(port, () => console.log(`Server running on port ${port}`));
