// Landing.jsx
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

  const navItems = ["Dashboard", "Learn", "Build", "Tools", "Progress"];

  const coreSubjects = [
    { name: "Artificial Intelligence", code: "AI", icon: Brain, link: "/ai" },
    { name: "Machine Learning", code: "ML", icon: Cpu, link: "/ml" },
    { name: "Deep Learning", code: "DL", icon: Network, link: "/dl" },
    {
      name: "Natural Language Processing",
      code: "NLP",
      icon: MessageCircle,
      link: "/nlp",
    },
    { name: "Computer Vision", code: "CV", icon: Eye, link: "/cv" },
    {
      name: "Data Science & Analytics",
      code: "DS",
      icon: BarChart,
      link: "/ds",
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Learn",
      description: "AI-powered doubt solving and tutoring",
      link: "/learn",
    },
    {
      icon: Wrench,
      title: "Build",
      description: "Project templates and coaching",
      link: "/build",
    },
    {
      icon: Zap,
      title: "Tools",
      description: "Summarizers, writers, helpers",
      link: "/tools",
    },
    {
      icon: BarChart3,
      title: "Progress",
      description: "Flashcards, badges, growth",
      link: "/progress",
    },
  ];

  const themeClass = isDarkMode ? "dark" : "";

  return (
    <div className={`landing-app ${themeClass}`}>
      {/* Hero Section */}
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
            <Link to="/profile">
              <button className="profile-btn">
                My Profile <User />
              </button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Content */}
      <div className="content">
        {/* Features */}
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

        {/* Core Subjects */}
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

        {/* Profile Section */}
        <section className="my-profile">
          <h2>My Profile</h2>
          <div className="profile-card card">
            <User className="card-icon" size={48} />
            <h3>John Doe</h3>
            <p>Email: john.doe@example.com</p>
            <Link to="/profile">
              <button>Edit Profile</button>
            </Link>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; 2025 GradAI. All rights reserved.</p>
        </footer>
      </div>

      {/* Styles */}
      <style>{`
        * { box-sizing: border-box; }
        body, html, .landing-app { margin: 0; padding: 0; font-family: 'Segoe UI', sans-serif; height: 100%; overflow-x: hidden; background: #000; color: #fff; }

        /* Hero */
        .hero-spline { width: 100%; height: 500px; position: relative; overflow: hidden; }
        .hero-spline canvas { width: 100% !important; height: 100% !important; }

        /* Navbar */
        .navbar { display: flex; justify-content: space-between; align-items: center; padding: 1rem 2rem; position: absolute; top: 0; width: 100%; z-index: 10; background: rgba(0,0,0,0.4); }
        .nav-links a { margin: 0 0.8rem; text-decoration: none; color: #fff; }
        .nav-actions button { margin-left: 0.5rem; }

        /* Sections */
        .content section { padding: 4rem 2rem; text-align: center; }

        /* Feature Cards Grid */
        .feature-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; margin-top: 2rem; }
        .feature-card { padding: 1.5rem; border-radius: 16px; background: #280039; box-shadow: 0 0 20px #ff88cc66, 0 0 40px #28003988; transition: transform 0.3s ease, box-shadow 0.3s ease; min-width: 180px; max-width: 300px; text-decoration: none; color: #fff; }
        .feature-card:hover { transform: translateY(-6px); box-shadow: 0 0 30px #ff88ccaa, 0 0 50px #280039bb; }
        .card-icon { font-size: 2rem; margin-bottom: 0.5rem; }

        /* Subject Cards Grid */
        .subject-grid { display: flex; flex-wrap: wrap; justify-content: center; gap: 1.5rem; margin-top: 2rem; }
        .subject-card { padding: 1rem; border-radius: 16px; border: 1px solid #ff88cc; box-shadow: 0 0 10px #ff88cc50; min-width: 160px; max-width: 280px; text-decoration: none; color: #fff; }

        /* Profile Section */
        .my-profile { margin-top: 3rem; }
        .profile-card { display: inline-block; padding: 2rem; border-radius: 16px; background: #111; box-shadow: 0 0 20px #ff88cc66; text-align: center; min-width: 250px; }
        .profile-card button { margin-top: 1rem; padding: 0.5rem 1rem; border: none; border-radius: 8px; background: #ff88cc; color: #000; cursor: pointer; }

        /* Footer */
        .footer { text-align: center; padding: 2rem; font-size: 0.9rem; color: #aaa; }
      `}</style>
    </div>
  );
}
