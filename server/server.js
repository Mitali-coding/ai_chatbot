import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();

// =========================
// CORS
// =========================
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// =========================
// Health Check
// =========================
app.get("/", (req, res) => {
  res.send("AI Chatbot Backend is running successfully 🚀");
});

// =========================
// Chat API
// =========================
app.post("/api/chat", async (req, res) => {
  try {
    const { message, mode = "friendly" } = req.body;

    console.log("🔥 User:", message);
    console.log("🤖 AI Mode:", mode);

    // AI personality instructions
    const modeInstructions = {
      friendly: `
You are a friendly AI assistant.
Be warm, natural, conversational and helpful.
Keep the explanation easy to understand.
`,

      developer: `
You are an expert software developer.
Give technical, accurate and practical answers.
Use code examples when they are useful.
Explain programming concepts clearly.
`,

      teacher: `
You are a patient teacher.
Explain concepts in simple beginner-friendly language.
Use examples and step-by-step explanations.
Avoid unnecessary technical complexity.
`,

      interviewer: `
You are a professional technical interviewer.
Ask relevant interview-style questions.
Keep answers concise and professional.
When appropriate, evaluate the user's answer and provide feedback.
`,
    };

    // If an unknown mode comes from frontend,
    // use friendly mode.
    const systemInstruction =
      modeInstructions[mode] || modeInstructions.friendly;

    // =========================
    // OpenRouter API
    // =========================
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "nvidia/nemotron-3-super-120b-a12b:free",

        messages: [
          {
            role: "system",
            content: systemInstruction,
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",

          "HTTP-Referer":
            "https://aichatbot-production-3d6a.up.railway.app",

          "X-Title": "AI Chatbot",
        },
      }
    );

    console.log("✅ AI Response received");

    // =========================
    // Send response to frontend
    // =========================
    res.json({
      reply: response.data.choices[0].message.content,
    });
  } catch (err) {
    console.log("========== ERROR ==========");
    console.log("Status:", err.response?.status);
    console.log("Data:", err.response?.data);
    console.log("Message:", err.message);
    console.log("===========================");

    res.status(500).json({
      reply:
        err.response?.data?.error?.message ||
        "Something went wrong with the AI response.",
    });
  }
});

// =========================
// Server
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});