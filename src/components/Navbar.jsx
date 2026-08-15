import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import InputBox from "./InputBox";
import headerlogo from "../assets/headerlogo.png";
import { sendChatMessage } from "../services/api";

function Navbar({
  chats,
  setChats,
  currentChatId,
  setCurrentChatId,
  setSidebarOpen,
}) {
  const [loading, setLoading] = useState(false);

  // Current chat nikal lo
  const currentChat = chats.find((chat) => chat.id === currentChatId) || null;

  const messages = currentChat ? currentChat.messages : [];

  const sendMessage = async (text) => {
    setLoading(true);

    let chatId = currentChatId;

    // Agar koi chat select nahi hai to nayi chat banao
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

    // User message save + title update
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              title: chat.title === "New Chat" ? text : chat.title,
              messages: [...chat.messages, userMessage],
            }
          : chat,
      ),
    );
    try {
      const res = await sendChatMessage(text);

      const botMessage = {
        role: "assistant",
        content: res.data.reply,
      };

      // Bot message save
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, botMessage],
              }
            : chat,
        ),
      );
    } catch (err) {
      const errorMessage = {
        role: "assistant",
        content: "Server Error",
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === chatId
            ? {
                ...chat,
                messages: [...chat.messages, errorMessage],
              }
            : chat,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="chat-main">
      <div className="chat-topbar">
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          ☰
        </button>

        <img src={headerlogo} alt="" style={{ height: "40px" }} />
      </div>

      <ChatWindow messages={messages} />

      <InputBox onSend={sendMessage} loading={loading} />
    </main>
  );
}

export default Navbar;
