import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

// Main Pages
import HomePage from "./pages/HomePage";
import Learn from "./pages/Learn";
import ResumeBuilder from "./pages/ResumeBuilder"; // ✅ Fixed import name
import Progress from "./pages/Progress";

// Core Subjects
import AI from "./pages/Artificial_Intelligence/AI";
import Introduction from "./pages/Artificial_Intelligence/AI_Introduction";
import KnowledgeRepresentation from "./pages/Artificial_Intelligence/KnowledgeRepresentation";
import DS from "./pages/DS";

// New Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";

// ✅ Contest Page
import Contest from "./pages/Contests/Contest";

// Components
import SplashScreen from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem("hasSeenSplash", "true");
    }
  }, []);

  const handleSplashFinish = () => {
    setFadeOut(true);
    setTimeout(() => setShowSplash(false), 500);
  };

  return (
    <ThemeProvider>
      <Router>
        {" "}
        {showSplash ? (
          <SplashScreen fadeOut={fadeOut} onFinish={handleSplashFinish} />
        ) : (
          <>
            {" "}
            <Routes>
              <Route path="/" element={<HomePage />} />{" "}
              <Route path="/landing" element={<Landing />} />{" "}
              <Route path="/learn" element={<Learn />} />{" "}
              <Route path="/resumebuilder" element={<ResumeBuilder />} />{" "}
              <Route path="/progress" element={<Progress />} />{" "}
              <Route path="/ds" element={<DS />} />{" "}
              <Route path="/ai" element={<AI />} />{" "}
              <Route path="/ai/introduction" element={<Introduction />} />{" "}
              <Route
                path="/ai/knowledge_representation"
                element={<KnowledgeRepresentation />}
              />{" "}
              <Route path="/login" element={<Login />} />{" "}
              <Route path="/signup" element={<Signup />} />{" "}
              <Route path="/contests" element={<Contest />} />{" "}
            </Routes>{" "}
          </>
        )}{" "}
      </Router>{" "}
    </ThemeProvider>
  );
}
