"use client";

import React, { useState, useEffect } from "react";
import "./CSP.css";

const CSPNotes = () => {
  const [activeTab, setActiveTab] = useState("theory");
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [mapColors, setMapColors] = useState({});
  const [sudokuGrid, setSudokuGrid] = useState(
    Array(9)
      .fill()
      .map(() => Array(9).fill(0))
  );
  const [algorithmStep, setAlgorithmStep] = useState(0);
  const [isSolving, setIsSolving] = useState(false);

  // CSP algorithms information
  const algorithms = [
    {
      name: "Backtracking Search",
      description:
        "Systematically tries all assignments, backtracking when constraints are violated",
      icon: "🔍",
      complexity: "Time: O(d^n), Space: O(n)",
      optimal: "Yes",
      complete: "Yes",
      advantages: "Guaranteed to find solution if exists, simple to implement",
      disadvantages: "Exponential time complexity for worst case",
    },
    {
      name: "Forward Checking",
      description:
        "Maintains arc consistency during search, pruning domains of unassigned variables",
      icon: "➡️",
      complexity: "Time: O(n^2 d^3), Space: O(n^2 d)",
      optimal: "Yes",
      complete: "Yes",
      advantages: "Reduces search space significantly",
      disadvantages: "More overhead than simple backtracking",
    },
    {
      name: "Minimum Remaining Values (MRV)",
      description:
        "Heuristic that selects variable with fewest legal values remaining",
      icon: "📊",
      complexity: "Varies with implementation",
      optimal: "Yes",
      complete: "Yes",
      advantages: "Reduces branching factor, often finds solution faster",
      disadvantages: "Requires maintaining domain information",
    },
    {
      name: "Arc Consistency (AC-3)",
      description:
        "Enforces consistency between pairs of variables by pruning inconsistent values",
      icon: "🔄",
      complexity: "Time: O(n^2 d^3), Space: O(n^2 d)",
      optimal: "No (but helps other algorithms)",
      complete: "N/A (preprocessing step)",
      advantages:
        "Powerful preprocessing that can solve some problems without search",
      disadvantages: "Does not guarantee solution alone",
    },
  ];

  // Map coloring example data
  const mapData = {
    variables: ["WA", "NT", "SA", "Q", "NSW", "V", "T"],
    domains: {
      WA: ["Red", "Green", "Blue"],
      NT: ["Red", "Green", "Blue"],
      SA: ["Red", "Green", "Blue"],
      Q: ["Red", "Green", "Blue"],
      NSW: ["Red", "Green", "Blue"],
      V: ["Red", "Green", "Blue"],
      T: ["Red", "Green", "Blue"],
    },
    constraints: [
      ["WA", "NT"],
      ["WA", "SA"],
      ["NT", "SA"],
      ["NT", "Q"],
      ["SA", "Q"],
      ["SA", "NSW"],
      ["SA", "V"],
      ["Q", "NSW"],
      ["NSW", "V"],
    ],
  };

  // Quiz questions
  const allQuizQuestions = [
    {
      question: "Which of the following is NOT a component of a CSP?",
      options: ["Variables", "Domains", "Constraints", "Heuristics"],
      correct: 3,
      explanation:
        "Heuristics are used to improve search efficiency but are not a fundamental component of CSP definition.",
    },
    {
      question: "Sudoku is an example of which type of problem?",
      options: [
        "Constraint Satisfaction Problem",
        "Optimization Problem",
        "Classification Problem",
        "Regression Problem",
      ],
      correct: 0,
      explanation:
        "Sudoku is a classic example of a CSP where each cell is a variable, domain is 1-9, and constraints are the row, column and box rules.",
    },
    {
      question: "In CSPs, a solution must:",
      options: [
        "Satisfy all constraints",
        "Satisfy most constraints",
        "Minimize an objective function",
        "Maximize an objective function",
      ],
      correct: 0,
      explanation:
        "A solution to a CSP must satisfy all constraints - there's no concept of partially satisfying constraints.",
    },
    {
      question:
        "Which heuristic selects the variable with the fewest legal values remaining?",
      options: [
        "Degree Heuristic",
        "Minimum Remaining Values (MRV)",
        "Least Constraining Value",
        "Forward Checking",
      ],
      correct: 1,
      explanation:
        "MRV (Minimum Remaining Values) selects the variable with the fewest legal values left, which helps reduce the branching factor.",
    },
    {
      question: "What does the AC-3 algorithm enforce?",
      options: [
        "Arc consistency",
        "Path consistency",
        "Node consistency",
        "Global consistency",
      ],
      correct: 0,
      explanation:
        "AC-3 enforces arc consistency by ensuring that for every constraint between two variables, each value in one variable's domain has a compatible value in the other variable's domain.",
    },
    {
      question:
        "Which algorithm systematically tries assignments and backtracks when constraints are violated?",
      options: [
        "Forward Checking",
        "Backtracking Search",
        "Arc Consistency",
        "Minimum Conflicts",
      ],
      correct: 1,
      explanation:
        "Backtracking search is the basic complete algorithm for CSPs that tries assignments and backtracks when constraints are violated.",
    },
  ];

  // Real world applications
  const realWorldApplications = [
    {
      title: "🗺️ Map Coloring",
      description:
        "Color regions so that adjacent regions have different colors",
      constraints: "Adjacency constraints between regions",
      complexity: "NP-complete in general case",
      example:
        "Scheduling problems where adjacent time slots can't have conflicting activities",
    },
    {
      title: "📅 Timetable Scheduling",
      description: "Assign classes to time slots and rooms without conflicts",
      constraints: "Teacher availability, room capacity, no time conflicts",
      complexity: "NP-hard",
      example: "University course scheduling, conference room booking",
    },
    {
      title: "🛠️ Resource Allocation",
      description:
        "Assign resources to tasks optimally while respecting constraints",
      constraints:
        "Resource availability, task requirements, precedence constraints",
      complexity: "NP-hard",
      example: "Project management, manufacturing scheduling",
    },
    {
      title: "🔐 Cryptography",
      description: "Problems formulated as CSPs for encryption or decryption",
      constraints: "Mathematical relationships between variables",
      complexity: "Varies with cryptographic scheme",
      example: "Cryptarithmetic puzzles, breaking certain ciphers",
    },
  ];

  // Initialize quiz with random questions
  useEffect(() => {
    const shuffledQuestions = [...allQuizQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuizQuestions(shuffledQuestions);

    // Initialize map with no colors
    const initialColors = {};
    mapData.variables.forEach((variable) => {
      initialColors[variable] = "";
    });
    setMapColors(initialColors);

    // Initialize a simple Sudoku puzzle
    const initialGrid = Array(9)
      .fill()
      .map(() => Array(9).fill(0));
    // Add some starting numbers
    initialGrid[0][0] = 5;
    initialGrid[0][1] = 3;
    initialGrid[0][4] = 7;
    initialGrid[1][0] = 6;
    initialGrid[1][3] = 1;
    initialGrid[1][4] = 9;
    initialGrid[1][5] = 5;
    initialGrid[2][1] = 9;
    initialGrid[2][2] = 8;
    initialGrid[2][7] = 6;
    initialGrid[3][0] = 8;
    initialGrid[3][4] = 6;
    initialGrid[3][8] = 3;
    initialGrid[4][0] = 4;
    initialGrid[4][3] = 8;
    initialGrid[4][5] = 3;
    initialGrid[4][8] = 1;
    initialGrid[5][0] = 7;
    initialGrid[5][4] = 2;
    initialGrid[5][8] = 6;
    initialGrid[6][1] = 6;
    initialGrid[6][6] = 2;
    initialGrid[6][7] = 8;
    initialGrid[7][3] = 4;
    initialGrid[7][4] = 1;
    initialGrid[7][5] = 9;
    initialGrid[7][8] = 5;
    initialGrid[8][4] = 8;
    initialGrid[8][7] = 7;
    initialGrid[8][8] = 9;

    setSudokuGrid(initialGrid);
  }, []);

  const handleQuizAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setQuizScore(quizScore + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizStarted(false);

    const shuffledQuestions = [...allQuizQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuizQuestions(shuffledQuestions);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const colorMap = () => {
    setIsSolving(true);
    setAlgorithmStep(0);

    // Simple backtracking algorithm visualization
    const steps = [];
    const solution = {};
    const stack = [{ variable: null, value: null, assignment: {} }];

    while (stack.length > 0) {
      const current = stack.pop();
      const assignment = { ...current.assignment };

      if (current.variable) {
        assignment[current.variable] = current.value;
        steps.push({
          assignment: { ...assignment },
          currentVariable: current.variable,
        });
      }

      // Check if all variables are assigned
      const unassigned = mapData.variables.filter((v) => !assignment[v]);
      if (unassigned.length === 0) {
        steps.push({
          assignment: { ...assignment },
          currentVariable: null,
          solved: true,
        });
        break;
      }

      // Select next variable (simple ordering)
      const nextVar = unassigned[0];

      // Try values for this variable
      for (const value of mapData.domains[nextVar]) {
        let valid = true;

        // Check constraints with neighbors
        for (const [v1, v2] of mapData.constraints) {
          if (
            (v1 === nextVar && assignment[v2] === value) ||
            (v2 === nextVar && assignment[v1] === value)
          ) {
            valid = false;
            break;
          }
        }

        if (valid) {
          stack.push({ variable: nextVar, value, assignment });
        }
      }
    }

    // Animate the solving process
    let step = 0;
    const animate = () => {
      if (step < steps.length) {
        setMapColors(steps[step].assignment);
        setAlgorithmStep(step + 1);
        step++;
        setTimeout(animate, 1000);
      } else {
        setIsSolving(false);
      }
    };

    animate();
  };

  const resetMap = () => {
    const resetColors = {};
    mapData.variables.forEach((variable) => {
      resetColors[variable] = "";
    });
    setMapColors(resetColors);
    setAlgorithmStep(0);
  };

  const solveSudokuStep = () => {
    // Placeholder for Sudoku solving logic
    // This would implement a CSP solver for Sudoku
    alert(
      "Sudoku solver would be implemented here with step-by-step visualization"
    );
  };

  return (
    <div className="csp-app">
      <div className="app-container">
        <div className="app-header">
          <h1>🧩 Constraint Satisfaction Problems</h1>
          <p>
            Explore how constraints between variables can be satisfied to solve
            complex problems
          </p>
        </div>

        <div className="app-content">
          <div className="tab-navigation">
            {[
              { id: "theory", label: "📚 Theory" },
              { id: "examples", label: "💡 Examples" },
              { id: "algorithms", label: "⚙️ Algorithms" },
              { id: "applications", label: "🌍 Applications" },
              { id: "quiz", label: "🧠 Quiz" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "theory" && (
            <div className="theory-tab">
              <div className="card">
                <div className="card-header">
                  <h2>What is a Constraint Satisfaction Problem?</h2>
                  <p>
                    A Constraint Satisfaction Problem (CSP) is defined by a set
                    of variables, each with a domain of possible values, and a
                    set of constraints that specify allowable combinations of
                    values.
                  </p>
                </div>
                <div className="card-content">
                  <div className="info-box">
                    <p>
                      🎯 <strong>Key Concept:</strong> CSPs are about finding
                      assignments to variables that satisfy all constraints,
                      rather than optimizing an objective function.
                    </p>
                  </div>

                  <h3>Components of a CSP:</h3>
                  <div className="csp-components">
                    <div className="component">
                      <h4>Variables</h4>
                      <p>
                        X₁, X₂, ..., Xₙ representing the entities to assign
                        values to
                      </p>
                    </div>
                    <div className="component">
                      <h4>Domains</h4>
                      <p>
                        D₁, D₂, ..., Dₙ representing possible values for each
                        variable
                      </p>
                    </div>
                    <div className="component">
                      <h4>Constraints</h4>
                      <p>
                        Rules that restrict allowable combinations of values
                      </p>
                    </div>
                  </div>

                  <h3>CSP Formalism:</h3>
                  <div className="formalism">
                    <p>A CSP is a triple ⟨X, D, C⟩ where:</p>
                    <ul>
                      <li>X = {`{X₁, X₂, ..., Xₙ}`} is a set of variables</li>
                      <li>
                        D = {`{D₁, D₂, ..., Dₙ}`} is a set of domains for each
                        variable
                      </li>
                      <li>C = {`{C₁, C₂, ..., Cₘ}`} is a set of constraints</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "examples" && (
            <div className="examples-tab">
              <div className="card">
                <div className="card-header">
                  <h2>Map Coloring Problem</h2>
                  <p>
                    Color the map of Australia so that adjacent regions have
                    different colors
                  </p>
                </div>
                <div className="card-content">
                  <div className="map-coloring">
                    <div className="map-controls">
                      <button
                        onClick={colorMap}
                        disabled={isSolving}
                        className="btn btn-primary"
                      >
                        {isSolving ? "Solving..." : "Solve with Backtracking"}
                      </button>
                      <button onClick={resetMap} className="btn btn-neutral">
                        Reset
                      </button>
                    </div>

                    <div className="map-container">
                      <div className="australia-map">
                        <div className={`region wa ${mapColors.WA}`}>WA</div>
                        <div className={`region nt ${mapColors.NT}`}>NT</div>
                        <div className={`region sa ${mapColors.SA}`}>SA</div>
                        <div className={`region q ${mapColors.Q}`}>Q</div>
                        <div className={`region nsw ${mapColors.NSW}`}>NSW</div>
                        <div className={`region v ${mapColors.V}`}>V</div>
                        <div className={`region t ${mapColors.T}`}>T</div>
                      </div>
                    </div>

                    {algorithmStep > 0 && (
                      <div className="algorithm-progress">
                        <div className="progress-header">
                          <span>Step {algorithmStep}</span>
                          <span>
                            {Object.values(mapColors).every((c) => c)
                              ? "Solved! 🎉"
                              : "Solving..."}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sudoku-section">
                    <h3>Sudoku Puzzle</h3>
                    <p>
                      Another classic CSP example with row, column, and 3×3 box
                      constraints
                    </p>

                    <div className="sudoku-grid">
                      {sudokuGrid.map((row, i) => (
                        <div key={i} className="sudoku-row">
                          {row.map((cell, j) => (
                            <div key={j} className="sudoku-cell">
                              {cell !== 0 ? cell : ""}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={solveSudokuStep}
                      className="btn btn-secondary"
                    >
                      Solve Step by Step
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "algorithms" && (
            <div className="algorithms-tab">
              <div className="card">
                <div className="card-header">
                  <h2>CSP Solving Algorithms</h2>
                  <p>
                    Various algorithms and techniques for solving constraint
                    satisfaction problems
                  </p>
                </div>
                <div className="card-content">
                  <div className="algorithms-grid">
                    {algorithms.map((algo, index) => (
                      <div key={index} className="algorithm-card">
                        <div className="algorithm-header">
                          <h3>
                            <span className="algorithm-icon">{algo.icon}</span>
                            {algo.name}
                          </h3>
                          <p>{algo.description}</p>
                        </div>
                        <div className="algorithm-details">
                          <div className="algorithm-complexity">
                            <strong>Complexity:</strong> {algo.complexity}
                          </div>
                          <div className="algorithm-tags">
                            <span
                              className={`tag ${
                                algo.optimal === "Yes"
                                  ? "tag-success"
                                  : "tag-neutral"
                              }`}
                            >
                              Optimal: {algo.optimal}
                            </span>
                            <span
                              className={`tag ${
                                algo.complete === "Yes"
                                  ? "tag-success"
                                  : "tag-neutral"
                              }`}
                            >
                              Complete: {algo.complete}
                            </span>
                          </div>
                          <div className="algorithm-pros-cons">
                            <div className="pros">
                              <strong>Advantages:</strong> {algo.advantages}
                            </div>
                            <div className="cons">
                              <strong>Disadvantages:</strong>{" "}
                              {algo.disadvantages}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="algorithm-visualization">
                    <h3>Backtracking Search Visualization</h3>
                    <div className="search-tree">
                      <div className="tree-node root">
                        <span>Start</span>
                        <div className="tree-branch">
                          <div className="tree-node">
                            <span>WA=Red</span>
                            <div className="tree-branch">
                              <div className="tree-node">
                                <span>NT=Green</span>
                                <div className="tree-branch">
                                  <div className="tree-node success">
                                    <span>Solution Found</span>
                                  </div>
                                </div>
                              </div>
                              <div className="tree-node">
                                <span>NT=Blue</span>
                                <div className="tree-branch">
                                  <div className="tree-node">
                                    <span>SA=Green</span>
                                    <div className="tree-branch">
                                      <div className="tree-node failure">
                                        <span>Backtrack</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="tree-node">
                            <span>WA=Green</span>
                            <div className="tree-branch">
                              <div className="tree-node">
                                <span>NT=Red</span>
                                <div className="tree-branch">
                                  <div className="tree-node">
                                    <span>SA=Blue</span>
                                    <div className="tree-branch">
                                      <div className="tree-node success">
                                        <span>Solution Found</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "applications" && (
            <div className="applications-tab">
              {realWorldApplications.map((app, index) => (
                <div key={index} className="application-card">
                  <div className="application-header">
                    <h2>{app.title}</h2>
                    <p>{app.description}</p>
                  </div>
                  <div className="application-details">
                    <div className="detail-item">
                      <strong>Constraints:</strong> {app.constraints}
                    </div>
                    <div className="detail-item">
                      <strong>Complexity:</strong> {app.complexity}
                    </div>
                    <div className="detail-item">
                      <strong>Example:</strong> {app.example}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "quiz" && (
            <div className="quiz-tab">
              <div className="card">
                <div className="card-header">
                  <h2>Test Your CSP Knowledge</h2>
                  <div className="quiz-status">
                    <span className="status-badge">
                      Questions: {quizQuestions.length}
                    </span>
                    {quizStarted && (
                      <span className="status-badge">
                        Progress: {currentQuestion + 1}/{quizQuestions.length}
                      </span>
                    )}
                    {quizStarted && (
                      <span className="status-badge">
                        Score: {quizScore}/
                        {currentQuestion + (showResult ? 1 : 0)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="card-content">
                  {!quizStarted ? (
                    <div className="quiz-intro">
                      <h3>Welcome to the CSP Quiz!</h3>
                      <p>
                        Test your knowledge of constraint satisfaction problems
                        with {quizQuestions.length} questions.
                      </p>
                      <button onClick={startQuiz} className="btn btn-primary">
                        Start Quiz
                      </button>
                    </div>
                  ) : currentQuestion < quizQuestions.length ? (
                    <div className="quiz-content">
                      <h3>{quizQuestions[currentQuestion].question}</h3>

                      <div className="quiz-options">
                        {quizQuestions[currentQuestion].options.map(
                          (option, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuizAnswer(index)}
                              disabled={showResult}
                              className={`quiz-option ${
                                showResult
                                  ? index ===
                                    quizQuestions[currentQuestion].correct
                                    ? "correct"
                                    : index === selectedAnswer
                                    ? "incorrect"
                                    : "disabled"
                                  : ""
                              }`}
                            >
                              <span className="option-letter">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="option-text">{option}</span>
                            </button>
                          )
                        )}
                      </div>

                      {showResult && (
                        <div className="quiz-feedback">
                          <p>
                            {selectedAnswer ===
                            quizQuestions[currentQuestion].correct
                              ? "✅ Correct! "
                              : "❌ Incorrect. "}
                            {quizQuestions[currentQuestion].explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="quiz-results">
                      <h3>Quiz Complete! 🎉</h3>
                      <div className="score-display">
                        Your Score: {quizScore}/{quizQuestions.length} (
                        {Math.round((quizScore / quizQuestions.length) * 100)}%)
                      </div>
                      <div className="result-emoji">
                        {quizScore === quizQuestions.length
                          ? "🏆"
                          : quizScore >= quizQuestions.length * 0.8
                          ? "🎖️"
                          : quizScore >= quizQuestions.length * 0.6
                          ? "👍"
                          : "📚"}
                      </div>
                      <p>
                        {quizScore === quizQuestions.length
                          ? "Perfect! You've mastered CSPs!"
                          : quizScore >= quizQuestions.length * 0.8
                          ? "Excellent! You have a strong understanding of CSPs."
                          : quizScore >= quizQuestions.length * 0.6
                          ? "Good effort! Review the material and try again."
                          : "Keep studying! Review the theory tabs and try again."}
                      </p>
                      <button onClick={resetQuiz} className="btn btn-primary">
                        Take Quiz Again
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSPNotes;
