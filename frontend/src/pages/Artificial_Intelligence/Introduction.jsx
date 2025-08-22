import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Brain,
  Zap,
  Globe,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

import Mirror from "./Mirror.jpg";
import AlanTuring from "./AlanTuring.webp";
import Evolution from "./Evolution.webp";
import DeepLearning from "./DeepLearning.webp"; // Assuming you have a DeepLearning image

const AIIntroduction = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [vantaLoaded, setVantaLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  const SLIDE_DURATION = 6000; // ms
  const PROGRESS_INTERVAL = 100; // ms
  const TRANSITION_DURATION = 400; // ms

  const slides = useMemo(
    () => [
      {
        title: "Welcome to the Future",
        subtitle: "Artificial Intelligence",
        content:
          "Embark on a journey through the fascinating world of AI - where machines think, learn, and reshape our reality.",
        icon: <Sparkles className="w-12 h-12" />,
        color: 0x8b5cf6,
      },
      {
        title: "What is AI?",
        subtitle: "The Digital Mind",
        content:
          "Artificial Intelligence is the simulation of human intelligence in machines. These systems can learn, reason, and make decisions to solve problems—mimicking human cognitive functions.",
        icon: <Brain className="w-12 h-12" />,
        color: 0x06b6d4,
        image: Mirror, // 👈 put Mirror.jpg in public folder
        imageSize: { width: "500px", height: "500px", objectFit: "contain" },
        imageSourceLink: {
          href: "https://blogs.timesofisrael.com/the-mirror-effect-how-using-generative-ai-tools-reflects-on-your-personality/",
          label: "Source: The Mirror Effect – Times of Israel",
        },
        examples: [
          "Voice assistants like Siri or Alexa understanding your commands",
          "Self-driving cars navigating traffic using sensors and AI",
          "Netflix or YouTube recommending shows based on your viewing history",
          "Banks using AI to detect fraudulent transactions in real-time",
          "Chatbots providing instant customer support on websites",
        ],
      },
      {
        title: "The Dawn of AI",
        subtitle: "1950s - The Beginning",
        image: AlanTuring, // 👈 put AlanTuring.png in public folder
        imageSize: { width: "500px", height: "800px" },
        imageSourceLink: {
          href: "https://aitoolsexplorer.com/ai-history/alan-turing-and-the-birth-of-modern-computing/",
          label: "Source: AI Tools Explorer – Alan Turing & Modern Computing",
        },
        content:
          "Alan Turing asks 'Can machines think?' and proposes the famous Turing Test. The field of AI is born at Dartmouth College in 1956.",
        examples: [
          "Alan Turing proposed the idea that a machine could simulate any human reasoning process",
          "The Turing Machine (1936) introduced the mathematical model of computation",
          "World War II: Turing’s work on breaking the Enigma code demonstrated applied machine logic",
          "In 1950, Turing introduced the 'Imitation Game' — later called the Turing Test",
          "His vision planted the seed for thinking about intelligence as a process, not just biology",
          "To read more about the Turing Machine, visit: https://en.wikipedia.org/wiki/Turing_machine",
        ],

        icon: <Clock className="w-12 h-12" />,
        color: 0xf59e0b,
      },
      {
        title: "The Learning Revolution",
        subtitle: "1980s-2000s",
        image: Evolution, // 👈 put Evolution.png in public folder
        imageSize: { width: "800px", height: "800px" },
        imageSourceLink: {
          href: "https://medium.com/@patryktomkowski/the-long-road-to-today-an-expanded-history-of-the-ai-revolution-547c3888646f",
          label: "Source: Medium – The Long Road to Today",
        },
        content:
          "Machine Learning emerges! Computers begin to learn from data, recognize patterns, and make predictions without explicit programming.",
        icon: <Zap className="w-12 h-12" />,
        color: 0xef4444,
      },
      {
        title: "The Deep Learning Boom",
        subtitle: "2010s – Present",
        content:
          "Deep learning is a branch of AI that teaches computers to learn by themselves using many layers of 'artificial neurons.' It’s like giving the computer a brain that can spot patterns in huge amounts of data — much like how humans learn from experience.",
        icon: <Brain className="w-12 h-12" />,
        color: 0x10b981,
        image: DeepLearning, // 👈 your deep learning image
        imageSize: { width: "700px", height: "700px", objectFit: "contain" },
        imageSourceLink: {
          href: "https://www.skiplevel.co/blog/ai-machine-deep-learning",
          label: "Source: Skiplevel – AI, Machine Learning & Deep Learning",
        },
        examples: [
          "AI is the broad idea of making machines smart; Deep Learning is one powerful way to achieve it.",
          "Instead of being programmed step-by-step, a deep learning model figures out rules by itself from data.",
          "It can recognize faces, translate languages, or predict what you might type next — all by learning from examples.",
          "Deep learning is why we have voice assistants, self-driving cars, and image-generating AI tools today.",
          "In simple words: AI is the goal, machine learning is the path, and deep learning is the engine pushing it forward.",
        ],
      },

      {
        title: "AI Reshaping Our World",
        subtitle: "Today and Tomorrow",
        content:
          "From smartphones that understand speech to cars that drive themselves, AI is transforming healthcare, education, entertainment, and every aspect of life.",
        icon: <Globe className="w-12 h-12" />,
        color: 0x8b5cf6,
        examples: [
          {
            logo: "/logos/google.png",
            text: "Google → AI in Search, Translate, Photos, and Google Assistant",
          },
          {
            logo: "/logos/apple.png",
            text: "Apple → Siri, Face ID, and on-device intelligence",
          },
          {
            logo: "/logos/tesla.png",
            text: "Tesla → Self-driving features powered by computer vision",
          },
          {
            logo: "/logos/microsoft.png",
            text: "Microsoft → AI in Office (Copilot), Azure AI cloud services",
          },
          {
            logo: "/logos/amazon.png",
            text: "Amazon → Alexa, product recommendations, and warehouse robotics",
          },
        ],
      },
    ],
    []
  );

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

  useEffect(() => {
    const loadScript = (src, id) =>
      new Promise((resolve, reject) => {
        if (document.getElementById(id)) return resolve();
        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      });

    const createVanta = () => {
      if (!vantaRef.current || !window.VANTA || !window.VANTA.NET) return;

      if (vantaEffect.current?.destroy) {
        try {
          vantaEffect.current.destroy();
        } catch {
          /* no-op */
        }
        vantaEffect.current = null;
      }

      vantaEffect.current = window.VANTA.NET({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x2a2f3a,
        backgroundColor: 0x000000,
        showDots: true,
        spacing: 22.0,
        maxDistance: 28.0,
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
        console.error("Failed to load Vanta/Three:", e);
        setVantaLoaded(false);
      }
    };

    init();

    return () => {
      if (vantaEffect.current?.destroy) {
        try {
          vantaEffect.current.destroy();
        } catch {
          /* no-op */
        }
        vantaEffect.current = null;
      }
      ["three-js", "vanta-net-js"].forEach((id) => {
        const s = document.getElementById(id);
        if (s) document.head.removeChild(s);
      });
    };
  }, []);

  // Auto-progress
  useEffect(() => {
    if (isHovered) return undefined;
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
  }, [isHovered, nextSlide]);

  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentSlideData = slides[currentSlide];
  const currentColorHex = `#${(currentSlideData.color ?? 0x8b5cf6)
    .toString(16)
    .padStart(6, "0")}`;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "black",
        margin: 0,
        padding: 0,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>
        {`
          @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>

      {/* Vanta canvas */}
      <div
        ref={vantaRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      {!vantaLoaded && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "black",
            color: "white",
            fontSize: "1.25rem",
          }}
        >
          Loading Neural Network...
        </div>
      )}

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: "1.5rem",
          color: "white",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            transition: `all ${TRANSITION_DURATION}ms`,
            transform: isAnimating ? "translateY(2.5rem)" : "translateY(0)",
            opacity: isAnimating ? 0 : 1,
            display: "flex",
            flexDirection: currentSlideData.image ? "row" : "column",
            alignItems: "center",
            gap: currentSlideData.image ? "2rem" : "0",
            textAlign: currentSlideData.image ? "left" : "center",
          }}
        >
          {/* Left image (if any) */}
          {currentSlideData.image && (
            <div style={{ marginRight: "1rem" }}>
              <img
                src={currentSlideData.image}
                alt="AI illustration"
                style={{
                  width: currentSlideData.imageSize?.width || "100px",
                  height: currentSlideData.imageSize?.height || "100px",
                  objectFit: currentSlideData.imageSize?.objectFit || "contain",
                }}
              />
              {currentSlideData.imageSourceLink && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#9ca3af",
                    marginTop: "0.25rem",
                  }}
                >
                  <a
                    href={currentSlideData.imageSourceLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#9ca3af", textDecoration: "underline" }}
                  >
                    {currentSlideData.imageSourceLink.label}
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Right text */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: currentSlideData.image
                  ? "flex-start"
                  : "center",
                marginBottom: "1.5rem",
                color: currentColorHex,
                filter: `drop-shadow(0 0 8px ${currentColorHex}66)`,
              }}
            >
              <div
                style={{
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                }}
              >
                {currentSlideData.icon}
              </div>
            </div>
            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 4.5rem)",
                fontWeight: "bold",
                marginBottom: "0.75rem",
                lineHeight: "1.2",
                background: "linear-gradient(to right, white, #f3f4f6, white)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {currentSlideData.title}
            </h1>
            <h2
              style={{
                fontSize: "clamp(1.25rem, 3vw, 1.875rem)",
                fontWeight: "300",
                marginBottom: "1.5rem",
                color: currentColorHex,
                textShadow: `0 0 12px ${currentColorHex}55`,
              }}
            >
              {currentSlideData.subtitle}
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "#e5e7eb",
                maxWidth: "48rem",
                margin: currentSlideData.image ? "0" : "0 auto",
              }}
            >
              {currentSlideData.content}
            </p>
            {/* Examples List */}
            {currentSlideData.examples && (
              <ul
                style={{
                  marginTop: "1.5rem",
                  textAlign: "left",
                  color: "#e5e7eb",
                }}
              >
                {currentSlideData.examples.map((example, idx) => {
                  // normalize: if it's a string, wrap it
                  const item =
                    typeof example === "string" ? { text: example } : example;

                  const isLink = item.text.includes("http");

                  return (
                    <li
                      key={idx}
                      style={{
                        marginBottom: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      {item.logo && (
                        <img
                          src={item.logo}
                          alt="logo"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "contain",
                          }}
                        />
                      )}

                      {isLink ? (
                        <a
                          href={item.text.match(/https?:\/\/\S+/)[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "#38bdf8",
                            textDecoration: "underline",
                            fontSize: "1.2rem",
                          }}
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span style={{ fontSize: "1.2rem" }}>{item.text}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: "7rem",
            width: "16rem",
            height: "0.25rem",
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "9999px",
            overflow: "hidden",
          }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Slide progress"
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              backgroundColor: currentColorHex,
              transition: `all ${PROGRESS_INTERVAL}ms linear`,
            }}
          />
        </div>

        {/* Slide dots */}
        <div
          style={{
            position: "absolute",
            bottom: "5rem",
            display: "flex",
            gap: "0.75rem",
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "50%",
                backgroundColor:
                  index === currentSlide
                    ? currentColorHex
                    : "rgba(255, 255, 255, 0.5)",
                boxShadow:
                  index === currentSlide
                    ? `0 0 8px ${currentColorHex}`
                    : "none",
                transform: index === currentSlide ? "scale(1.2)" : "scale(1)",
                transition: "all 0.2s",
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <button
          onClick={prevSlide}
          disabled={isAnimating}
          aria-label="Previous slide"
          style={{
            position: "absolute",
            left: "1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "1rem",
            borderRadius: "50%",
            backdropFilter: "blur(4px)",
            opacity: isAnimating ? 0.5 : 1,
            cursor: isAnimating ? "not-allowed" : "pointer",
          }}
        >
          <ChevronLeft style={{ width: "1.5rem", height: "1.5rem" }} />
        </button>

        <button
          onClick={nextSlide}
          disabled={isAnimating}
          aria-label="Next slide"
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "1rem",
            borderRadius: "50%",
            backdropFilter: "blur(4px)",
            opacity: isAnimating ? 0.5 : 1,
            cursor: isAnimating ? "not-allowed" : "pointer",
          }}
        >
          <ChevronRight style={{ width: "1.5rem", height: "1.5rem" }} />
        </button>

        {/* Slide counter */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            right: "1.5rem",
            fontSize: "0.875rem",
            color: "#9ca3af",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            padding: "0.25rem 0.75rem",
            borderRadius: "9999px",
            backdropFilter: "blur(4px)",
          }}
        >
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Tinted gradient overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.15,
              background: `linear-gradient(45deg, ${currentColorHex}00, ${currentColorHex}40, ${currentColorHex}00)`,
              backgroundSize: "200% 200%",
              animation: "gradient-shift 8s ease infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AIIntroduction;
