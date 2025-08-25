"use client";

import { useState, useEffect } from "react";
import "./UninformedSearch.css";
import NotesSidebar from "../NotesSidebar"; // adjust path

const UninformedSearch = () => {
  console.log("[v0] UninformedSearch component is rendering");

  const [activeTab, setActiveTab] = useState("theory");
  const [currentStep, setCurrentStep] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // Tree structure from the syllabus
  const treeData = {
    A: { children: ["B", "C"], x: 400, y: 50 },
    B: { children: ["D", "E"], x: 200, y: 150 },
    C: { children: ["F"], x: 600, y: 150 },
    D: { children: [], x: 100, y: 250 },
    E: { children: [], x: 300, y: 250 },
    F: { children: [], x: 600, y: 250 },
  };

  const algorithms = [
    {
      name: "Breadth-First Search (BFS)",
      description: "Explores level by level, like ripples in water",
      icon: "🌊",
      complexity: "Time: O(b^d), Space: O(b^d)",
      optimal: "Yes (if step cost = 1)",
      complete: "Yes",
      realWorld: "Finding shortest path in unweighted graphs",
    },
    {
      name: "Depth-First Search (DFS)",
      description: "Goes deep first, like exploring a cave",
      icon: "🕳️",
      complexity: "Time: O(b^m), Space: O(bm)",
      optimal: "No",
      complete: "No (in infinite spaces)",
      realWorld: "Maze solving, topological sorting",
    },
    {
      name: "Uniform Cost Search (UCS)",
      description: "Always expands the lowest cost path first",
      icon: "💰",
      complexity: "Time: O(b^(C*/ε)), Space: O(b^(C*/ε))",
      optimal: "Yes",
      complete: "Yes",
      realWorld: "GPS navigation with different road costs",
    },
  ];

  const allQuizQuestions = [
    {
      question: "Which algorithm explores nodes level by level?",
      options: ["DFS", "BFS", "UCS", "A*"],
      correct: 1,
      explanation:
        "BFS explores all nodes at depth d before exploring nodes at depth d+1.",
    },
    {
      question:
        "Which search algorithm is guaranteed to find the optimal solution?",
      options: ["DFS only", "BFS only", "Both BFS and UCS", "None"],
      correct: 2,
      explanation:
        "Both BFS (for unweighted graphs) and UCS (for weighted graphs) are optimal.",
    },
    {
      question: "What data structure does BFS use?",
      options: ["Stack", "Queue", "Priority Queue", "Array"],
      correct: 1,
      explanation:
        "BFS uses a queue (FIFO) to maintain the frontier of nodes to explore.",
    },
    {
      question: "What data structure does DFS use?",
      options: ["Stack", "Queue", "Priority Queue", "Heap"],
      correct: 0,
      explanation: "DFS uses a stack (LIFO) to keep track of nodes to explore.",
    },
    {
      question: "Which algorithm is complete but not optimal?",
      options: ["BFS", "DFS", "UCS", "All of the above"],
      correct: 1,
      explanation:
        "DFS is complete in finite spaces but not optimal as it may not find the shortest path.",
    },
    {
      question:
        "Which algorithm would be best for finding the shortest path in an unweighted graph?",
      options: ["DFS", "BFS", "UCS", "All are equally good"],
      correct: 1,
      explanation:
        "BFS is optimal for unweighted graphs as it finds the shortest path.",
    },
    {
      question: "What is the main disadvantage of BFS?",
      options: [
        "It may not find a solution",
        "It requires large memory",
        "It's slow",
        "It's not complete",
      ],
      correct: 1,
      explanation:
        "BFS requires storing all nodes at each level, which can consume significant memory.",
    },
    {
      question: "Which algorithm always expands the least-cost node first?",
      options: ["BFS", "DFS", "UCS", "Greedy Search"],
      correct: 2,
      explanation:
        "Uniform Cost Search always expands the node with the lowest path cost.",
    },
    {
      question: "In which scenario would DFS be preferred over BFS?",
      options: [
        "When memory is limited",
        "When the solution is deep",
        "When all solutions are needed",
        "All of the above",
      ],
      correct: 3,
      explanation:
        "DFS uses less memory and can be better when solutions are deep or when all solutions are needed.",
    },
    {
      question: "What is the time complexity of BFS?",
      options: ["O(b^d)", "O(bd)", "O(d^b)", "O(bd)"],
      correct: 0,
      explanation:
        "BFS has a time complexity of O(b^d) where b is branching factor and d is depth.",
    },
  ];

  const realWorldScenarios = [
    {
      title: "🏢 Exploring a Building",
      scenario:
        "You're looking for the exit in an unfamiliar building during a fire drill.",
      bfs: "Check all rooms on current floor before going to next floor - ensures you find the closest exit",
      dfs: "Go down one hallway completely before trying others - might miss closer exits",
      ucs: "Consider factors like crowd density and door width - finds safest route",
    },
    {
      title: "🌐 Web Crawling",
      scenario:
        "A search engine is indexing web pages starting from a homepage.",
      bfs: "Index all pages 1 click away, then 2 clicks away - ensures broad coverage",
      dfs: "Follow links deeply into one section before exploring others - might get stuck in deep sections",
      ucs: "Prioritize pages by importance/relevance scores - indexes most valuable content first",
    },
    {
      title: "🗺️ GPS Navigation",
      scenario: "Finding a route from your home to a restaurant across town.",
      bfs: "Explore all nearby locations first - good for finding shortest path by distance",
      dfs: "Take the first road and keep going - likely to take very long routes",
      ucs: "Consider traffic, road quality, tolls - finds the actually fastest/cheapest route",
    },
  ];

  // Initialize quiz with random questions
  useEffect(() => {
    const shuffledQuestions = [...allQuizQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuizQuestions(shuffledQuestions.slice(0, 10));
  }, []);

  const runBFS = () => {
    console.log("[v0] Running BFS algorithm");
    setIsRunning(true);
    setVisitedNodes([]);
    setCurrentNode("A");
    setQueue(["A"]);
    setCurrentStep(0);

    const steps = [];
    const visited = new Set();
    const queue = ["A"];

    while (queue.length > 0) {
      const node = queue.shift();
      if (visited.has(node)) continue;

      visited.add(node);
      steps.push({
        current: node,
        visited: Array.from(visited),
        queue: [...queue],
        found: node === "F",
      });

      if (node === "F") break;

      treeData[node].children.forEach((child) => {
        if (!visited.has(child)) {
          queue.push(child);
        }
      });
    }

    animateSteps(steps);
  };

  const runDFS = () => {
    console.log("[v0] Running DFS algorithm");
    setIsRunning(true);
    setVisitedNodes([]);
    setCurrentNode("A");
    setQueue(["A"]);
    setCurrentStep(0);

    const steps = [];
    const visited = new Set();
    const stack = ["A"];

    while (stack.length > 0) {
      const node = stack.pop();
      if (visited.has(node)) continue;

      visited.add(node);
      steps.push({
        current: node,
        visited: Array.from(visited),
        queue: [...stack],
        found: node === "F",
      });

      if (node === "F") break;

      // Add children in reverse order for DFS
      const children = [...treeData[node].children].reverse();
      children.forEach((child) => {
        if (!visited.has(child)) {
          stack.push(child);
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
        setQueue(step.queue);
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
    console.log("[v0] Resetting demo");
    setCurrentStep(0);
    setVisitedNodes([]);
    setCurrentNode(null);
    setQueue([]);
    setIsRunning(false);
  };

  const handleQuizAnswer = (answerIndex) => {
    console.log("[v0] Quiz answer selected:", answerIndex);
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
    }, 2000);
  };

  const resetQuiz = () => {
    console.log("[v0] Resetting quiz");
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizStarted(false);

    // Reshuffle questions
    const shuffledQuestions = [...allQuizQuestions].sort(
      () => Math.random() - 0.5
    );
    setQuizQuestions(shuffledQuestions.slice(0, 10));
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="uninformed-app">
      <div className="app-container">
        <div className="app-header">
          <h1>🔍 Uninformed Search Algorithms</h1>
          <p style={{ color: "black" }}>
            Master the fundamentals of blind search algorithms through
            interactive visualizations and real-world examples
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
                  <h2>What is Uninformed Search?</h2>
                  <p style={{ color: "black" }}>
                    Also known as "blind search" - these algorithms have no
                    additional information about the goal beyond the problem
                    definition
                  </p>
                </div>
                <div className="card-content">
                  <div className="info-box">
                    <p>
                      🌟{" "}
                      <strong>Think of it like exploring a dark maze:</strong>{" "}
                      You can only see the immediate paths available, but you
                      don't know which direction leads to the exit. You must
                      systematically explore until you find your goal.
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
                          <div className="algorithm-use-case">
                            <strong>Use case:</strong> {algo.realWorld}
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
                  <h2>Interactive Tree Search: Find Path from A to F</h2>
                  <p style={{ color: "black" }}>
                    Watch how BFS and DFS explore the tree differently to find
                    node F
                  </p>
                </div>
                <div className="card-content">
                  <div className="demo-controls">
                    <button
                      onClick={runBFS}
                      disabled={isRunning}
                      className="btn btn-primary"
                    >
                      Run BFS 🌊
                    </button>
                    <button
                      onClick={runDFS}
                      disabled={isRunning}
                      className="btn btn-secondary"
                    >
                      Run DFS 🕳️
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
                            r="25"
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
                            y={data.y + 5}
                            textAnchor="middle"
                            className="font-bold text-lg"
                            fill={
                              currentNode === node ||
                              visitedNodes.includes(node)
                                ? "white"
                                : "#1e40af"
                            }
                          >
                            {node}
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
                      <h3>Queue/Stack</h3>
                      <div className="node-list">
                        {queue.length > 0 ? (
                          queue.map((node, index) => (
                            <span key={index} className="node-tag">
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
                    <div className="approach bfs">
                      <h4>🌊 BFS Approach</h4>
                      <p>{scenario.bfs}</p>
                    </div>
                    <div className="approach dfs">
                      <h4>🕳️ DFS Approach</h4>
                      <p>{scenario.dfs}</p>
                    </div>
                    <div className="approach ucs">
                      <h4>💰 UCS Approach</h4>
                      <p>{scenario.ucs}</p>
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
                      <h3>Welcome to the Quiz!</h3>
                      <p>
                        Test your knowledge of uninformed search algorithms with{" "}
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
                          : quizScore >= quizQuestions.length * 0.7
                          ? "🎖️"
                          : "📚"}
                      </div>
                      <p>
                        {quizScore === quizQuestions.length
                          ? "Perfect! You've mastered uninformed search!"
                          : quizScore >= quizQuestions.length * 0.7
                          ? "Great job! You understand the concepts well."
                          : "Keep studying! Review the theory and try again."}
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

export default UninformedSearch;
