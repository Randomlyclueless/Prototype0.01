// src/pages/ML/SupervisedLearning.jsx
import React, { useState } from "react";

export default function SupervisedLearning() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState("linear-regression");

  const styles = {
    container: {
      padding: "2rem",
      fontFamily: "'Inter', 'Segoe UI', sans-serif",
      color: "#f0f0f0",
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      minHeight: "100vh",
    },
    header: {
      fontSize: "2.8rem",
      fontWeight: "800",
      marginBottom: "1.5rem",
      textAlign: "center",
      background: "linear-gradient(45deg, #FFD700, #FFA500)",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
    subHeader: {
      fontSize: "1.8rem",
      marginTop: "2rem",
      marginBottom: "1rem",
      color: "#87CEFA",
      fontWeight: "600",
      borderLeft: "4px solid #87CEFA",
      paddingLeft: "1rem",
    },
    paragraph: {
      fontSize: "1.1rem",
      lineHeight: "1.7",
      marginBottom: "1.2rem",
      color: "#e0e0e0",
    },
    list: {
      marginLeft: "1.5rem",
      marginBottom: "1.5rem",
    },
    listItem: {
      marginBottom: "0.8rem",
      position: "relative",
      paddingLeft: "1.5rem",
    },
    listItemBullet: {
      position: "absolute",
      left: "0",
      color: "#FFD700",
    },
    card: {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(10px)",
    },
    tabContainer: {
      display: "flex",
      gap: "1rem",
      marginBottom: "2rem",
      flexWrap: "wrap",
    },
    tab: {
      padding: "0.8rem 1.5rem",
      borderRadius: "50px",
      cursor: "pointer",
      fontWeight: "600",
      transition: "all 0.3s ease",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
    },
    activeTab: {
      background: "linear-gradient(45deg, #87CEFA, #1E90FF)",
      color: "#0f2027",
      boxShadow: "0 4px 15px rgba(135, 206, 250, 0.3)",
    },
    algorithmSelector: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "1rem",
      marginBottom: "2rem",
    },
    algorithmCard: {
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "12px",
      padding: "1.2rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
      border: "2px solid transparent",
    },
    selectedAlgorithm: {
      border: "2px solid #87CEFA",
      boxShadow: "0 0 15px rgba(135, 206, 250, 0.4)",
      transform: "translateY(-5px)",
    },
    algorithmIcon: {
      fontSize: "2rem",
      marginBottom: "0.8rem",
      color: "#FFD700",
    },
    iframe: {
      width: "100%",
      height: "600px",
      border: "none",
      borderRadius: "12px",
      marginTop: "1.5rem",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },
    codeSnippet: {
      background: "#1e1e1e",
      borderRadius: "8px",
      padding: "1rem",
      overflowX: "auto",
      margin: "1.5rem 0",
      fontFamily: "'Fira Code', monospace",
      fontSize: "0.9rem",
    },
    visualExample: {
      display: "flex",
      justifyContent: "center",
      margin: "2rem 0",
    },
    exampleImage: {
      maxWidth: "100%",
      borderRadius: "12px",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    },
    resourceLink: {
      color: "#87CEFA",
      textDecoration: "none",
      fontWeight: "600",
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      transition: "all 0.3s ease",
    },
  };

  const algorithms = [
    {
      id: "linear-regression",
      name: "Linear Regression",
      icon: "📈",
      description:
        "Models the relationship between a dependent variable and one or more independent variables using a linear approach.",
    },
    {
      id: "logistic-regression",
      name: "Logistic Regression",
      icon: "📊",
      description:
        "Used for binary classification problems, estimating probabilities using a logistic function.",
    },
    {
      id: "decision-trees",
      name: "Decision Trees",
      icon: "🌳",
      description:
        "A tree-like model of decisions and their possible consequences, used for classification and regression.",
    },
    {
      id: "random-forests",
      name: "Random Forests",
      icon: "🌲",
      description:
        "An ensemble learning method that operates by constructing multiple decision trees.",
    },
    {
      id: "svm",
      name: "Support Vector Machines",
      icon: "⚡",
      description:
        "Finds the optimal hyperplane that separates classes in the feature space.",
    },
    {
      id: "neural-networks",
      name: "Neural Networks",
      icon: "🧠",
      description:
        "Interconnected layers of algorithms that process information by responding to external inputs.",
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <div style={styles.card}>
              <h2 style={styles.subHeader}>🔎 What is Supervised Learning?</h2>
              <p style={styles.paragraph}>
                Supervised learning is a type of machine learning where the
                model is trained on a labeled dataset. The goal is to learn the
                mapping from inputs to outputs to make predictions on unseen
                data.
              </p>
              <div style={styles.visualExample}>
                <img
                  src="https://miro.medium.com/v2/resize:fit:1400/1*E2w8r_7v0kf9kqoPOpWlLw.png"
                  alt="Supervised Learning Process"
                  style={{ ...styles.exampleImage, maxWidth: "80%" }}
                />
              </div>
            </div>
            <div style={styles.card}>
              <h2 style={styles.subHeader}>✨ Key Characteristics</h2>
              <ul style={styles.list}>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  Requires labeled data (input-output pairs)
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  Used for regression (continuous) & classification
                  (categorical)
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  Evaluated using metrics like accuracy, precision, recall
                </li>
                <li style={styles.listItem}>
                  <span style={styles.listItemBullet}>•</span>
                  Requires validation to avoid overfitting
                </li>
              </ul>
            </div>
          </div>
        );

      case "algorithms":
        return (
          <div>
            <div style={styles.card}>
              <h2 style={styles.subHeader}>🛠️ Select an Algorithm</h2>
              <div style={styles.algorithmSelector}>
                {algorithms.map((algo) => (
                  <div
                    key={algo.id}
                    style={{
                      ...styles.algorithmCard,
                      ...(selectedAlgorithm === algo.id
                        ? styles.selectedAlgorithm
                        : {}),
                    }}
                    onClick={() => setSelectedAlgorithm(algo.id)}
                  >
                    <div style={styles.algorithmIcon}>{algo.icon}</div>
                    <h3 style={{ margin: "0.5rem 0", color: "#FFF" }}>
                      {algo.name}
                    </h3>
                    <p
                      style={{
                        ...styles.paragraph,
                        fontSize: "0.9rem",
                        margin: 0,
                      }}
                    >
                      {algo.description}
                    </p>
                  </div>
                ))}
              </div>

              <div style={styles.card}>
                <h2 style={styles.subHeader}>Algorithm Details</h2>
                {selectedAlgorithm === "linear-regression" && (
                  <div>
                    <p style={styles.paragraph}>
                      Linear regression models the relationship between a
                      dependent variable and one or more independent variables.
                    </p>
                    <div style={styles.codeSnippet}>
                      {`# Python code example
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LinearRegression()
model.fit(X_train, y_train)
predictions = model.predict(X_test)`}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "applications":
        return (
          <div style={styles.card}>
            <h2 style={styles.subHeader}>💡 Real-World Applications</h2>
            <p style={styles.paragraph}>
              Applications include spam detection, house price prediction, fraud
              detection, medical diagnosis, and stock forecasting.
            </p>
          </div>
        );

      case "resources":
        return (
          <div style={styles.card}>
            <h2 style={styles.subHeader}>📚 Learning Resources</h2>
            <ul style={styles.list}>
              <li style={styles.listItem}>
                <a
                  href="https://www.coursera.org/learn/machine-learning"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Machine Learning by Andrew Ng
                </a>
              </li>
              <li style={styles.listItem}>
                <a
                  href="https://www.kaggle.com/datasets"
                  style={styles.resourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ↗ Kaggle Datasets
                </a>
              </li>
            </ul>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>📘 Supervised Learning</h1>

      <div style={styles.tabContainer}>
        {[
          { id: "overview", label: "Overview", icon: "🔍" },
          { id: "algorithms", label: "Algorithms", icon: "🛠️" },
          { id: "applications", label: "Applications", icon: "💡" },
          { id: "resources", label: "Resources", icon: "📚" },
          { id: "workbench", label: "ML Workbench", icon: "🧪" },
        ].map((tab) => (
          <div
            key={tab.id}
            style={{
              ...styles.tab,
              ...(activeTab === tab.id ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </div>
        ))}
      </div>

      {activeTab !== "workbench" && renderTabContent()}

      {activeTab === "workbench" && (
        <div style={styles.card}>
          <h2 style={styles.subHeader}>🧪 ML Workbench</h2>
          <p style={styles.paragraph}>
            Upload a dataset and experiment with supervised learning models
            interactively.
          </p>
          <iframe
            src="http://localhost:8505"
            title="Supervised Learning Streamlit App"
            style={styles.iframe}
          />
        </div>
      )}

      <style>
        {`
          a:hover {
            color: #FFD700 !important;
            text-decoration: underline !important;
          }
        `}
      </style>
    </div>
  );
}
