import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Enable Bootstrap

// Main Pages
import HomePage from "./pages/HomePage";
import Learn from "./pages/Learn";
import Build from "./pages/Build";
import Tools from "./pages/Tools";
import Progress from "./pages/Progress";

// Core Subjects
import AI from "./pages/Artificial_Intelligence/AI";
import ML from "./pages/Artificial_Intelligence/AI_MLFundamentals";
import DL from "./pages/Artificial_Intelligence/AI_DeepLearning";
import NLP from "./pages/Artificial_Intelligence/AI_NLP";
import CV from "./pages/Artificial_Intelligence/AI_CV";
import DS from "./pages/DS";
import Introduction from "./pages/Artificial_Intelligence/Introduction";

// New Pages
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";

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
          <Routes>
            {" "}
            {/* Main Pages */} <Route path="/" element={<HomePage />} />{" "}
            <Route path="/learn" element={<Learn />} />{" "}
            <Route path="/build" element={<Build />} />{" "}
            <Route path="/tools" element={<Tools />} />{" "}
            <Route path="/progress" element={<Progress />} />{" "}
            <Route path="/ai/introduction" element={<Introduction />} />{" "}
            <Route path="/ai" element={<AI />} />{" "}
            <Route path="/ml" element={<ML />} />{" "}
            <Route path="/dl" element={<DL />} />{" "}
            <Route path="/nlp" element={<NLP />} />{" "}
            <Route path="/cv" element={<CV />} />{" "}
            <Route path="/ds" element={<DS />} />{" "}
            <Route
              path="/login
                "
              element={<Login />}
            />{" "}
            <Route path="/signup" element={<Signup />} />{" "}
            <Route path="/landing" element={<Landing />} />{" "}
          </Routes>
        )}{" "}
      </Router>{" "}
    </ThemeProvider>
  );
}
