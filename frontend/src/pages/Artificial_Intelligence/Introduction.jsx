import React, { useEffect } from "react";
import Spline from "@splinetool/react-spline";
import mirrorImg from "./Mirror.jpg";

export default function Introduction() {
  useEffect(() => {
    const interval = setInterval(() => {
      const canvas = document.querySelector("canvas");
      if (canvas) {
        canvas.style.width = "800px";
        canvas.style.height = "600px";
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start px-4 py-12 text-white">
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0); }
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 10px 4px rgba(255, 165, 0, 0.4), 0 0 20px 8px rgba(255, 87, 34, 0.3);
          }
          50% {
            box-shadow: 0 0 15px 6px rgba(255, 165, 0, 0.6), 0 0 30px 12px rgba(255, 87, 34, 0.4);
          }
          100% {
            box-shadow: 0 0 10px 4px rgba(255, 165, 0, 0.4), 0 0 20px 8px rgba(255, 87, 34, 0.3);
          }
        }

        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }

        @keyframes blink {
          50% { border-color: transparent }
        }

        .gradient-text {
          background: linear-gradient(90deg, #ff8c00, #ff5733);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .typing-text {
          overflow: hidden;
          border-right: 2px solid orange;
          white-space: nowrap;
          animation:
            typing 8s steps(100, end),
            blink 0.75s step-end infinite;
        }
      `}</style>

      {/* Spline + Heading */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-[300px] h-[300px] overflow-hidden mb-6">
          <Spline scene="https://prod.spline.design/TSNbs1oxyBCAxJwL/scene.splinecode" />
        </div>
        <h1 className="text-5xl font-bold text-center mb-4">
          The Journey of AI
        </h1>
      </div>

      {/* Image + Text side by side */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 my-10 max-w-6xl w-full px-4">
        {/* Left: Image */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            width: "500px",
            height: "500px",
            animation:
              "float 3s ease-in-out infinite, pulse 4s ease-in-out infinite",
          }}
        >
          <img
            src={mirrorImg}
            alt="AI Mirror"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Right: Heading + Typing Text */}
        <div className="flex-1 text-left text-gray-300">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Birth of AI</h2>
          <p
            className="text-lg leading-relaxed typing-text"
            style={{ maxWidth: "100%" }}
          >
            Artificial Intelligence (AI) is the science of making machines think
            and act like humans. It enables computers to learn from experience,
            recognize patterns, understand language, and make decisions — all
            without being explicitly programmed for every task.
          </p>
        </div>
      </div>
    </div>
  );
}
