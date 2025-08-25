import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";

// import HomePage from "./pages/HomePage";
import ResumeBuilder from "./pages/ResumeBuilder";
import Progress from "./pages/Progress";

import AI from "./pages/Artificial_Intelligence/AI";
import Introduction from "./pages/Artificial_Intelligence/AI_Introduction";
import KnowledgeRepresentation from "./pages/Artificial_Intelligence/KnowledgeRepresentation";
import LogicalInference from "./pages/Artificial_Intelligence/LogicalInference";
import ResearchPaperAnalyzer from "./pages/Artificial_Intelligence/ResearchPaperAnalyzer";
import UninformedSearch from "./pages/Artificial_Intelligence/UninformedSearch";
import InformedSearch from "./pages/Artificial_Intelligence/InformedSearch";
import IntelligentAgents from "./pages/Artificial_Intelligence/IntelligentAgents";
import CSPNotes from "./pages/Artificial_Intelligence/CSPNotes";

import ML from "./pages/ML/ML";
import MLIntroduction from "./pages/ML/ML_Introduction";
import SupervisedLearning from "./pages/ML/SupervisedLearning";
import UnsupervisedLearning from "./pages/ML/UnsupervisedLearning";

import DS from "./pages/DS";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Contest from "./pages/Contests/Contest";
import WeeklyTracker from "./pages/WeeklyTracker";

import SplashScreen from "./components/SplashScreen";
import Dashboard from "./pages/Dashboard";

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
          <Routes>
            <Route path="/" element={<Landing />} />{" "}
            <Route path="/resumebuilder" element={<ResumeBuilder />} />{" "}
            <Route path="/progress" element={<Progress />} />{" "}
            <Route path="/ds" element={<DS />} />{" "}
            <Route path="/ai" element={<AI />} />{" "}
            <Route path="/ai/introduction" element={<Introduction />} />{" "}
            <Route
              path="/ai/knowledge_representation"
              element={<KnowledgeRepresentation />}
            />{" "}
            <Route
              path="/ai/logical_inference"
              element={<LogicalInference />}
            />{" "}
            <Route
              path="/ai/research_paper_analyzer"
              element={<ResearchPaperAnalyzer />}
            />{" "}
            <Route
              path="/ai/uninformed_search"
              element={<UninformedSearch />}
            />{" "}
            <Route path="/ai/informed_search" element={<InformedSearch />} />{" "}
            <Route
              path="/ai/intelligent_agents"
              element={<IntelligentAgents />}
            />{" "}
            <Route path="/ai/csp_notes" element={<CSPNotes />} />{" "}
            <Route path="/ml" element={<ML />} />{" "}
            <Route path="/ml/ml_introduction" element={<MLIntroduction />} />{" "}
            <Route
              path="/ml/supervised_learning"
              element={<SupervisedLearning />}
            />{" "}
            <Route
              path="/ml/unsupervised_learning"
              element={<UnsupervisedLearning />}
            />{" "}
            <Route path="/login" element={<Login />} />{" "}
            <Route path="/signup" element={<Signup />} />{" "}
            <Route path="/contests" element={<Contest />} />{" "}
            <Route path="/weekly_tracker" element={<WeeklyTracker />} />{" "}
            <Route path="/dashboard" element={<Dashboard />} />{" "}
          </Routes>
        )}{" "}
      </Router>{" "}
    </ThemeProvider>
  );
}
