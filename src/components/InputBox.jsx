import React, { useState } from "react";

function InputBox({ onSend, loading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || loading) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="chat-input-bar">
      <div className="input-pill">
        <button className="attach-btn" type="button">
          +
        </button>

        <input
          type="text"
          placeholder="Message AI..."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />

        <button
          className="send-btn"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="Send message"
        >
          {loading ? "..." : "➤"}
        </button>
      </div>

    
    </div>
  );
}

export default InputBox;