import React, { useState, useEffect } from "react";
import {
  Brain,
  BookOpen,
  Wrench,
  BarChart3,
  MessageCircle,
  Eye,
  Cpu,
  Network,
  BarChart,
  Zap,
  Sun,
  Moon,
} from "lucide-react";

export default function GradAIHomepage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ["Home", "Learn", "Build", "Tools", "Progress"];

  const coreSubjects = [
    { name: "Artificial Intelligence", code: "AI", icon: Brain },
    { name: "Machine Learning", code: "ML", icon: Cpu },
    { name: "Deep Learning", code: "DL", icon: Network },
    { name: "Natural Language Processing", code: "NLP", icon: MessageCircle },
    { name: "Computer Vision", code: "CV", icon: Eye },
    { name: "Data Science & Analytics", code: "DS", icon: BarChart },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Learn",
      description: "AI-powered doubt solving and tutoring",
    },
    {
      icon: Wrench,
      title: "Build",
      description: "Project templates and coaching",
    },
    { icon: Zap, title: "Tools", description: "Summarizers, writers, helpers" },
    {
      icon: BarChart3,
      title: "Progress",
      description: "Flashcards, badges, growth",
    },
  ];

  const themeClass = isDarkMode ? "dark" : "";

  return (
    <div className={`gradai-app ${themeClass}`}>
      <nav className={`navbar ${scrollY > 50 ? "scrolled" : ""}`}>
        <div className="nav-brand">
          <Brain className="nav-icon" />
          <span style={{ color: "black" }}>GradAI</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item} href="/#">
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

      <header className="hero">
        <h1 className="hero-title">
          Empower Your AI Journey with <span>GradAI</span>
        </h1>
        <p>
          Learn, Build, and Grow smarter with our personalized GenAI platform.
        </p>
        <div className="hero-buttons">
          <button className="primary-btn">Get Started</button>
          <button className="secondary-btn">Learn More</button>
        </div>
      </header>

      <section className="features">
        <h2>Platform Features</h2>
        <div className="card-grid">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="card card-effect">
              <Icon className="card-icon" />
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="subjects">
        <h2>Core Subjects</h2>
        <div className="card-grid">
          {coreSubjects.map(({ icon: Icon, name, code }) => (
            <div
              key={code}
              className="card subject card-effect"
              onClick={() => (window.location.href = `/subjects/${code}`)}
              style={{ cursor: "pointer" }}
            >
              <Icon className="card-icon" />
              <h4>{name}</h4>
            </div>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2025 GradAI. All rights reserved.</p>
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
          padding: 10rem 2rem 4rem;
          text-align: center;
          background: radial-gradient(circle at top, #b388eb, #e6e6fa);
          color: white;
          backdrop-filter: blur(10px);
          box-shadow: inset 0 -10px 40px rgba(0, 0, 0, 0.3);
        }
        .hero span {
          color: #ffeaa7;
        }
        .hero-buttons button {
          margin: 1rem 0.5rem;
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: transform 0.2s, background 0.3s;
        }
        .hero-buttons button:hover {
          transform: scale(1.05);
        }
        .primary-btn {
          background: #8e44ad;
          color: white;
        }
        .secondary-btn {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        section {
          padding: 4rem 2rem;
          text-align: center;
        }
        .card-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        .card {
          background: rgba(255, 255, 255, 0.5);
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
        }
        .card-effect:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.12);
        }
        .dark .card {
          background: #222;
        }
        .card-icon {
          width: 40px;
          height: 40px;
          margin-bottom: 1rem;
          color: #8e44ad;
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
      `}</style>
    </div>
  );
}
