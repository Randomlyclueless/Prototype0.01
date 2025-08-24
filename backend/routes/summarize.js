const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Simple fallback summarizer for testing
function generateFallbackSummary(text) {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const wordCount = text.split(" ").length;

  let summary = `📄 Text Summary:\n`;
  summary += `• Contains ${wordCount} words across ${sentences.length} sentences\n`;
  summary += `• Key topic appears to be: ${extractKeyTopic(text)}\n`;
  summary += `• First key point: ${sentences[0]
    ?.trim()
    .substring(0, 100)}...\n`;

  if (sentences.length > 1) {
    summary += `• Last key point: ${sentences[sentences.length - 1]
      ?.trim()
      .substring(0, 100)}...`;
  }

  return summary;
}

function extractKeyTopic(text) {
  const commonWords = [
    "the",
    "a",
    "an",
    "and",
    "or",
    "but",
    "in",
    "on",
    "at",
    "to",
    "for",
    "of",
    "with",
    "by",
    "is",
    "are",
    "was",
    "were",
    "be",
    "been",
    "being",
    "have",
    "has",
    "had",
    "do",
    "does",
    "did",
    "will",
    "would",
    "could",
    "should",
    "may",
    "might",
    "must",
    "can",
    "this",
    "that",
    "these",
    "those",
  ];

  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter((word) => word.length > 4 && !commonWords.includes(word));

  const wordCount = {};
  words.forEach((word) => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });

  const topWord = Object.keys(wordCount).reduce(
    (a, b) => (wordCount[a] > wordCount[b] ? a : b),
    Object.keys(wordCount)[0]
  );

  return topWord || "general content";
}

// POST /api/summarize
router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        message: "Text is required for summarization",
      });
    }

    console.log("📝 Summarization request received");
    console.log("Text length:", text.length);

    // Try OpenAI first
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Most accessible model
        messages: [
          {
            role: "system",
            content:
              "You are a helpful assistant that summarizes text concisely with key bullet points.",
          },
          {
            role: "user",
            content: `Summarize this text in 3-4 key bullet points:\n\n${text}`,
          },
        ],
        max_tokens: 200,
        temperature: 0.7,
      });

      const summary = response.choices[0].message.content;
      console.log("✅ OpenAI summarization successful");

      res.json({
        summary,
        source: "OpenAI",
        model: "gpt-3.5-turbo",
      });
    } catch (openaiError) {
      console.log("❌ OpenAI failed:", openaiError.message);

      // Use fallback summary
      const fallbackSummary = generateFallbackSummary(text);
      console.log("✅ Using fallback summarization");

      res.json({
        summary: fallbackSummary,
        source: "Fallback",
        note: "OpenAI unavailable - using basic text analysis",
        openaiError: openaiError.message,
      });
    }
  } catch (error) {
    console.error("❌ General Error:", error);
    res.status(500).json({
      message: "Error generating summary",
      error: error.message,
    });
  }
});

module.exports = router;
