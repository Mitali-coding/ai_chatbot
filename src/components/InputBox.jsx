import React, { useState } from "react";

function InputBox({ onSend, loading }) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    onSend(input);
    setInput("");
  };

  return (
    <div className="chat-input-bar">
      <div className="input-pill">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <button className="send-btn" onClick={handleSend} disabled={loading}>
          {loading ? "..." : "➤"}
        </button>
      </div>
    </div>
  );
}

export default InputBox;
