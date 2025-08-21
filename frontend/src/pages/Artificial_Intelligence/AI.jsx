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
    name: "Mathematical Foundations",
    icon: BookOpen,
    topics: [
      "Linear algebra",
      "Calculus",
      "Probability and statistics",
      "Information theory",
    ],
    subtopics: [
      "Vectors, matrices, eigenvalues, SVD",
      "Gradients, optimization, partial derivatives",
      "Distributions, Bayes’ theorem, hypothesis testing",
      "Entropy, KL divergence",
    ],
    practical:
      "Python exercises with NumPy/SciPy. Assignment: Implement gradient descent.",
  },
  {
    name: "Machine Learning Fundamentals",
    icon: Cpu,
    topics: [
      "Supervised learning",
      "Unsupervised learning",
      "Evaluation metrics",
      "Regularization",
    ],
    subtopics: [
      "Linear regression, logistic regression, SVMs",
      "Clustering (k-means, hierarchical), PCA",
      "Accuracy, precision, recall, F1-score, ROC curves",
      "Overfitting, underfitting, L1/L2 regularization",
    ],
    practical:
      "Build models with scikit-learn. Assignment: Train and tune a classifier.",
  },
  {
    name: "Deep Learning",
    icon: Network,
    topics: [
      "Neural network basics",
      "Architectures",
      "Frameworks",
      "Transfer learning",
    ],
    subtopics: [
      "Perceptrons, activation functions, backpropagation",
      "CNNs, RNNs, LSTMs, Transformers",
      "TensorFlow, PyTorch, JAX",
      "Pre-trained models",
    ],
    practical:
      "Build a CNN for image classification. Assignment: Fine-tune a BERT model.",
  },
  {
    name: "Natural Language Processing",
    icon: MessageCircle,
    topics: [
      "Text preprocessing",
      "Word embeddings",
      "Sequence models",
      "Applications",
    ],
    subtopics: [
      "Tokenization, stemming, lemmatization",
      "Word2Vec, GloVe, BERT embeddings",
      "RNNs, LSTMs, attention mechanisms",
      "Chatbots, translation, sentiment analysis",
    ],
    practical:
      "Build a chatbot with Hugging Face. Assignment: Text classification model.",
  },
  {
    name: "Computer Vision",
    icon: Eye,
    topics: [
      "Image processing",
      "CNN architectures",
      "Object detection",
      "Generative models",
    ],
    subtopics: [
      "Filters, edge detection",
      "VGG, ResNet, YOLO",
      "Segmentation, object detection",
      "GANs",
    ],
    practical:
      "Implement YOLO for object detection. Assignment: Generate images with a GAN.",
  },
  {
    name: "Reinforcement Learning",
    icon: Zap,
    topics: ["Markov decision processes", "Deep RL", "Applications"],
    subtopics: [
      "Q-learning, policy gradients",
      "DQN, PPO, A3C",
      "Game playing, robotics",
    ],
    practical: "Train an agent with OpenAI Gym. Assignment: RL for grid-world.",
  },
  {
    name: "Advanced Topics",
    icon: BarChart,
    topics: [
      "Generative AI",
      "AI for science",
      "Federated learning",
      "Multimodal models",
    ],
    subtopics: [
      "Diffusion models, advanced GANs",
      "Drug discovery, climate modeling",
      "Privacy-preserving AI",
      "Combining vision, text, audio",
    ],
    practical:
      "Experiment with diffusion models. Assignment: Research an AI trend.",
  },
  {
    name: "AI Ethics & Deployment",
    icon: BookOpen,
    topics: ["Bias mitigation", "Model deployment", "MLOps", "Regulations"],
    subtopics: [
      "Explainability, fairness",
      "APIs, cloud platforms (AWS, GCP)",
      "Model monitoring, CI/CD",
      "GDPR, AI Act",
    ],
    practical: "Deploy a model with Flask. Assignment: Audit model for bias.",
  },
  {
    name: "Capstone Project",
    icon: CheckCircle,
    topics: ["Project design", "Implementation", "Presentation"],
    subtopics: [
      "Choose a domain (e.g., healthcare)",
      "Data collection, model training, deployment",
      "Demo and findings",
    ],
    practical: "Build and present an end-to-end AI solution.",
  },
];

export default function AI() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState(
    syllabusData.reduce(
      (acc, topic) => ({
        ...acc,
        [topic.name]: 0, // Initialize progress as percentage
      }),
      {}
    )
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
    if (topicName.toLowerCase() === "introduction") {
      navigate(`/ai/introduction`);
    } else {
      const formattedName = topicName.toLowerCase().replace(/\s+/g, "-");
      navigate(`/ai/${formattedName}`);
    }
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

  const navItems = ["Home", "Learn", "Build", "Tools", "Progress"];
  const themeClass = isDarkMode ? "dark" : "";

  return (
    <div className={`gradai-app ${themeClass}`}>
      {/* Navbar */}
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

      {/* Hero Section */}
      <header
        className="hero"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <h1 className="hero-title">
          Learn AI with <span>GradAI</span>
        </h1>
        <p>Master AI: Fundamentals to cutting-edge applications.</p>
      </header>

      {/* Main Syllabus */}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          updateProgress(topic.name, 100); // Mark as completed sets to 100%
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

        {/* Sidebar */}
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

      {/* Footer */}
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
