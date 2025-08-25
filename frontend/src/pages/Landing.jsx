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
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

export default function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Research Paper Analyzer", path: "/ai/research_paper_analyzer" },
    { name: "Contests", path: "/contests" },
    { name: "Resume Builder", path: "/resumebuilder" },
    { name: "Weekly Tracker", path: "/weekly_tracker" },
  ];

  const coreSubjects = [
    { name: "Artificial Intelligence", icon: Brain, link: "/ai" },
    { name: "Machine Learning", icon: Cpu, link: "/ml" },
    { name: "Deep Learning", icon: Network, link: "/dl" },
    { name: "Natural Language Processing", icon: MessageCircle, link: "/nlp" },
    { name: "Computer Vision", icon: Eye, link: "/cv" },
    { name: "Data Science & Analytics", icon: BarChart, link: "/ds" },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Research Paper Analyzer",
      description: "Summarize & analyze research instantly",
      link: "/ai/research_paper_analyzer",
    },
    {
      icon: Wrench,
      title: "Contests",
      description: "View all AI/ML/DS/DSA competitions",
      link: "/contests",
    },
    {
      icon: Zap,
      title: "Resume Builder",
      description: "Summarizers, writers, helpers",
      link: "/resumebuilder",
    },
    {
      icon: BarChart3,
      title: "Weekly Tracker",
      description: "Flashcards, badges, growth",
      link: "/weekly_tracker",
    },
  ];

  return (
    <div className={`landing-app ${isDarkMode ? "dark" : ""}`}>
      <div className="hero-spline">
        <Spline scene="https://prod.spline.design/C838h8XHWYtxM-C0/scene.splinecode" />
        <nav className="navbar">
          <div className="nav-brand">
            <Brain className="nav-icon" />
            <span>GradAI</span>
          </div>
          <div className="nav-links">
            {navItems.map(({ name, path }) => (
              <Link key={name} to={path}>
                {name}
              </Link>
            ))}
          </div>
          <div className="nav-actions">
            <button onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? <Sun /> : <Moon />}
            </button>
            <Link to="/profile">
              <button className="profile-btn">
                My Profile <User />
              </button>
            </Link>
          </div>
        </nav>
      </div>

      <div className="content">
        <section className="features">
          <h2>Platform Features</h2>
          <div className="feature-grid">
            {features.map(({ icon: Icon, title, description, link }, idx) => (
              <Link key={idx} to={link} className="card feature-card">
                <Icon className="card-icon" />
                <h3>{title}</h3>
                <p>{description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="subjects">
          <h2>Core Subjects</h2>
          <div className="subject-grid">
            {coreSubjects.map(({ icon: Icon, name, link }, idx) => (
              <Link key={idx} to={link} className="card subject-card">
                <Icon className="card-icon" />
                <h4>{name}</h4>
              </Link>
            ))}
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2025 GradAI. All rights reserved.</p>
        </footer>
      </div>

      {/* Chatbot button opens Hugging Face Space */}
      <div className="chatbot">
        <div
          className="chatbot-header"
          onClick={() =>
            window.open(
              "https://huggingface.co/spaces/bhumiboinwad/Career_guide_2.0",
              "_blank",
              "width=400,height=600"
            )
          }
        >
          Career Bot
        </div>
      </div>

      <style>{`
        * { box-sizing: border-box; }
        body, html, .landing-app { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; height: 100%; overflow-x: hidden; background: #000; color: #fff; }

        .hero-spline { width: 100%; height: 600px; position: relative; overflow: hidden; }
        .hero-spline canvas { width: 100% !important; height: 100% !important; }

        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; position: absolute; top: 0; width: 100%; z-index: 10; background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255,255,255,0.1); }
        .nav-links a { margin: 0 0.8rem; text-decoration: none; color: #fff; font-weight: 500; }
        .nav-links a:hover { color: #ff88cc; }
        .nav-actions button { margin-left: 0.5rem; cursor: pointer; }
        .profile-btn { background: #ff88cc; border: none; border-radius: 8px; padding: 0.4rem 0.8rem; color: #000; cursor: pointer; margin-left: 1rem; }

        .content section { padding: 4rem 2rem; text-align: center; }

        .feature-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-top: 2rem; }
        .feature-card { padding: 1.5rem; border-radius: 16px; background: #280039; box-shadow: 0 0 20px #ff88cc66, 0 0 40px #28003988; transition: transform 0.3s ease, box-shadow 0.3s ease; min-width: 180px; max-width: 300px; text-decoration: none; color: #fff; }
        .feature-card:hover { transform: translateY(-6px); box-shadow: 0 0 30px #ff88ccaa, 0 0 50px #280039bb; }
        .card-icon { font-size: 2rem; margin-bottom: 0.5rem; }

        .subject-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
        .subject-card { padding: 1rem; border-radius: 16px; border: 1px solid #ff88cc; box-shadow: 0 0 10px #ff88cc50; min-width: 160px; max-width: 280px; text-decoration: none; color: #fff; }

        .footer { text-align: center; padding: 2rem; font-size: 0.9rem; color: #aaa; }

        /* Chatbot button styles */
        .chatbot {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 50;
          font-family: 'Segoe UI', sans-serif;
        }
        .chatbot-header {
          background: #ff88cc;
          color: #000;
          padding: 0.6rem 1rem;
          font-weight: bold;
          cursor: pointer;
          border-radius: 12px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
