import React, { useState } from "react";
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
import Spline from "@splinetool/react-spline";
import { Link } from "react-router-dom";

export default function GradAIHomepage() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = ["Home", "Learn", "Contests", "Tools", "Progress"];

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
      {/* 🌌 Top Hero with Spline */}
      <div className="hero-spline">
        <Spline scene="https://prod.spline.design/C838h8XHWYtxM-C0/scene.splinecode" />
        <nav className="navbar">
          <div className="nav-brand">
            <Brain className="nav-icon" />
            <span>GradAI</span>
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
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </div>
        </nav>
      </div>

      {/* 🌟 Normal content below spline */}
      <div className="content">
        {/* Features scrolling right-to-left */}
        <section className="features">
          <h2>Platform Features</h2>
          <div className="feature-scroll">
            <div className="feature-track">
              {features
                .concat(features)
                .map(({ icon: Icon, title, description }, idx) => (
                  <div key={idx} className="card card-effect feature-card">
                    <Icon className="card-icon" />
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* Core Subjects scrolling left-to-right */}
        <section className="subjects">
          <h2>Core Subjects</h2>
          <div className="subject-scroll">
            <div className="subject-track">
              {coreSubjects
                .concat(coreSubjects)
                .map(({ icon: Icon, name }, idx) => (
                  <div
                    key={idx}
                    className="card subject card-effect subject-card"
                  >
                    <Icon className="card-icon" />
                    <h4>{name}</h4>
                  </div>
                ))}
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2025 GradAI. All rights reserved.</p>
        </footer>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body, html, .gradai-app {
          margin: 0;
          padding: 0;
          font-family: 'Segoe UI', sans-serif;
          height: 100%;
          overflow-x: hidden;
          background: #000;
          color: #fff;
        }
        /* Hero Section */
        .hero-spline {
          width: 100%;
          height: 600px;
          position: relative;
          overflow: hidden;
        }
        .hero-spline canvas {
          width: 100% !important;
          height: 100% !important;
        }
        /* Navbar */
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          position: absolute;
          top: 0;
          width: 100%;
          z-index: 10;
          background: rgba(0,0,0,0.4);
        }
        .nav-links a {
          margin: 0 0.8rem;
          text-decoration: none;
          color: #fff;
        }
        .nav-actions button {
          margin-left: 0.5rem;
        }
        .login-btn,
        .signup-btn {
          color: #d7ce1fff;
          background: #ff88cc;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s ease;
        }
        .login-btn:hover,
        .signup-btn:hover {
          background: #ff66aa;
        }
        /* Sections */
        .content section {
          padding: 4rem 2rem;
          text-align: center;
        }
        /* Card Styling */
        .card {
          background: #111;
          border-radius: 12px;
          padding: 2rem;
          box-shadow: 0 0 15px rgba(255,255,255,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease;
          border: 1px solid transparent;
        }
        .card:hover {
          transform: translateY(-6px);
          box-shadow: 0 0 20px rgba(255,255,255,0.3);
        }
        .card-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        /* Feature scroll */
        .feature-scroll { overflow: hidden; position: relative; margin-top: 2rem; }
        .feature-track {
          display: flex;
          width: max-content;
          animation: scroll-left 25s linear infinite;
        }
        .feature-card {
          margin-right: 2rem;
          border: 1px solid #ff88cc;
          box-shadow: 0 0 10px #ff88cc50;
        }

        /* Core Subjects scroll */
        .subject-scroll { overflow: hidden; position: relative; margin-top: 2rem; }
        .subject-track {
          display: flex;
          width: max-content;
          animation: scroll-right 25s linear infinite;
        }
        .subject-card {
          margin-right: 2rem;
          border: 1px solid #ff88cc;
          box-shadow: 0 0 10px #ff88cc50;
        }

        /* Scroll Animations */
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }

        /* Footer */
        .footer {
          text-align: center;
          padding: 2rem;
          font-size: 0.9rem;
          color: #aaa;
        }
      `}</style>
    </div>
  );
}
