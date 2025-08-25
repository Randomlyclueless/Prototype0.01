// src/pages/AI.jsx

import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../components/ThemeContext";
import {
  Brain,
  BookOpen,
  // Wrench,
  // BarChart3,
  MessageCircle,
  Eye,
  Cpu,
  Network,
  BarChart,
  Zap,
  Sun,
  Moon,
  CheckCircle,
} from "lucide-react";

import "./AI.css";

const syllabusData = [
  {
    name: "Introduction",
    icon: Brain,
    topics: [
      "Definition and types of AI",
      "History of AI",
      "Key applications",
      "Ethical considerations",
    ],
    subtopics: [
      "Narrow AI, General AI, Superintelligent AI",
      "From Turing to modern deep learning",
      "Healthcare, finance, autonomous systems, NLP",
      "Bias, fairness, transparency, societal impact",
    ],
    practical:
      "Explore AI tools (e.g., chatbots). Assignment: Analyze an AI case study.",
  },
  {
    name: "Intelligent Agents",
    icon: Cpu,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Uninformed Search",
    icon: Network,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Informed Search",
    icon: Eye,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "CSP (Constraint Satisfaction Problems)",
    icon: BookOpen,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Knowledge Representation",
    icon: MessageCircle,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Logical Inference",
    icon: BarChart,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Reasoning under Uncertainty",
    icon: Zap,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Automated Planning",
    icon: Cpu,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Robotics and Vision",
    icon: Network,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "AI Ethics",
    icon: BookOpen,
    topics: [],
    subtopics: [],
    practical: "",
  },
  {
    name: "Practical Applications and AI Overview",
    icon: CheckCircle,
    topics: [],
    subtopics: [],
    practical: "",
  },
];

export default function AI() {
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
      setNotes((prev) => [...prev, { id: Date.now(), text: newNote }]);
      setNewNote("");
    }
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const handleCardClick = (topicName) => {
    const formattedName = topicName
      .toLowerCase()
      .replace(/[\s()]+/g, "_")
      .replace(/_+/g, "_");
    navigate(`/ai/${formattedName}`);
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

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Research Paper Analyzer", path: "/ai/research_paper_analyzer" },
    { name: "Contests", path: "/contests" },
    { name: "Resume Builder", path: "/resumebuilder" },
    { name: "Weekly Tracker", path: "/weekly_tracker" },
  ];

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
            <a key={item.name} href={item.path}>
              {item.name}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <button type="button" onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
          <button type="button" className="login-btn">
            Login
          </button>
          <button type="button" className="signup-btn">
            Sign Up
          </button>
        </div>
      </nav>

      <header
        className="hero"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1 className="hero-title">
          Learn AI with <span>GradAI</span>
        </h1>
        <p>Master AI: Fundamentals to cutting-edge applications.</p>
      </header>

      <main className="main-content">
        <section className="syllabus">
          <div className="syllabus-header">
            <h2>AI Syllabus</h2>
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
                        type="button"
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
              {syllabusData.map((topic) => (
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
                    type="button"
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
