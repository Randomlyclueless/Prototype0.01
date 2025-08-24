import React, { useState } from "react";
import SelectionToolbar from "../../components/SelectionToolbar";
import NotesSidebar from "../NotesSidebar";

const KnowledgeRepresentationNotes = () => {
  const [summary, setSummary] = useState("");

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginRight: "340px",
          lineHeight: "1.6",
          fontSize: "16px",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          Knowledge Representation
        </h1>

        {/* Always visible toolbar */}
        <SelectionToolbar onSummaryGenerated={setSummary} />

        {/* Display summary if available */}
        {summary && (
          <div
            style={{
              background: "#e8f5e8",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px",
              border: "1px solid #4caf50",
            }}
          >
            <h4 style={{ margin: "0 0 10px 0", color: "#2e7d32" }}>
              🤖 AI Summary:
            </h4>
            <div style={{ color: "#1b5e20" }}>{summary}</div>
            <button
              onClick={() => setSummary("")}
              style={{
                marginTop: "10px",
                padding: "5px 10px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px",
              }}
            >
              Clear Summary
            </button>
          </div>
        )}

        {/* Instructions */}
        <div
          style={{
            background: "#e3f2fd",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px",
            fontSize: "14px",
            color: "#1976d2",
          }}
        >
          📝 <strong>How to use:</strong> Select any text below, then click the
          buttons above to highlight, underline, or summarize!
        </div>

        {/* Content */}
        <div style={{ userSelect: "text" }}>
          <h2>What is Knowledge Representation?</h2>
          <p>
            Semantic networks are a way to represent knowledge as a graph of
            nodes and relationships. Each node represents a concept, and
            relationships represent connections between them. This approach
            allows for intuitive representation of hierarchical and associative
            relationships in knowledge.
          </p>

          <p>
            Frames are data structures that hold information about a concept,
            including its properties, attributes, and possible actions. They
            provide a structured way to organize knowledge about stereotypical
            situations and support default reasoning mechanisms.
          </p>

          <p>
            Ontologies define formal relationships between concepts in a domain,
            allowing machines to reason about the knowledge. They provide shared
            vocabularies and enable interoperability between different AI
            systems by establishing common understanding of domain concepts.
          </p>

          <h2>Types of Knowledge Representation</h2>
          <p>
            <strong>Declarative Knowledge:</strong> Facts and information that
            can be stated, such as "Paris is the capital of France" or "Water
            boils at 100°C." This type of knowledge is typically represented
            using logical statements or database records.
          </p>

          <p>
            <strong>Procedural Knowledge:</strong> Information about how to
            perform tasks or procedures, like algorithms for solving problems or
            step-by-step instructions. This knowledge is often encoded in the
            form of rules, scripts, or program code.
          </p>

          <h2>Logic-Based Representation</h2>
          <p>
            Logic provides a mathematical framework for representing knowledge.
            Propositional logic deals with simple true/false statements, while
            predicate logic allows for more complex representations involving
            objects, properties, and relationships between them.
          </p>

          <p>
            Production rules, also known as if-then rules, are widely used in
            expert systems. They represent knowledge in the form of
            condition-action pairs, making it easy for domain experts to
            contribute their knowledge to AI systems.
          </p>

          <div
            style={{
              background: "#fff3cd",
              padding: "15px",
              borderRadius: "8px",
              marginTop: "20px",
              border: "1px solid #ffeaa7",
            }}
          >
            <h3 style={{ marginTop: 0, color: "#856404" }}>💡 Try This:</h3>
            <p style={{ margin: 0, color: "#856404" }}>
              Select any paragraph above and try the different tools: highlight
              in different colors, add underlines, or get an AI summary!
            </p>
          </div>
        </div>
      </div>

      {/* Notes Sidebar */}
      <NotesSidebar />
    </div>
  );
};

export default KnowledgeRepresentationNotes;
