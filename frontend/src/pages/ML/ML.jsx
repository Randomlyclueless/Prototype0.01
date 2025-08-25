// src/pages/ML.jsx

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../components/ThemeContext";

import {
  Brain,
  Sun,
  Moon,
  Cpu,
  Network,
  MessageCircle,
  Eye,
  BarChart,
  Zap,
  CheckCircle,
  BookOpen,
} from "lucide-react";

import "./ML.css";

const syllabusData = [
  {
    name: "Introduction to ML",
    icon: Brain,
    topics: [
      "Definition of Machine Learning",
      "Types of ML: Supervised, Unsupervised, Reinforcement",
      "Key Applications",
    ],
    subtopics: [
      "ML vs AI, Basic concepts",
      "Classification, Regression, Clustering, RL",
      "Healthcare, Finance, Autonomous Systems, NLP",
    ],
    practical: "Build a simple ML model using scikit-learn.",
  },
  {
    name: "Supervised Learning",
    icon: Cpu,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Unsupervised Learning",
    icon: Network,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Reinforcement Learning",
    icon: Eye,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Neural Networks",
    icon: BookOpen,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Deep Learning",
    icon: MessageCircle,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "ML Model Evaluation",
    icon: BarChart,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Feature Engineering",
    icon: Zap,
    topics: [],
    subtopics: [],
    practical: "",
  },
];

export default function ML() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState(
    syllabusData.reduce((acc, topic) => ({ ...acc, [topic.name]: 0 }), {})
  );
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const updateProgress = (topicName, value) => {
    setProgress((prev) => ({
      ...prev,
      [topicName]: Math.max(0, Math.min(100, value)),
    }));
  };

  const addNote = (e) => {
    e.preventDefault();
    if (newNote.trim()) {
      setNotes((prev) => [
        ...prev,
        { id: Date.now(), text: newNote, topic: "General" },
      ]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleCardClick = (topicName) => {
    let path = topicName
      .toLowerCase()
      .replace(/[\s()]+/g, "_")
      .replace(/_+/g, "_");

    // Special case for Introduction to ML
    if (topicName === "Introduction to ML") {
      path = "ml_introduction";
    }

    navigate(`/ml/${path}`);
  };

  const filteredData = syllabusData.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchTerm) ||
      topic.topics.some((t) => t.toLowerCase().includes(searchTerm)) ||
      topic.subtopics.some((s) => s.toLowerCase().includes(searchTerm))
  );

  const groupedData = [];
  for (let i = 0; i < filteredData.length; i += 3) {
    groupedData.push(filteredData.slice(i, i + 3));
  }

  const navItems = ["Home", "Learn", "Contests", "Resume Builder", "Progress"];
  const themeClass = isDarkMode ? "dark" : "";

  return (
    <div className={`gradai-app ${themeClass}`}>
      <nav className={`navbar ${scrollY > 50 ? "scrolled" : ""}`}>
        <div className="nav-brand">
          <Brain className="nav-icon" />
          <span style={{ color: isDarkMode ? "#fff" : "#000" }}>GradAI</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item} href={`/${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>

      <header
        className="hero"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1 className="hero-title">
          Learn ML with <span>GradAI</span>
        </h1>
        <p>Master Machine Learning: Fundamentals to advanced applications.</p>
      </header>

      <main className="main-content">
        <section className="syllabus">
          <div className="syllabus-header">
            <h2>ML Syllabus</h2>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search topics..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div className="card-container">
            {groupedData.map((group, groupIndex) => (
              <div key={`group-${groupIndex}`} className="card-group">
                {group.map((topic, index) => (
                  <div
                    key={topic.name}
                    className="card card-effect fade-in"
                    onClick={() => handleCardClick(topic.name)}
                    style={{
                      animationDelay: `${(index + groupIndex * 3) * 0.1}s`,
                    }}
                  >
                    <div className="card-content">
                      <topic.icon className="card-icon" />
                      <h3>🧠 {topic.name}</h3>
                      <button
                        className="progress-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProgress(topic.name, 100);
                        }}
                      >
                        <CheckCircle
                          className={`progress-icon ${
                            progress[topic.name] === 100 ? "completed" : ""
                          }`}
                        />
                        {progress[topic.name] === 100
                          ? "Completed"
                          : "Mark as Completed"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        <aside className="sidebar">
          <section className="progress-section">
            <h2>My Progress</h2>
            <div className="progress-container">
              {syllabusData.slice(0, 2).map((topic) => (
                <div key={topic.name} className="progress-item">
                  <span className="progress-label">{topic.name}</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress[topic.name]}%` }}
                    >
                      {progress[topic.name]}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="notes-section">
            <h2>My Notes</h2>
            <div className="notes-container">
              {notes.map((note) => (
                <div key={note.id} className="note-item">
                  <p>{note.text}</p>
                  <button
                    className="delete-note-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div className="add-note-form">
              <form onSubmit={addNote}>
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  rows="3"
                  className="note-input"
                />
                <button type="submit" disabled={!newNote.trim()}>
                  Add Note
                </button>
              </form>
            </div>
          </section>
        </aside>
      </main>

      <footer className="footer">
        <p>
          &copy; 2025 GradAI. Explore more at{" "}
          <a href="https://x.ai/api" className="text-blue-600 hover:underline">
            xAI API
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
