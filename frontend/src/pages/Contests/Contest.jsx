import React, { useState } from "react";
import contestCategories from "../../data/contestCategories";

export default function Contest() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Helper functions for enhanced features
  const getCategoryIcon = (categoryName) => {
    if (
      categoryName.includes("Data Science") ||
      categoryName.includes("Machine Learning")
    )
      return "🤖";
    if (categoryName.includes("Programming") || categoryName.includes("DSA"))
      return "💻";
    if (categoryName.includes("NLP") || categoryName.includes("Language"))
      return "🗣️";
    if (categoryName.includes("SQL") || categoryName.includes("Database"))
      return "🗃️";
    if (categoryName.includes("Research") || categoryName.includes("AI/ML"))
      return "🧠";
    if (categoryName.includes("Company")) return "🏢";
    if (categoryName.includes("Specialized")) return "⚡";
    return "🎯";
  };

  const getDifficultyBadge = (contestName) => {
    const beginner = [
      "Analytics Vidhya",
      "HackerRank",
      "GeeksforGeeks",
      "Mode Analytics",
      "DataLemur",
    ];
    const intermediate = [
      "Codeforces",
      "CodeChef",
      "DrivenData",
      "MachineHack",
      "LeetCode",
      "StrataScratch",
    ];
    const advanced = [
      "Kaggle",
      "AIcrowd",
      "TopCoder",
      "AtCoder",
      "Bitgrit",
      "Tianchi",
    ];
    const research = [
      "NeurIPS",
      "ICML",
      "ICLR",
      "CVPR",
      "ICCV",
      "ECCV",
      "SemEval",
      "CoNLL",
      "CLEF",
      "TREC",
      "WMT",
    ];

    if (beginner.some((platform) => contestName.includes(platform)))
      return { level: "Beginner", color: "#28a745" };
    if (intermediate.some((platform) => contestName.includes(platform)))
      return { level: "Intermediate", color: "#ffc107" };
    if (advanced.some((platform) => contestName.includes(platform)))
      return { level: "Advanced", color: "#dc3545" };
    if (research.some((platform) => contestName.includes(platform)))
      return { level: "Research", color: "#6f42c1" };
    return { level: "All Levels", color: "#17a2b8" };
  };

  const getPrizeIcon = (contestName) => {
    const high = [
      "Kaggle",
      "KDD Cup",
      "NeurIPS",
      "ICML",
      "Google",
      "Microsoft",
      "IBM",
    ];
    const medium = ["DrivenData", "CodeChef", "Zindi", "AIcrowd", "Bitgrit"];
    const low = [
      "Analytics Vidhya",
      "MachineHack",
      "HackerRank",
      "HackerEarth",
    ];

    if (high.some((platform) => contestName.includes(platform))) return "💰";
    if (medium.some((platform) => contestName.includes(platform))) return "🏆";
    if (low.some((platform) => contestName.includes(platform))) return "🎁";
    return "📈";
  };

  // Filtered contests logic
  const filteredCategories = contestCategories
    .map((categoryObj) => ({
      ...categoryObj,
      contests: categoryObj.contests.filter(
        (contest) =>
          contest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contest.description.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter(
      (categoryObj) =>
        selectedCategory === "All" || categoryObj.category === selectedCategory
    );

  // Enhanced Styles
  const containerStyle = {
    minHeight: "100vh",
    background: "linear-gradient(145deg, #e6e6fa, #f9f0f2)",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  };

  const heroStyle = {
    // 🎨 HERO BACKGROUND COLOR - Change this line to modify the hero section background
    background:
      "linear-gradient(135deg, #060005ff 0%, #4e0146ff 50%, #ad31a9ff 100%)", // Current: Dark blue-gray
    color: "white",
    padding: "80px 20px 60px",
    textAlign: "center",
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  };

  const heroTitleStyle = {
    fontSize: "3rem",
    fontWeight: "800",
    margin: "0 0 20px 0",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "15px",
    flexWrap: "wrap",
  };

  const heroSubtitleStyle = {
    fontSize: "1.2rem",
    marginBottom: "40px",
    opacity: "0.95",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.6",
  };

  const statsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "20px",
    maxWidth: "500px",
    margin: "0 auto",
  };

  const statCardStyle = {
    background: "rgba(255, 255, 255, 0.15)",
    borderRadius: "15px",
    padding: "20px 15px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    transition: "transform 0.3s ease",
  };

  const controlsStyle = {
    padding: "40px 20px",
    background: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(10px)",
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
  };

  const controlsWrapperStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "flex",
    gap: "20px",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  };

  const inputStyle = {
    flex: "1",
    maxWidth: "350px",
    padding: "15px 20px",
    border: "2px solid #e0e0e0",
    borderRadius: "25px",
    fontSize: "1rem",
    background: "white",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const selectStyle = {
    padding: "15px 20px",
    border: "2px solid #e0e0e0",
    borderRadius: "25px",
    fontSize: "1rem",
    background: "white",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    minWidth: "200px",
  };

  const mainContentStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "40px 20px 80px",
  };

  const categoryHeaderStyle = {
    background: "white",
    padding: "25px 30px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    border: "1px solid rgba(0,0,0,0.05)",
    transition: "all 0.3s ease",
  };

  const categoryIconStyle = {
    fontSize: "2.5rem",
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #8e44ad, #b388eb)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 15px rgba(142, 68, 173, 0.3)",
  };

  const categoryTitleStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0 0 5px 0",
  };

  const categoryCountStyle = {
    color: "#7f8c8d",
    fontSize: "0.95rem",
    fontWeight: "500",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "25px",
    marginBottom: "50px",
  };

  const cardStyle = {
    background: "white",
    padding: "30px",
    borderRadius: "15px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0,0,0,0.05)",
    position: "relative",
    overflow: "hidden",
  };

  const cardHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px",
    gap: "15px",
  };

  const contestNameStyle = {
    fontSize: "1.3rem",
    fontWeight: "700",
    color: "#2c3e50",
    margin: "0",
    flex: "1",
  };

  const badgeContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "flex-end",
  };

  const badgeStyle = (color) => ({
    padding: "4px 10px",
    borderRadius: "15px",
    fontSize: "0.75rem",
    fontWeight: "600",
    color: "white",
    backgroundColor: color,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  });

  const prizeIconStyle = {
    fontSize: "1.2rem",
    padding: "6px",
    borderRadius: "50%",
    background: "#f8f9fa",
    border: "2px solid #e9ecef",
    width: "35px",
    height: "35px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const descriptionStyle = {
    color: "#5a6c7d",
    lineHeight: "1.6",
    marginBottom: "20px",
    fontSize: "0.95rem",
  };

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 24px",
    background: "linear-gradient(135deg, #8e44ad, #b388eb)",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "600",
    fontSize: "0.95rem",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(142, 68, 173, 0.3)",
    border: "none",
    cursor: "pointer",
  };

  const noResultsStyle = {
    textAlign: "center",
    padding: "80px 20px",
    color: "#7f8c8d",
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <div style={heroStyle}>
        <div style={heroTitleStyle}>
          <span style={{ fontSize: "3.5rem" }}>🚀</span>
          Coding & AI Competitions
        </div>
        <p style={heroSubtitleStyle}>
          Discover world-class programming, data science, and AI challenges to
          level up your skills
        </p>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                marginBottom: "5px",
                color: "#ffeaa7",
              }}
            >
              {contestCategories.reduce(
                (total, cat) => total + cat.contests.length,
                0
              )}
              +
            </div>
            <div
              style={{ fontSize: "0.9rem", fontWeight: "500", opacity: "0.9" }}
            >
              Platforms
            </div>
          </div>
          <div style={statCardStyle}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                marginBottom: "5px",
                color: "#ffeaa7",
              }}
            >
              {contestCategories.length}
            </div>
            <div
              style={{ fontSize: "0.9rem", fontWeight: "500", opacity: "0.9" }}
            >
              Categories
            </div>
          </div>
          <div style={statCardStyle}>
            <div
              style={{
                fontSize: "2rem",
                fontWeight: "800",
                marginBottom: "5px",
                color: "#ffeaa7",
              }}
            >
              ∞
            </div>
            <div
              style={{ fontSize: "0.9rem", fontWeight: "500", opacity: "0.9" }}
            >
              Opportunities
            </div>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div style={controlsStyle}>
        <div style={controlsWrapperStyle}>
          <input
            type="text"
            placeholder="Search contests and platforms..."
            style={inputStyle}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = "#8e44ad";
              e.target.style.boxShadow = "0 4px 15px rgba(142, 68, 173, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e0e0e0";
              e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          />
          <select
            style={selectStyle}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            onFocus={(e) => {
              e.target.style.borderColor = "#8e44ad";
              e.target.style.boxShadow = "0 4px 15px rgba(142, 68, 173, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#e0e0e0";
              e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
            }}
          >
            <option value="All">All Categories</option>
            {contestCategories.map((cat, idx) => (
              <option key={idx} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Main Content */}
      <div style={mainContentStyle}>
        {filteredCategories.length === 0 ? (
          <div style={noResultsStyle}>
            <div style={{ fontSize: "4rem", marginBottom: "20px" }}>🔍</div>
            <h3
              style={{
                fontSize: "1.8rem",
                marginBottom: "10px",
                color: "#2c3e50",
              }}
            >
              No contests found
            </h3>
            <p style={{ fontSize: "1.1rem" }}>
              Try adjusting your search terms or category filter
            </p>
          </div>
        ) : (
          filteredCategories.map((section, index) =>
            section.contests.length > 0 ? (
              <div key={index}>
                {/* Category Header */}
                <div
                  style={categoryHeaderStyle}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.boxShadow =
                      "0 12px 35px rgba(0,0,0,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 25px rgba(0,0,0,0.1)";
                  }}
                >
                  <div style={categoryIconStyle}>
                    {getCategoryIcon(section.category)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h2 style={categoryTitleStyle}>{section.category}</h2>
                    <div style={categoryCountStyle}>
                      {section.contests.length} platforms available
                    </div>
                  </div>
                </div>

                {/* Contest Cards */}
                <div style={gridStyle}>
                  {section.contests.map((contest, i) => {
                    const difficulty = getDifficultyBadge(contest.name);
                    const prizeIcon = getPrizeIcon(contest.name);

                    return (
                      <div
                        key={i}
                        style={cardStyle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-8px)";
                          e.currentTarget.style.boxShadow =
                            "0 15px 40px rgba(0,0,0,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow =
                            "0 8px 25px rgba(0,0,0,0.1)";
                        }}
                      >
                        <div style={cardHeaderStyle}>
                          <h3 style={contestNameStyle}>{contest.name}</h3>
                          <div style={badgeContainerStyle}>
                            <span style={badgeStyle(difficulty.color)}>
                              {difficulty.level}
                            </span>
                            <div style={prizeIconStyle}>{prizeIcon}</div>
                          </div>
                        </div>

                        <p style={descriptionStyle}>{contest.description}</p>

                        <a
                          href={contest.link}
                          style={buttonStyle}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              "translateY(-2px)";
                            e.currentTarget.style.boxShadow =
                              "0 8px 25px rgba(142, 68, 173, 0.4)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow =
                              "0 4px 15px rgba(142, 68, 173, 0.3)";
                          }}
                        >
                          <span>Explore Platform</span>
                          <span>→</span>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : null
          )
        )}
      </div>
      Footer CTA
      <div
        style={{
          background: "linear-gradient(135deg, #2c3e50, #34495e)",
          color: "white",
          padding: "60px 20px",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        {/* <h3
          style={{
            fontSize: "2.2rem",
            marginBottom: "15px",
            fontWeight: "700",
          }}
        ></h3> */}
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "30px",
            opacity: "0.9",
            maxWidth: "600px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Join thousands of developers and data scientists improving their
          skills through competitions
        </p>
      </div>
    </div>
  );
}
