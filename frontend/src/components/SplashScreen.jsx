import React, { useEffect, useState } from "react";

const quotes = [
  {
    text: "Arise, awake, and stop not till the goal is reached.",
    author: "Swami Vivekananda",
  },
  {
    text: "Take up one idea. Make that one idea your life.",
    author: "Swami Vivekananda",
  },
  {
    text: "Education is the manifestation of the perfection already in man.",
    author: "Swami Vivekananda",
  },
  {
    text: "You cannot believe in God until you believe in yourself.",
    author: "Swami Vivekananda",
  },
];

export default function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);
  const [quote] = useState(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  });

  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Typewriter animation
  useEffect(() => {
    if (charIndex < quote.text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText((prev) => prev + quote.text.charAt(charIndex));
        setCharIndex((prev) => prev + 1);
      }, 40); // Typing speed (ms)
      return () => clearTimeout(typingTimer);
    }
  }, [charIndex, quote.text]);

  // Fade out and exit after full text
  useEffect(() => {
    if (charIndex === quote.text.length) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 1000); // Pause before fade
      const exitTimer = setTimeout(() => {
        if (onFinish) onFinish();
      }, 1800); // Total splash duration
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(exitTimer);
      };
    }
  }, [charIndex, quote.text.length, onFinish]);

  return (
    <div
      style={{
        ...styles.container,
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.8s ease-in-out",
      }}
    >
      <h1 style={styles.logo}>
        Grad<span style={{ color: "#61dafb" }}>AI</span>
      </h1>
      <p style={styles.tagline}>Empowering Final Year Minds</p>

      <p style={styles.quote}>
        “{displayedText}”
        {charIndex === quote.text.length && (
          <span style={styles.author}>
            <br />— {quote.author}
          </span>
        )}
      </p>
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: "#000",
    color: "#fff",
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "sans-serif",
    padding: "1rem",
    textAlign: "center",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
  },
  logo: {
    fontSize: "3.5rem",
    letterSpacing: "2px",
    marginBottom: "0.5rem",
  },
  tagline: {
    fontSize: "1.3rem",
    color: "#ccc",
  },
  quote: {
    fontSize: "1.1rem",
    color: "#aaa",
    fontStyle: "italic",
    marginTop: "2rem",
    maxWidth: "80%",
    minHeight: "3rem",
  },
  author: {
    fontSize: "0.95rem",
    color: "#888",
    marginTop: "0.5rem",
    display: "block",
  },
};
