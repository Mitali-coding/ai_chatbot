import React, { useEffect, useRef } from "react";
import Message from "./Message";

function ChatWindow({ messages }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="chat-body">
      {messages.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✦</div>

          <h1>How can I help you?</h1>

          <p>
            Ask anything, explore ideas, or get help with your next project.
          </p>

          <div className="suggestion-grid">
            <div className="suggestion-card">
              <span>💡</span>
              <div>
                <strong>Explain something</strong>
                <small>Make complex topics simple</small>
              </div>
            </div>

            <div className="suggestion-card">
              <span>💻</span>
              <div>
                <strong>Write code</strong>
                <small>Build and debug your project</small>
              </div>
            </div>

            <div className="suggestion-card">
              <span>✨</span>
              <div>
                <strong>Generate ideas</strong>
                <small>Brainstorm something creative</small>
              </div>
            </div>

            <div className="suggestion-card">
              <span>📚</span>
              <div>
                <strong>Learn something</strong>
                <small>Get clear explanations</small>
              </div>
            </div>
          </div>
        </div>
      ) : (
        messages.map((msg, index) => (
          <Message
            key={index}
            role={msg.role}
            content={msg.content}
          />
        ))
      )}

      <div ref={bottomRef}></div>
    </div>
  );
}

export default ChatWindow;