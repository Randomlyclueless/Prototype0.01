"use client";

import { useState, useEffect } from "react";
import "./IntelligentAgents.css";
import NotesSidebar from "../NotesSidebar";
const IntelligentAgents = () => {
  const [activeTab, setActiveTab] = useState("theory");
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);

  // Enhanced agent types with more detailed information
  const agentTypes = [
    {
      name: "Simple Reflex Agent",
      description:
        "Acts only on the basis of the current percept, ignoring the percept history.",
      icon: "⚡",
      example:
        "A thermostat that turns on AC when temperature rises above a set point.",
      architecture: "Condition-Action Rules",
      advantages: "Simple to design and implement",
      limitations:
        "Only works in fully observable environments; infinite loops possible",
      diagram: "Sensors → Condition-Action Rules → Actuators",
      formula: "Action = f(CurrentPercept)",
    },
    {
      name: "Model-Based Reflex Agent",
      description:
        "Maintains internal state to track aspects of the world not visible in current percept.",
      icon: "🧩",
      example:
        "A self-driving car that remembers the position of other vehicles even when not directly visible.",
      architecture:
        "Sensors → Internal State → Model of World → Condition-Action Rules → Actuators",
      advantages: "Can handle partially observable environments",
      limitations: "Requires maintaining an accurate world model",
      formula: "Action = f(InternalState, CurrentPercept)",
    },
    {
      name: "Goal-Based Agent",
      description:
        "Selects actions that are expected to achieve explicitly defined goals.",
      icon: "🎯",
      example: "A navigation app that finds routes to a specified destination.",
      architecture:
        "Sensors → Internal State → Goal Information → Planning → Actuators",
      advantages:
        "More flexible than reflex agents; can consider future actions",
      limitations:
        "May be computationally expensive; requires goal specification",
      formula: "Action = argmax[P(Goal|Action, State)]",
    },
    {
      name: "Utility-Based Agent",
      description:
        "Maximizes a performance measure (utility function) to choose between conflicting goals.",
      icon: "📈",
      example:
        "A trading bot that balances risk and return according to predefined preferences.",
      architecture:
        "Sensors → Internal State → Utility Function → Decision Making → Actuators",
      advantages: "Can make trade-offs between multiple objectives",
      limitations: "Designing appropriate utility functions can be challenging",
      formula: "Action = argmax[Utility(State, Action)]",
    },
    {
      name: "Learning Agent",
      description:
        "Improves performance through learning from experiences and feedback.",
      icon: "🧠",
      example:
        "Recommendation systems that adapt to user preferences over time.",
      architecture:
        "Sensors → Learning Element → Performance Element → Critic → Problem Generator → Actuators",
      advantages: "Can adapt to new environments and improve over time",
      limitations: "Requires training data; may make mistakes during learning",
      formula: "Performance = f(Experience, Time)",
    },
  ];

  // Environment types that agents operate in
  const environmentTypes = [
    {
      name: "Fully Observable vs Partially Observable",
      description:
        "Whether the agent can see the complete state of the environment or only parts of it.",
      example: "Chess (fully observable) vs Poker (partially observable)",
    },
    {
      name: "Deterministic vs Stochastic",
      description:
        "Whether the next state is completely determined by the current state and action, or has random elements.",
      example: "Crossword puzzle (deterministic) vs Dice game (stochastic)",
    },
    {
      name: "Episodic vs Sequential",
      description:
        "Whether the agent's experience is divided into atomic episodes or involves a sequence of dependent actions.",
      example: "Image classification (episodic) vs Chess game (sequential)",
    },
    {
      name: "Static vs Dynamic",
      description:
        "Whether the environment changes while the agent is deliberating.",
      example: "Crossword puzzle (static) vs Traffic navigation (dynamic)",
    },
    {
      name: "Discrete vs Continuous",
      description:
        "Whether the environment has a finite number of distinct states or continuous states.",
      example: "Tic-tac-toe (discrete) vs Drone flight (continuous)",
    },
    {
      name: "Single Agent vs Multi-Agent",
      description:
        "Whether there is one agent or multiple agents that may cooperate or compete.",
      example: "Solitaire (single agent) vs Soccer (multi-agent)",
    },
  ];

  // Enhanced quiz questions
  const allQuizQuestions = [
    {
      question:
        "Which agent type would be most appropriate for a fully observable, deterministic environment like a simple production line?",
      options: [
        "Learning Agent",
        "Utility-Based Agent",
        "Simple Reflex Agent",
        "Goal-Based Agent",
      ],
      correct: 2,
      explanation:
        "In fully observable, deterministic environments, simple reflex agents are often sufficient and most efficient.",
    },
    {
      question:
        "What is the key component that distinguishes a model-based reflex agent from a simple reflex agent?",
      options: [
        "Goal information",
        "Internal state",
        "Learning mechanism",
        "Utility function",
      ],
      correct: 1,
      explanation:
        "Model-based agents maintain an internal state to handle partially observable environments.",
    },
    {
      question:
        "Which agent architecture would be most suitable for making trade-offs between multiple competing objectives?",
      options: [
        "Simple Reflex Agent",
        "Model-Based Reflex Agent",
        "Goal-Based Agent",
        "Utility-Based Agent",
      ],
      correct: 3,
      explanation:
        "Utility-based agents use a utility function to evaluate and choose between conflicting goals.",
    },
    {
      question:
        "In which type of environment would a simple reflex agent perform poorly?",
      options: [
        "Fully observable",
        "Partially observable",
        "Deterministic",
        "Episodic",
      ],
      correct: 1,
      explanation:
        "Simple reflex agents lack memory and thus struggle in partially observable environments where history matters.",
    },
    {
      question: "What is the PEAS representation for an automated taxi driver?",
      options: [
        "Performance: Safety, Efficiency; Environment: Roads, Traffic; Actuators: Steering, Accelerator; Sensors: Camera, GPS",
        "Performance: Profit; Environment: Passengers; Actuators: Voice; Sensors: Microphone",
        "Performance: Speed; Environment: Highways; Actuators: Brakes; Sensors: Speedometer",
        "Performance: Comfort; Environment: Seats; Actuators: Air conditioning; Sensors: Thermometer",
      ],
      correct: 0,
      explanation:
        "PEAS stands for Performance measure, Environment, Actuators, Sensors - the first option provides the most comprehensive representation.",
    },
    {
      question:
        "Which component of a learning agent is responsible for suggesting exploratory actions?",
      options: [
        "Performance element",
        "Learning element",
        "Critic",
        "Problem generator",
      ],
      correct: 3,
      explanation:
        "The problem generator suggests actions that will lead to new informative experiences.",
    },
    {
      question:
        "What is the key limitation of goal-based agents compared to utility-based agents?",
      options: [
        "They cannot handle partially observable environments",
        "They lack a mechanism for comparing between different goal achievement paths",
        "They cannot learn from experience",
        "They are computationally more expensive",
      ],
      correct: 1,
      explanation:
        "Goal-based agents know when a goal is achieved but cannot compare how well different goals are achieved, which utility-based agents can do.",
    },
  ];

  const realWorldScenarios = [
    {
      title: "🧹 Autonomous Vacuum Cleaner",
      scenario: "An AI vacuum deciding how to clean a room efficiently.",
      reflex: "Moves forward until obstacle, then random turn.",
      model: "Builds map of room, remembers cleaned areas.",
      goal: "Seeks to cover all areas of the floor.",
      utility:
        "Optimizes cleaning pattern considering battery life, time, and cleanliness level.",
      learning:
        "Learns furniture arrangement and high-traffic areas over time.",
    },
    {
      title: "🚗 Self-Driving Car",
      scenario: "A car navigating complex urban environments.",
      reflex: "Applies brakes when detecting sudden obstacle.",
      model:
        "Tracks positions of other vehicles, pedestrians, and traffic signals.",
      goal: "Navigate from origin to destination following traffic rules.",
      utility: "Balances safety, travel time, comfort, and fuel efficiency.",
      learning:
        "Improves driving behavior based on accumulated driving experience.",
    },
    {
      title: "📧 Email Filtering System",
      scenario: "Classifying incoming emails as spam or legitimate.",
      reflex:
        "Flags emails containing certain keywords like 'FREE' or 'WINNER'.",
      model: "Maintains sender reputation database and user preferences.",
      goal: "Correctly identify spam messages while avoiding false positives.",
      utility:
        "Maximizes accuracy while minimizing inconvenience of missed important emails.",
      learning: "Adapts to new spam patterns and user feedback over time.",
    },
    {
      title: "🎮 Game AI (Chess)",
      scenario: "Computer opponent in a strategy game.",
      reflex: "Captures opponent pieces when possible.",
      model: "Maintains board state and possible moves.",
      goal: "Checkmate the opponent's king.",
      utility:
        "Evaluates board positions using heuristic functions considering material advantage, position control, etc.",
      learning:
        "Improves evaluation function through self-play and analysis of grandmaster games.",
    },
  ];

  // PEAS examples for different agents
  const peasExamples = [
    {
      agent: "Autonomous Taxi Driver",
      performance: "Safety, efficiency, profit, legality, comfort",
      environment: "Roads, traffic, pedestrians, weather, customers",
      actuators: "Steering, accelerator, brake, signal, display, speaker",
      sensors: "Cameras, GPS, LIDAR, speedometer, accelerometer, microphone",
    },
    {
      agent: "Medical Diagnosis System",
      performance: "Accuracy, reliability, speed, explanation capability",
      environment: "Patients, symptoms, test results, medical literature",
      actuators: "Display diagnoses, recommendations, confidence levels",
      sensors: "Input symptoms, test results, patient history",
    },
    {
      agent: "Part-Picking Robot",
      performance: "Percentage of parts correctly placed, speed",
      environment: "Conveyor belt with parts, bins, other robots",
      actuators: "Jointed arm, gripper, moving base",
      sensors: "Camera, tactile sensors, position sensors",
    },
  ];

  // Shuffle quiz on load
  useEffect(() => {
    const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
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

    const shuffled = [...allQuizQuestions].sort(() => Math.random() - 0.5);
    setQuizQuestions(shuffled);
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setQuizScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="agents-app">
      <div className="app-container">
        <div className="app-header">
          <h1>🤖 Intelligent Agents</h1>
          <p>
            Explore how artificial agents perceive, reason, and act in different
            environments. Understand the PEAS framework, agent types, and their
            applications.
          </p>
        </div>

        {/* Tabs */}
        <div className="tab-navigation">
          {[
            { id: "theory", label: "📚 Theory" },
            { id: "environments", label: "🌍 Environments" },
            { id: "peas", label: "🟣 PEAS Framework" },
            { id: "wumpus", label: "👹 Wumpus World" },
            { id: "realworld", label: "🚀 Applications" },
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

        {/* Theory */}
        {activeTab === "theory" && (
          <div className="theory-tab">
            <div className="card">
              <div className="card-header">
                <h2 style={{ color: "black" }}>What are Intelligent Agents?</h2>
                <p style={{ color: "black" }}>
                  An intelligent agent is an autonomous entity that perceives
                  its environment through sensors and acts upon that environment
                  using actuators to achieve goals. Agents may also learn from
                  experience to improve their performance.
                </p>
              </div>
              <div className="card-content">
                <div className="algorithms-grid">
                  {agentTypes.map((agent, index) => (
                    <div key={index} className="algorithm-card">
                      <div className="algorithm-header">
                        <h3>
                          <span className="algorithm-icon">{agent.icon}</span>
                          {agent.name}
                        </h3>
                        <p>{agent.description}</p>
                      </div>
                      <div className="algorithm-details">
                        <div className="detail-item">
                          <strong>Architecture:</strong> {agent.architecture}
                        </div>
                        <div className="detail-item">
                          <strong>Example:</strong> {agent.example}
                        </div>
                        <div className="detail-item">
                          <strong>Advantages:</strong> {agent.advantages}
                        </div>
                        <div className="detail-item">
                          <strong>Limitations:</strong> {agent.limitations}
                        </div>
                        <div className="detail-item formula">
                          <strong>Formula:</strong> {agent.formula}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Environments */}
        {activeTab === "environments" && (
          <div className="environments-tab">
            <div className="card">
              <div className="card-header">
                <h2 style={{ color: "black" }}>Types of Environments</h2>
                <p style={{ color: "black" }}>
                  The nature of the environment plays a crucial role in
                  determining the appropriate agent design. Different
                  environments pose different challenges for agents.
                </p>
              </div>
              <div className="card-content">
                <div className="environments-grid">
                  {environmentTypes.map((env, index) => (
                    <div key={index} className="environment-card">
                      <h3>{env.name}</h3>
                      <p>{env.description}</p>
                      <div className="environment-example">
                        <strong>Example:</strong> {env.example}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PEAS Framework */}
        {activeTab === "peas" && (
          <div className="peas-tab">
            <div className="card">
              <div className="card-header">
                <h2 style={{ color: "black" }}>PEAS Framework</h2>
                <p style={{ color: "black" }}>
                  PEAS stands for Performance measure, Environment, Actuators,
                  and Sensors. It is a framework used to define the setting for
                  an intelligent agent.
                </p>
              </div>
              <div className="card-content">
                <div className="peas-description">
                  <div className="peas-component">
                    <h3>Performance Measure</h3>
                    <p>
                      How we evaluate the agent's success. This is often a
                      combination of factors.
                    </p>
                  </div>
                  <div className="peas-component">
                    <h3>Environment</h3>
                    <p>
                      The world in which the agent operates, with all its
                      relevant aspects.
                    </p>
                  </div>
                  <div className="peas-component">
                    <h3>Actuators</h3>
                    <p>
                      The means by which the agent can affect its environment.
                    </p>
                  </div>
                  <div className="peas-component">
                    <h3>Sensors</h3>
                    <p>
                      The means by which the agent perceives its environment.
                    </p>
                  </div>
                </div>

                <h3>PEAS Examples</h3>
                <div className="peas-examples">
                  {peasExamples.map((example, index) => (
                    <div key={index} className="peas-example-card">
                      <h4>{example.agent}</h4>
                      <div className="peas-details">
                        <p>
                          <strong>Performance:</strong> {example.performance}
                        </p>
                        <p>
                          <strong>Environment:</strong> {example.environment}
                        </p>
                        <p>
                          <strong>Actuators:</strong> {example.actuators}
                        </p>
                        <p>
                          <strong>Sensors:</strong> {example.sensors}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Wumpus World */}
        {activeTab === "wumpus" && (
          <div className="wumpus-tab">
            <div className="card">
              <div className="card-header">
                <h2 style={{ color: "black" }}> Wumpus World Environment</h2>
                <p style={{ color: "black" }}>
                  Explore the classic Wumpus World problem - a grid-based
                  environment where an agent must find gold while avoiding pits
                  and the Wumpus
                </p>
              </div>
              <div className="card-content">
                <div className="wumpus-world">
                  <div className="wumpus-controls">
                    <button className="btn btn-primary">
                      Generate New World
                    </button>
                    <button className="btn btn-secondary">
                      Run Simulation
                    </button>
                    <button className="btn btn-neutral">Reset</button>
                  </div>

                  <div className="wumpus-grid">
                    <div className="grid-container">
                      {[3, 2, 1, 0].map((row) => (
                        <div key={row} className="grid-row">
                          {[0, 1, 2, 3].map((col) => {
                            const cellId = `${row}-${col}`;
                            return (
                              <div key={cellId} className="grid-cell">
                                <div className="cell-content">
                                  <div className="cell-percepts">
                                    <span className="percept stench">👃</span>
                                    <span className="percept breeze">💨</span>
                                    <span className="percept glitter">✨</span>
                                  </div>
                                  <div className="cell-entities">
                                    <span className="entity wumpus">👹</span>
                                    <span className="entity pit">🕳️</span>
                                    <span className="entity gold">💰</span>
                                  </div>
                                  <div className="agent">🤖</div>
                                </div>
                                <div className="cell-coords">{cellId}</div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="wumpus-info">
                    <div className="info-section">
                      <h3>Performance Measure</h3>
                      <ul>
                        <li>+1000 for climbing out with gold</li>
                        <li>-1000 for falling into pit or being eaten</li>
                        <li>-1 for each action taken</li>
                        <li>-10 for using the arrow</li>
                      </ul>
                    </div>

                    <div className="info-section">
                      <h3>Environment</h3>
                      <ul>
                        <li>4×4 grid of rooms</li>
                        <li>Pits in some rooms</li>
                        <li>One Wumpus (monster)</li>
                        <li>One pile of gold</li>
                      </ul>
                    </div>

                    <div className="info-section">
                      <h3>Actuators</h3>
                      <ul>
                        <li>Move: Forward, Turn Left, Turn Right</li>
                        <li>Grab: Pick up gold</li>
                        <li>Shoot: Fire arrow (once)</li>
                        <li>Climb: Leave the cave</li>
                      </ul>
                    </div>

                    <div className="info-section">
                      <h3>Sensors</h3>
                      <ul>
                        <li>Stench: Wumpus is adjacent</li>
                        <li>Breeze: Pit is adjacent</li>
                        <li>Glitter: Gold is in current room</li>
                        <li>Bump: Hit a wall</li>
                        <li>Scream: Wumpus was killed</li>
                      </ul>
                    </div>
                  </div>

                  <div className="wumpus-status">
                    <div className="status-item">
                      <span className="status-label">Score:</span>
                      <span className="status-value">0</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Arrows:</span>
                      <span className="status-value">1</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Gold:</span>
                      <span className="status-value">No</span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Status:</span>
                      <span className="status-value">Exploring</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Real World Applications */}
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
                    <h4>⚡ Reflex Approach</h4>
                    <p>{scenario.reflex}</p>
                  </div>
                  <div className="approach">
                    <h4>🧩 Model-Based</h4>
                    <p>{scenario.model}</p>
                  </div>
                  <div className="approach">
                    <h4>🎯 Goal-Based</h4>
                    <p>{scenario.goal}</p>
                  </div>
                  <div className="approach">
                    <h4>📈 Utility-Based</h4>
                    <p>{scenario.utility}</p>
                  </div>
                  <div className="approach">
                    <h4>🧠 Learning Approach</h4>
                    <p>{scenario.learning}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quiz */}
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
                    <h3>Welcome to the Intelligent Agents Quiz!</h3>
                    <p>
                      Test your understanding of agent types, environments, and
                      the PEAS framework with {quizQuestions.length} questions.
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
                    <p>
                      {quizScore === quizQuestions.length
                        ? "🏆 Perfect! You've mastered intelligent agents!"
                        : quizScore >= quizQuestions.length * 0.8
                        ? "🎖️ Excellent! You have a strong understanding of agents."
                        : quizScore >= quizQuestions.length * 0.6
                        ? "👍 Good effort! Review the material and try again."
                        : "📚 Keep studying! Review the theory tabs and try again."}
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
      <NotesSidebar />
    </div>
  );
};

export default IntelligentAgents;
