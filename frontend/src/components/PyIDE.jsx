import React, { useState, useEffect } from "react";

const PyIDE = ({
  initialCode = `# Example Python code
import numpy as np
print("Hello from Pyodide!")
print(np.array([1, 2, 3]))`,
}) => {
  const [pyodide, setPyodide] = useState(null);
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("Loading Python environment...");

  // Load Pyodide on mount
  useEffect(() => {
    const loadPyodideAsync = async () => {
      try {
        const py = await window.loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.23.4/full/",
        });
        setPyodide(py);
        setOutput("Python environment ready. You can run code now!");
      } catch (err) {
        setOutput("Failed to load Python environment: " + err);
      }
    };
    loadPyodideAsync();
  }, []);

  // Run Python code and capture stdout
  const runCode = async () => {
    if (!pyodide) {
      setOutput("Python environment is still loading...");
      return;
    }

    try {
      // Redirect Python stdout to capture print statements
      pyodide.runPython(`
import sys
class StdoutCatcher:
    def __init__(self):
        self.text = ""
    def write(self, s):
        self.text += s
    def flush(self):
        pass

sys.stdout = StdoutCatcher()
sys.stderr = sys.stdout
`);

      await pyodide.runPythonAsync(code);

      // Get captured output
      const captured = pyodide.runPython("sys.stdout.text");
      setOutput(captured || "Code executed successfully.");
    } catch (err) {
      setOutput(err.toString());
    }
  };

  // Reset code to initial value
  const resetCode = () => {
    setCode(initialCode);
    setOutput("Python environment ready. You can run code now!");
  };

  return (
    <div
      style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "10px" }}
    >
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={12}
        cols={70}
        style={{ width: "100%", fontFamily: "monospace", fontSize: "14px" }}
      />
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button
          onClick={runCode}
          style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          Run Python
        </button>
        <button
          onClick={resetCode}
          style={{ padding: "6px 12px", cursor: "pointer" }}
        >
          Reset Code
        </button>
      </div>
      <pre
        style={{
          background: "#f4f4f4",
          padding: "10px",
          marginTop: "10px",
          minHeight: "50px",
          whiteSpace: "pre-wrap",
        }}
      >
        {output}
      </pre>
    </div>
  );
};

export default PyIDE;
