import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    alert(`Signup Successful for ${email}`);
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleSignup}>Sign Up</button>
        </form>
      </div>

      <style>{`
        .signup-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #000;
          color: #fff;
          font-family: 'Segoe UI', sans-serif;
        }

        .signup-box {
          background: #111;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 0 20px #ff88cc, 0 0 40px #ff88cc50;
          border: 2px solid #ff88cc;
          width: 320px;
          text-align: center;
        }

        .signup-box h2 {
          margin-bottom: 1.5rem;
        }

        .signup-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .signup-form input {
          padding: 0.7rem;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #222;
          color: #fff;
        }

        .signup-form input::placeholder {
          color: #aaa;
        }

        .signup-form button {
          padding: 0.7rem;
          border-radius: 8px;
          border: none;
          background: #ff88cc;
          color: #000;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .signup-form button:hover {
          background: #ffaadf;
          box-shadow: 0 0 10px #ffaadf;
        }
      `}</style>
    </div>
  );
}
