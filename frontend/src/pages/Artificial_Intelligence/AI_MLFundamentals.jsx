import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../components/ThemeContext";
import { Brain, Sun, Moon, Cpu, CheckCircle } from "lucide-react";

const mlSyllabusData = [
  {
    name: "Supervised Learning",
    icon: Cpu,
    topics: [
      "Linear regression",
      "Logistic regression",
      "Support Vector Machines",
      "Decision trees",
    ],
    subtopics: [
      "Ordinary least squares, gradient descent",
      "Sigmoid function, binary classification",
      "Kernels, margin maximization",
      "CART, random forests",
    ],
    practical:
      "Implement linear regression with scikit-learn. Assignment: Predict house prices.",
  },
  {
    name: "Unsupervised Learning",
    icon: Brain,
    topics: [
      "Clustering",
      "Dimensionality reduction",
      "Anomaly detection",
      "Association rules",
    ],
    subtopics: [
      "K-means, hierarchical clustering",
      "PCA, t-SNE",
      "Isolation forests, one-class SVM",
      "Apriori algorithm",
    ],
    practical:
      "Apply k-means clustering with scikit-learn. Assignment: Cluster customer data.",
  },
  {
    name: "Evaluation Metrics",
    icon: CheckCircle,
    topics: [
      "Accuracy and error metrics",
      "Precision, recall, F1-score",
      "ROC and AUC",
      "Cross-validation",
    ],
    subtopics: [
      "Mean squared error, R-squared",
      "Confusion matrix, trade-offs",
      "Receiver operating characteristic, area under curve",
      "K-fold, stratified sampling",
    ],
    practical:
      "Evaluate a model with scikit-learn metrics. Assignment: Analyze model performance.",
  },
  {
    name: "Regularization",
    icon: Cpu,
    topics: [
      "Overfitting and underfitting",
      "L1 regularization",
      "L2 regularization",
      "Dropout",
    ],
    subtopics: [
      "Bias-variance tradeoff",
      "Lasso regression, feature selection",
      "Ridge regression, weight shrinkage",
      "Preventing overfitting in neural networks",
    ],
    practical:
      "Apply L1/L2 regularization with scikit-learn. Assignment: Tune a regularized model.",
  },
];

export default function ML() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const [scrollY, setScrollY] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const toggleProgress = (index) => {
    setProgress((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCardClick = (topicName) => {
    const formattedName = topicName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/ml/${formattedName}`);
  };

  const filteredData = mlSyllabusData.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchTerm) ||
      topic.topics.some((t) => t.toLowerCase().includes(searchTerm)) ||
      topic.subtopics.some((s) => s.toLowerCase().includes(searchTerm))
  );

  // Group cards into chunks of three
  const groupedData = [];
  for (let i = 0; i < filteredData.length; i += 3) {
    groupedData.push(filteredData.slice(i, i + 3));
  }

  const navItems = ["Home", "Learn", "Build", "Tools", "Progress"];
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
          Learn Machine Learning with <span>GradAI</span>
        </h1>
        <p>Master the fundamentals of machine learning.</p>
      </header>

      <main className="main-content">
        <section className="syllabus">
          <div className="syllabus-header">
            <h2>Machine Learning Syllabus</h2>
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
                    key={index + groupIndex * 3}
                    className="card card-effect"
                    onClick={() => handleCardClick(topic.name)}
                    style={{
                      opacity: 0,
                      animation: `fadeIn 0.5s ease forwards ${
                        (index + groupIndex * 3) * 0.1
                      }s`,
                      cursor: "pointer",
                    }}
                  >
                    <div className="card-content">
                      <topic.icon className="card-icon" />
                      <h3>🧠 {topic.name}</h3>
                      <button
                        className="progress-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProgress(index + groupIndex * 3);
                        }}
                      >
                        <CheckCircle
                          className={`progress-icon ${
                            progress[index + groupIndex * 3] ? "completed" : ""
                          }`}
                        />
                        {progress[index + groupIndex * 3]
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
            <p>Track your course completion and achievements here.</p>
          </section>
          <section className="notes-section">
            <h2>My Notes</h2>
            <p>Add and review your personal notes for each topic.</p>
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

      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, .gradai-app {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(145deg, #e6e6fa, #f9f0f2);
          color: #222;
          scroll-behavior: smooth;
        }
        .dark {
          background: #111;
          color: #eee;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 1000;
          background: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.8);
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: bold;
        }
        .nav-links a {
          margin: 0 0.8rem;
          text-decoration: none;
          color: inherit;
          transition: color 0.2s;
        }
        .nav-links a:hover {
          color: #8e44ad;
        }
        .nav-actions button {
          margin-left: 1rem;
          border: none;
          background: none;
          color: inherit;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .nav-actions button:hover {
          transform: scale(1.1);
        }
        .login-btn {
          font-weight: 500;
        }
        .signup-btn {
          background: #8e44ad;
          color: #fff;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: background 0.3s;
        }
        .signup-btn:hover {
          background: #732d91;
        }
        .hero {
          padding: 6rem 2rem 2rem;
          text-align: center;
          background: radial-gradient(circle at top, #b388eb, #e6e6fa);
          color: white;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 -10px 40px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease;
        }
        .hero-title {
          font-size: 1.8rem;
          margin: 0.5rem 0;
        }
        .hero span {
          color: #ffeaa7;
        }
        .hero p {
          font-size: 1rem;
          margin: 0.5rem 0;
        }
        .main-content {
          display: flex;
          min-height: calc(100vh - 200px);
        }
        .syllabus {
          flex: 0 0 900px;
          padding: 2rem;
          text-align: left;
        }
        .syllabus-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 900px;
          margin-left: 0;
          margin-bottom: 1rem;
        }
        .syllabus-header h2 {
          font-size: 1.5rem;
          margin: 0;
        }
        .search-bar {
          max-width: 300px;
          margin-left: 1rem;
        }
        .search-bar input {
          width: 100%;
          padding: 0.5rem;
          border: 2px solid #8e44ad;
          border-radius: 8px;
          font-size: 0.9rem;
          background: rgba(255, 255, 255, 0.8);
          transition: background 0.3s, border-color 0.3s;
        }
        .dark .search-bar input {
          background: #222;
          color: #eee;
          border-color: #8e44ad;
        }
        .search-bar input:focus {
          outline: none;
          border-color: #732d91;
        }
        .card-container {
          width: 900px;
          margin-left: 0;
        }
        .card-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1rem;
          justify-content: flex-start;
        }
        .card {
          flex: 0 0 280px;
          background: rgba(255, 255, 255, 0.5);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          backdrop-filter: blur(10px);
          min-height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card-effect:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
        }
        .dark .card {
          background: #222;
        }
        .card-icon {
          width: 32px;
          height: 32px;
          margin-bottom: 0.5rem;
          color: #8e44ad;
        }
        .card-content {
          text-align: center;
        }
        .card-content h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0.5rem 0;
        }
        .progress-btn {
          margin-top: 0.5rem;
          padding: 0.4rem 0.8rem;
          border: 2px solid #8e44ad;
          border-radius: 5px;
          background: transparent;
          color: #8e44ad;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: background 0.3s, color 0.3s;
          font-size: 0.9rem;
        }
        .progress-btn:hover {
          background: #8e44ad;
          color: white;
        }
        .progress-icon {
          width: 18px;
          height: 18px;
        }
        .progress-icon.completed {
          color: #ffeaa7;
        }
        .sidebar {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 2rem;
        }
        .progress-section {
          flex: 1;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
          margin-bottom: 1rem;
        }
        .dark .progress-section {
          background: #222;
        }
        .notes-section {
          flex: 1;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          backdrop-filter: blur(10px);
          padding: 1.5rem;
        }
        .dark .notes-section {
          background: #222;
        }
        .progress-section h2, .notes-section h2 {
          font-size: 1.3rem;
          margin: 0 0 0.5rem;
        }
        .progress-section p, .notes-section p {
          font-size: 1rem;
          margin: 0;
        }
        .footer {
          text-align: center;
          padding: 2rem;
          font-size: 0.9rem;
          background: #ece4f8;
        }
        .dark .footer {
          background: #000;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
