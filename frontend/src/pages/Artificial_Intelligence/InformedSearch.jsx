"use client";

import { useState, useEffect } from "react";
import "./InformedSearch.css";
import NotesSidebar from "../NotesSidebar";
const InformedSearch = () => {
  const [activeTab, setActiveTab] = useState("theory");
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [openSet, setOpenSet] = useState([]);
  const [closedSet, setClosedSet] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [heuristicValues, setHeuristicValues] = useState({});
  const [pathCosts, setPathCosts] = useState({});

  // Tree structure with heuristic values and edge costs
  const treeData = {
    A: {
      children: ["B", "C"],
      x: 400,
      y: 50,
      h: 5, // heuristic value
    },
    B: {
      children: ["D", "E"],
      x: 200,
      y: 150,
      h: 4,
      cost: 3, // cost from A to B
    },
    C: {
      children: ["F"],
      x: 600,
      y: 150,
      h: 2,
      cost: 4, // cost from A to C
    },
    D: {
      children: [],
      x: 100,
      y: 250,
      h: 6,
      cost: 2, // cost from B to D
    },
    E: {
      children: [],
      x: 300,
      y: 250,
      h: 3,
      cost: 1, // cost from B to E
    },
    F: {
      children: [],
      x: 600,
      y: 250,
      h: 0, // goal node
      cost: 5, // cost from C to F
    },
  };

  const algorithms = [
    {
      name: "Greedy Best-First Search",
      description: "Chooses node with the lowest estimated cost to goal h(n)",
      icon: "🎯",
      complexity: "Time: O(b^m), Space: O(b^m)",
      optimal: "No",
      complete: "No (can get stuck in loops)",
      formula: "f(n) = h(n)",
      advantages: "Fast, uses heuristic to guide search",
      disadvantages: "Not optimal, can be misled by poor heuristic",
    },
    {
      name: "A* Search",
      description: "Expands node with lowest f(n) = g(n) + h(n)",
      icon: "⭐",
      complexity: "Time: O(b^d), Space: O(b^d)",
      optimal: "Yes (if h is admissible)",
      complete: "Yes",
      formula: "f(n) = g(n) + h(n)",
      advantages: "Optimal and complete with admissible heuristic",
      disadvantages: "Memory intensive, stores all visited nodes",
    },
    {
      name: "Iterative Deepening A* (IDA*)",
      description: "Memory-efficient variant of A* using iterative deepening",
      icon: "🔄",
      complexity: "Time: O(b^d), Space: O(d)",
      optimal: "Yes (if h is admissible)",
      complete: "Yes",
      formula: "f(n) = g(n) + h(n) with increasing threshold",
      advantages: "Memory efficient, optimal",
      disadvantages: "Repeated node expansions",
    },
  ];

  const allQuizQuestions = [
    {
      question:
        "Which informed search algorithm guarantees the optimal path if the heuristic is admissible?",
      options: [
        "Greedy Best-First Search",
        "A* Search",
        "Depth-First Search",
        "Uniform Cost Search",
      ],
      correct: 1,
      explanation:
        "A* Search guarantees optimality when using an admissible heuristic (one that never overestimates the cost to reach the goal).",
    },
    {
      question:
        "Fill in the blank: Informed search uses ______ to guide the search.",
      options: ["Blind", "Random", "Heuristics", "Costs only"],
      correct: 2,
      explanation:
        "Informed search uses heuristics (estimates of cost to goal) to guide the search toward promising paths.",
    },
    {
      question: "What is the evaluation function f(n) for A* search?",
      options: [
        "f(n) = g(n)",
        "f(n) = h(n)",
        "f(n) = g(n) + h(n)",
        "f(n) = g(n) - h(n)",
      ],
      correct: 2,
      explanation:
        "A* uses f(n) = g(n) + h(n), where g(n) is the cost from start to n, and h(n) is the estimated cost from n to goal.",
    },
    {
      question: "Which property must a heuristic have for A* to be optimal?",
      options: [
        "Consistency",
        "Admissibility",
        "Monotonicity",
        "All of the above",
      ],
      correct: 1,
      explanation:
        "Admissibility (h(n) never overestimates the true cost to the goal) is required for A* optimality.",
    },
    {
      question: "What is the main disadvantage of Greedy Best-First Search?",
      options: [
        "It's too slow",
        "It uses too much memory",
        "It's not optimal",
        "It only works for trees",
      ],
      correct: 2,
      explanation:
        "Greedy Best-First Search is not optimal as it may choose a path that seems good initially but leads to a suboptimal solution.",
    },
    {
      question:
        "Which algorithm is most memory-efficient among informed search methods?",
      options: [
        "A* Search",
        "Greedy Best-First Search",
        "Iterative Deepening A*",
        "All use similar memory",
      ],
      correct: 2,
      explanation:
        "IDA* uses iterative deepening which makes it memory efficient (O(d)) compared to A* (O(b^d)).",
    },
  ];

  const realWorldScenarios = [
    {
      title: "🗺️ GPS Navigation",
      scenario: "Finding the fastest route between two locations.",
      greedy:
        "Always heads in the direction of the destination (as the crow flies)",
      astar: "Balances distance traveled and estimated remaining distance",
      idastar: "Used in memory-constrained devices for navigation",
    },
    {
      title: "🎮 Game Pathfinding",
      scenario: "NPCs finding paths around obstacles in games.",
      greedy: "Might take suboptimal paths but computes quickly",
      astar: "Finds optimal paths but requires more computation",
      idastar: "Good for games with limited memory resources",
    },
    {
      title: "🤖 Puzzle Solving",
      scenario: "Solving puzzles like the 8-puzzle or Rubik's Cube.",
      greedy: "Might get stuck pursuing seemingly good moves",
      astar: "Systematically finds optimal solution",
      idastar: "Useful for complex puzzles with deep search trees",
    },
  ];

  // Initialize quiz with random questions
  useEffect(() => {
    const shuffledQuestions = [...allQuizQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuizQuestions(shuffledQuestions);

    // Initialize heuristic values
    const heuristics = {};
    const costs = {};
    Object.entries(treeData).forEach(([node, data]) => {
      heuristics[node] = data.h;
      if (data.cost) {
        // For simplicity, we'll set initial path costs
        if (node === "B") costs[node] = 3;
        if (node === "C") costs[node] = 4;
        if (node === "D") costs[node] = 5; // 3 (A→B) + 2 (B→D)
        if (node === "E") costs[node] = 4; // 3 (A→B) + 1 (B→E)
        if (node === "F") costs[node] = 9; // 4 (A→C) + 5 (C→F)
      }
    });
    costs["A"] = 0;
    setHeuristicValues(heuristics);
    setPathCosts(costs);
  }, []);

  const runGreedySearch = () => {
    setIsRunning(true);
    setVisitedNodes([]);
    setCurrentNode("A");
    setOpenSet(["A"]);
    setClosedSet([]);
    setCurrentStep(0);

    const steps = [];
    const visited = new Set();
    const open = ["A"];
    const closed = new Set();

    while (open.length > 0) {
      // Sort by heuristic value (lowest first)
      open.sort((a, b) => treeData[a].h - treeData[b].h);
      const node = open.shift();

      if (visited.has(node)) continue;
      visited.add(node);
      closed.add(node);

      steps.push({
        current: node,
        visited: Array.from(visited),
        open: [...open],
        closed: Array.from(closed),
        found: node === "F",
      });

      if (node === "F") break;

      treeData[node].children.forEach((child) => {
        if (!visited.has(child) && !open.includes(child)) {
          open.push(child);
        }
      });
    }

    animateSteps(steps);
  };

  const runAStarSearch = () => {
    setIsRunning(true);
    setVisitedNodes([]);
    setCurrentNode("A");
    setOpenSet(["A"]);
    setClosedSet([]);
    setCurrentStep(0);

    const steps = [];
    const visited = new Set();
    const open = ["A"];
    const closed = new Set();

    // For simplicity, we'll use precomputed path costs
    const gScore = { A: 0, B: 3, C: 4, D: 5, E: 4, F: 9 };
    const fScore = {
      A: gScore["A"] + treeData["A"].h,
      B: gScore["B"] + treeData["B"].h,
      C: gScore["C"] + treeData["C"].h,
      D: gScore["D"] + treeData["D"].h,
      E: gScore["E"] + treeData["E"].h,
      F: gScore["F"] + treeData["F"].h,
    };

    while (open.length > 0) {
      // Sort by f-score (lowest first)
      open.sort((a, b) => fScore[a] - fScore[b]);
      const node = open.shift();

      if (visited.has(node)) continue;
      visited.add(node);
      closed.add(node);

      steps.push({
        current: node,
        visited: Array.from(visited),
        open: [...open],
        closed: Array.from(closed),
        found: node === "F",
      });

      if (node === "F") break;

      treeData[node].children.forEach((child) => {
        if (!visited.has(child) && !open.includes(child)) {
          open.push(child);
        }
      });
    }

    animateSteps(steps);
  };

  const animateSteps = (steps) => {
    let stepIndex = 0;

    const animate = () => {
      if (stepIndex < steps.length) {
        const step = steps[stepIndex];
        setCurrentNode(step.current);
        setVisitedNodes(step.visited);
        setOpenSet(step.open);
        setClosedSet(step.closed);
        setCurrentStep(stepIndex + 1);

        if (step.found) {
          setIsRunning(false);
          return;
        }

        stepIndex++;
        setTimeout(animate, 1500);
      } else {
        setIsRunning(false);
      }
    };

    animate();
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setVisitedNodes([]);
    setCurrentNode(null);
    setOpenSet([]);
    setClosedSet([]);
    setIsRunning(false);
  };

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

    // Reshuffle questions
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

  return (
    <div className="informed-app">
      <div className="app-container">
        <div className="app-header">
          <h1>🧠 Informed Search Algorithms</h1>
          <p style={{ color: "black" }}>
            Explore heuristic search algorithms that use problem-specific
            knowledge to find solutions more efficiently
          </p>
        </div>

        <div className="app-content">
          <div className="tab-navigation">
            {[
              { id: "theory", label: "📚 Theory" },
              { id: "demo", label: "🎮 Interactive Demo" },
              { id: "realworld", label: "🌍 Real World" },
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
                  <h2>What is Informed Search?</h2>
                  <p style={{ color: "black" }}>
                    Informed search (also called heuristic search) uses
                    problem-specific knowledge to make better choices about
                    which nodes to expand, making it more efficient than
                    uninformed search methods.
                  </p>
                </div>
                <div className="card-content">
                  <div className="info-box">
                    <p>
                      🎯 <strong>Key Concept:</strong> Informed search uses
                      heuristics - estimates of the cost from a node to the goal
                      - to guide the search toward promising paths.
                    </p>
                  </div>
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
                          <div className="algorithm-formula">
                            <strong>Formula:</strong> {algo.formula}
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
                </div>
              </div>
            </div>
          )}

          {activeTab === "demo" && (
            <div className="demo-tab">
              <div className="card">
                <div className="card-header">
                  <h2>Interactive Search: Find Path from A to F</h2>
                  <p style={{ color: "black" }}>
                    Compare how Greedy Best-First Search and A* explore the tree
                    differently. Node values show heuristic (h) and path cost
                    (g).
                  </p>
                </div>
                <div className="card-content">
                  <div className="demo-controls">
                    <button
                      onClick={runGreedySearch}
                      disabled={isRunning}
                      className="btn btn-primary"
                    >
                      Run Greedy Search 🎯
                    </button>
                    <button
                      onClick={runAStarSearch}
                      disabled={isRunning}
                      className="btn btn-secondary"
                    >
                      Run A* Search ⭐
                    </button>
                    <button onClick={resetDemo} className="btn btn-neutral">
                      Reset
                    </button>
                  </div>

                  <div className="tree-visualization">
                    <svg width="700" height="300" className="tree-svg">
                      {/* Draw edges */}
                      {Object.entries(treeData).map(([node, data]) =>
                        data.children.map((child) => (
                          <line
                            key={`${node}-${child}`}
                            x1={data.x}
                            y1={data.y}
                            x2={treeData[child].x}
                            y2={treeData[child].y}
                            className="tree-edge"
                          />
                        ))
                      )}

                      {/* Draw nodes */}
                      {Object.entries(treeData).map(([node, data]) => (
                        <g key={node} className="node">
                          <circle
                            cx={data.x}
                            cy={data.y}
                            r="30"
                            fill={
                              currentNode === node
                                ? "#3b82f6"
                                : visitedNodes.includes(node)
                                ? "#2563eb"
                                : "#f8fafc"
                            }
                            stroke="#3b82f6"
                            strokeWidth="3"
                            className="transition-all duration-500"
                          />
                          <text
                            x={data.x}
                            y={data.y - 8}
                            textAnchor="middle"
                            className="font-bold text-lg"
                            fill={
                              currentNode === node ||
                              visitedNodes.includes(node)
                                ? "white"
                                : "#4669dcff"
                            }
                          >
                            {node}
                          </text>
                          <text
                            x={data.x}
                            y={data.y + 20}
                            textAnchor="middle"
                            className="text-xs"
                            fill="#64748b"
                          >
                            h={data.h}
                            {pathCosts[node] !== undefined &&
                              `, g=${pathCosts[node]}`}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>

                  <div className="demo-status-grid">
                    <div className="status-card">
                      <h3>Current Node</h3>
                      <div className="status-value">{currentNode || "—"}</div>
                    </div>

                    <div className="status-card">
                      <h3>Visited Nodes</h3>
                      <div className="node-list">
                        {visitedNodes.length > 0 ? (
                          visitedNodes.map((node) => (
                            <span key={node} className="node-tag visited">
                              {node}
                            </span>
                          ))
                        ) : (
                          <span className="no-nodes">None</span>
                        )}
                      </div>
                    </div>

                    <div className="status-card">
                      <h3>Open Set</h3>
                      <div className="node-list">
                        {openSet.length > 0 ? (
                          openSet.map((node, index) => (
                            <span key={index} className="node-tag">
                              {node}
                            </span>
                          ))
                        ) : (
                          <span className="no-nodes">Empty</span>
                        )}
                      </div>
                    </div>

                    <div className="status-card">
                      <h3>Closed Set</h3>
                      <div className="node-list">
                        {closedSet.length > 0 ? (
                          closedSet.map((node, index) => (
                            <span key={index} className="node-tag closed">
                              {node}
                            </span>
                          ))
                        ) : (
                          <span className="no-nodes">Empty</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {currentStep > 0 && (
                    <div className="progress-container">
                      <div className="progress-header">
                        <span>Step {currentStep}</span>
                        <span>
                          {visitedNodes.includes("F")
                            ? "Goal Found! 🎉"
                            : "Searching..."}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${(currentStep / 6) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "realworld" && (
            <div className="realworld-tab">
              {realWorldScenarios.map((scenario, index) => (
                <div key={index} className="scenario-card">
                  <div className="scenario-header">
                    <h2>{scenario.title}</h2>
                    <p>{scenario.scenario}</p>
                  </div>
                  <div className="scenario-approaches">
                    <div className="approach">
                      <h4>🎯 Greedy Approach</h4>
                      <p>{scenario.greedy}</p>
                    </div>
                    <div className="approach">
                      <h4>⭐ A* Approach</h4>
                      <p>{scenario.astar}</p>
                    </div>
                    <div className="approach">
                      <h4>🔄 IDA* Approach</h4>
                      <p>{scenario.idastar}</p>
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
                  <h2>Test Your Knowledge</h2>
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
                      <h3>Welcome to the Informed Search Quiz!</h3>
                      <p>
                        Test your knowledge of heuristic search algorithms with{" "}
                        {quizQuestions.length} questions.
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
                          ? "Perfect! You've mastered informed search!"
                          : quizScore >= quizQuestions.length * 0.8
                          ? "Excellent! You have a strong understanding of heuristic search."
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
      <NotesSidebar />
    </div>
  );
};

export default InformedSearch;
