import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { Brain, Cpu, Network, Zap, Clock } from "lucide-react";
import "./ML_Introduction.css";

const ML_Introduction = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const SLIDE_DURATION = 5000;
  const PROGRESS_INTERVAL = 100;
  const TRANSITION_DURATION = 400;

  const slides = useMemo(
    () => [
      {
        title: "Welcome to Machine Learning",
        subtitle: "Understanding the Basics",
        content:
          "Machine Learning enables computers to learn from data and improve performance without explicit programming.",
        icon: <Brain className="slide-icon" />,
        examples: [
          "Spam email detection",
          "Recommendation systems (Netflix, YouTube)",
          "Voice assistants like Siri or Alexa",
        ],
      },
      {
        title: "History of Machine Learning",
        subtitle: "Origins and Growth",
        content:
          "Machine Learning started in the 1950s with AI research. Key milestones include neural networks, decision trees, and statistical learning.",
        icon: <Clock className="slide-icon" />,
        examples: [
          "1950s: AI concept by Alan Turing",
          "1980s: Neural Networks gained popularity",
          "1990s-2000s: Support Vector Machines and ensemble methods",
          "2010s: Deep Learning revolutionizes ML",
        ],
      },
      {
        title: "Types of Machine Learning",
        subtitle: "Supervised, Unsupervised, Reinforcement",
        content:
          "ML is categorized by learning approach and feedback provided to the model.",
        icon: <Cpu className="slide-icon" />,
        examples: [
          "Supervised: Predicting house prices",
          "Unsupervised: Grouping customers by behavior",
          "Reinforcement: Training agents to play games",
        ],
      },
      {
        title: "Key Applications",
        subtitle: "Where ML is Used Today",
        content:
          "Machine Learning powers applications in finance, healthcare, transportation, and more.",
        icon: <Network className="slide-icon" />,
        examples: [
          "Fraud detection in banking",
          "Predictive maintenance in manufacturing",
          "Medical image analysis",
          "Self-driving cars and autonomous systems",
        ],
      },
      {
        title: "ML in Action",
        subtitle: "Practical Examples",
        content:
          "ML algorithms analyze patterns in data and provide predictions, classifications, or decisions automatically.",
        icon: <Zap className="slide-icon" />,
        examples: [
          "Recommendation engines (Netflix, Amazon)",
          "Chatbots providing customer support",
          "Language translation and speech recognition",
        ],
      },
    ],
    []
  );

  // Slide navigation
  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [isAnimating, slides.length]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setIsAnimating(false);
    }, TRANSITION_DURATION);
  }, [isAnimating, slides.length]);

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating || index === currentSlide) return;
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsAnimating(false);
      }, TRANSITION_DURATION);
    },
    [isAnimating, currentSlide]
  );

  // Auto-progress
  useEffect(() => {
    let elapsed = 0;
    const interval = setInterval(() => {
      elapsed += PROGRESS_INTERVAL;
      const pct = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      setProgress(pct);
      if (elapsed >= SLIDE_DURATION) {
        nextSlide();
        elapsed = 0;
      }
    }, PROGRESS_INTERVAL);
    return () => clearInterval(interval);
  }, [nextSlide]);

  useEffect(() => setProgress(0), [currentSlide]);

  // Vanta.js setup
  useEffect(() => {
    const loadScript = (src, id) =>
      new Promise((resolve, reject) => {
        if (document.getElementById(id)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

    const createVanta = () => {
      if (!vantaRef.current || !window.VANTA || !window.VANTA.NET) return;
      if (vantaEffect.current?.destroy) vantaEffect.current.destroy();

      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3b82f6,
        backgroundColor: 0x111827,
        showDots: true,
        spacing: 25.0,
        maxDistance: 30.0,
        points: 20.0,
      });
      setVantaLoaded(true);
    };

    const init = async () => {
      try {
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js",
          "three-js"
        );
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.net.min.js",
          "vanta-net-js"
        );
        setTimeout(createVanta, 80);
      } catch (e) {
        console.error("Vanta failed to load:", e);
        setVantaLoaded(false);
      }
    };
    init();

    return () => {
      if (vantaEffect.current?.destroy) vantaEffect.current.destroy();
      ["three-js", "vanta-net-js"].forEach((id) => {
        const s = document.getElementById(id);
        if (s) document.head.removeChild(s);
      });
    };
  }, []);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="ml-intro-wrapper">
      <div ref={vantaRef} className="ml-vanta-bg" />
      {!vantaLoaded && (
        <div className="ml-loading">Loading Neural Network...</div>
      )}

      <div className="ml-slide-content">
        <div className="ml-slide-header">
          {currentSlideData.icon}
          <div>
            <h1>{currentSlideData.title}</h1>
            <h2>{currentSlideData.subtitle}</h2>
          </div>
        </div>
        <p>{currentSlideData.content}</p>
        {currentSlideData.examples && (
          <ul>
            {currentSlideData.examples.map((ex, idx) => (
              <li key={idx}>{ex}</li>
            ))}
          </ul>
        )}

        <div className="ml-controls">
          <button onClick={prevSlide}>&lt; Prev</button>
          <div className="ml-progress-bar">
            <div style={{ width: `${progress}%` }} />
          </div>
          <button onClick={nextSlide}>Next &gt;</button>
        </div>

        <div className="ml-slide-dots">
          {slides.map((_, idx) => (
            <span
              key={idx}
              className={`ml-dot ${idx === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ML_Introduction;
