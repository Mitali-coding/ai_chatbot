import React from "react";
import logo from "../assets/logo.png";
import logoDark from "../assets/logo-dark.png";
// import { recentChats } from "./utils";

function Sidebar({
  chats,
  setChats,
  currentChatId,
  setCurrentChatId,
  darkMode,
  setDarkMode,
  isOpen,
  setIsOpen,
}) {
  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
  };

  const deleteChat = (id) => {
    const updatedChats = chats.filter((chat) => chat.id !== id);

    setChats(updatedChats);

    if (currentChatId === id) {
      if (updatedChats.length > 0) {
        setCurrentChatId(updatedChats[0].id);
      } else {
        setCurrentChatId(null);
      }
    }
  };
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <img
              src={darkMode ? logoDark : logo}
              alt="AI Chatbot"
              className="sidebar-logo"
            />
            {/* <div className="brand-icon">
              🤖
            </div>

            <span className="brand-name">AI Chatbot</span> */}
          </div>

          <button className="icon-btn" onClick={() => setIsOpen(false)}>
            ←
          </button>
        </div>

        <div className="new-chat-wrap">
          <button className="new-chat-btn" onClick={createNewChat}>
            <span
              style={{
                fontSize: "1.1rem",
                lineHeight: "1",
              }}
            >
              +
            </span>{" "}
            New Chat
          </button>
        </div>

        <div className="recent-label">Recent Chats</div>

        {/* Chat List */}
        <div className="chat-list">
          {chats.map((chat) => (
            <div
              className="chat-item"
              key={chat.id}
              onClick={() => setCurrentChatId(chat.id)}
            >
              <span>💬 {chat.title}</span>

              <button
                className="delete-chat-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <div className="avatar-circle">👤</div>

          <div className="skeleton-lines">
            <div className="skel-line long"></div>
            <div className="skel-line short"></div>
          </div>

          <button
            className={`theme-toggle ${darkMode ? "active" : ""}`}
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            <span className="toggle-icon">{darkMode ? "☀" : "☾"}</span>
          </button>
        </div>
      </aside>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="sidebarBackdrop show"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
