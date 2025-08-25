import React, { useState } from "react";

const IDE = ({ language = "python", initialCode = "# Start coding here" }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");

  const runCode = () => {
    if (language === "javascript") {
      try {
        // eslint-disable-next-line no-eval
        const result = eval(code);
        setOutput(result?.toString() || "Code executed successfully!");
      } catch (err) {
        setOutput(err.message);
      }
    } else {
      setOutput("Python execution requires a backend or Pyodide.");
    }
  };

  return (
    <div>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={10}
        cols={50}
      />
      <br />
      <button onClick={runCode}>Run Code</button>
      <pre>{output}</pre>
    </div>
  );
};

export default IDE;
