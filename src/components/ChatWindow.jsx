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
          Start a conversation by typing a message below.
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