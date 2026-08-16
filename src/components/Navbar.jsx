import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import InputBox from "./InputBox";
import headerlogo from "../assets/headerlogo.png";
import headerlogoDark from "../assets/headerlogo-dark.png";
import { sendChatMessage } from "../services/api";

const AI_MODES = {
  friendly: {
    icon: "😊",
    name: "Friendly",
    description: "Warm, natural and conversational",
    welcome: "Hey! How can I help you today?",
    subtitle: "Ask me anything and let's figure it out together.",
  },

  developer: {
    icon: "👨‍💻",
    name: "Developer",
    description: "Technical answers, code & debugging",
    welcome: "Let's build something!",
    subtitle: "I’ll help you with code, debugging and practical solutions.",
  },

  teacher: {
    icon: "🎓",
    name: "Teacher",
    description: "Simple explanations with examples",
    welcome: "Ready to learn?",
    subtitle: "I’ll explain concepts step-by-step with simple examples.",
  },

  interviewer: {
    icon: "🎤",
    name: "Interviewer",
    description: "Interview questions & feedback",
    welcome: "Interview mode is on.",
    subtitle: "I’ll ask questions and give you interview-focused feedback.",
  },

  creative: {
    icon: "✨",
    name: "Creative",
    description: "Ideas, brainstorming & creativity",
    welcome: "Let's create something amazing!",
    subtitle: "I’ll help you brainstorm ideas and think creatively.",
  },
};

function Navbar({
  chats,
  setChats,
  currentChatId,
  setCurrentChatId,
  setSidebarOpen,
  darkMode,
}) {
  const [loading, setLoading] = useState(false);

  const [aiMode, setAiMode] = useState("friendly");

  const currentChat =
    chats.find((chat) => chat.id === currentChatId) || null;

  const messages = currentChat ? currentChat.messages : [];

  const currentMode = AI_MODES[aiMode];

  const handleModeChange = (e) => {
    setAiMode(e.target.value);
  };

  const sendMessage = async (text) => {
    setLoading(true);

    let chatId = currentChatId;

    if (!chatId) {
      chatId = Date.now();

      const newChat = {
        id: chatId,
        title: text,
        messages: [],
      };

      setChats((prev) => [newChat, ...prev]);
      setCurrentChatId(chatId);
    }

    const userMessage = {
      role: "user",
      content: text,
    };

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: chat.title === "New Chat" ? text : chat.title,
              messages: [...chat.messages, userMessage],
            }
          : chat
      )
    );

    try {
      // IMPORTANT:
      // Selected AI mode backend ko send ho raha hai
      const res = await sendChatMessage(text, aiMode);

      const botMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, botMessage],
              }
            : chat
        )
      );
    } catch (err) {
      console.error(err);

      const errorMessage = {
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="chat-main">

      {/* TOPBAR */}
      <div className="chat-topbar">

        <div className="topbar-left">

          {/* Mobile Sidebar Button */}
          <button
            className="mobile-menu-btn"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            ☰
          </button>

          {/* Logo */}
          <img
            src={darkMode ? headerlogoDark : headerlogo}
            alt="AI Chatbot"
            className="header-logo"
          />

          {/* AI MODE SELECTOR */}
          <div className="ai-mode-selector">

            <span className="mode-current-icon">
              {currentMode.icon}
            </span>

            <select
              value={aiMode}
              onChange={handleModeChange}
              aria-label="Select AI personality"
            >
              {Object.entries(AI_MODES).map(([key, mode]) => (
                <option key={key} value={key}>
                  {mode.icon} {mode.name}
                </option>
              ))}
            </select>

          </div>

        </div>

      </div>

      {/* ACTIVE MODE INFO */}
      <div className="active-mode-bar">

        <div className="active-mode-icon">
          {currentMode.icon}
        </div>

        <div className="active-mode-content">

          <div className="active-mode-title">
            {currentMode.name} Mode
            <span className="active-badge">
              ● Active
            </span>
          </div>

          <div className="active-mode-description">
            {currentMode.description}
          </div>

        </div>

      </div>

      {/* CHAT AREA */}
      {messages.length === 0 ? (
        <div className="chat-body welcome-mode">

          <div className="welcome-content">

            <div className="welcome-icon">
              {currentMode.icon}
            </div>

            <h1>{currentMode.welcome}</h1>

            <p>{currentMode.subtitle}</p>

            <div className="mode-tip">
              <span>{currentMode.icon}</span>
              <span>
                You're chatting with <strong>{currentMode.name}</strong> AI
              </span>
            </div>

          </div>

        </div>
      ) : (
        <ChatWindow messages={messages} />
      )}

      {/* INPUT */}
      <InputBox
        onSend={sendMessage}
        loading={loading}
      />

    </main>
  );
}

export default Navbar;