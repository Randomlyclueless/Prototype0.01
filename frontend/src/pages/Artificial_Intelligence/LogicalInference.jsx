import React from "react";
import PyIDE from "../../components/PyIDE"; // Correct path

const LogicalInference = () => {
  const initialCode = `# Logical Inference Example
P = True
Q = None

if P:
    Q = True

print("P:", P)
print("Q:", Q)
`;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>Logical Inference Playground</h1>
      <p>Write and run Python code to experiment with logical inference.</p>
      <PyIDE initialCode={initialCode} />
    </div>
  );
};

export default LogicalInference;
