import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Main Pages
import HomePage from "./pages/HomePage";
import Learn from "./pages/Learn";
import Build from "./pages/Build";
import Tools from "./pages/Tools";
import Progress from "./pages/Progress";

// Core Subjects (all are in /pages folder)
import AI from "./pages/AI";
import ML from "./pages/ML";
import DL from "./pages/DL";
import NLP from "./pages/NLP";
import CV from "./pages/CV";
import DS from "./pages/DS";

export default function App() {
  return (
    <Router>
      <Routes>
        {" "}
        {/* Main Routes */} <Route path="/" element={<HomePage />} />{" "}
        <Route path="/learn" element={<Learn />} />{" "}
        <Route path="/build" element={<Build />} />{" "}
        <Route path="/tools" element={<Tools />} />{" "}
        <Route path="/progress" element={<Progress />} />{" "}
        <Route path="/ai" element={<AI />} />{" "}
        <Route path="/ml" element={<ML />} />{" "}
        <Route path="/dl" element={<DL />} />{" "}
        <Route path="/nlp" element={<NLP />} />{" "}
        <Route path="/cv" element={<CV />} />{" "}
        <Route path="/ds" element={<DS />} />{" "}
      </Routes>{" "}
    </Router>
  );
}
