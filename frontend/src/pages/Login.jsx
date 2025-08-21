import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const hardcodedUser = {
    email: "user@example.com",
    password: "password123",
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === hardcodedUser.email && password === hardcodedUser.password) {
      setError("");
      navigate("/landing");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="login-form">
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
          <button type="submit">Login</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>

      <style>{`
        .login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background: #000;
          color: #fff;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-box {
          background: #111;
          padding: 2rem;
          border-radius: 16px;
          box-shadow: 0 0 20px #ff88cc, 0 0 40px #ff88cc50;
          border: 2px solid #ff88cc;
          width: 320px;
          text-align: center;
        }

        .login-box h2 {
          margin-bottom: 1.5rem;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-form input {
          padding: 0.7rem;
          border-radius: 8px;
          border: none;
          outline: none;
          background: #222;
          color: #fff;
        }

        .login-form input::placeholder {
          color: #aaa;
        }

        .login-form button {
          padding: 0.7rem;
          border-radius: 8px;
          border: none;
          background: #ff88cc;
          color: #000;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .login-form button:hover {
          background: #ffaadf;
          box-shadow: 0 0 10px #ffaadf;
        }

        .error {
          color: #ff5555;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
