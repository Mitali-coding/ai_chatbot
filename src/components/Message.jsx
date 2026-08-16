import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, content }) {
  const [copied, setCopied] = useState(false);

  const copyText = async () => {
    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.log("Copy failed:", error);
    }
  };

  return (
    <div className={`message-row ${role}`}>
      {role === "assistant" && (
        <div className="message-avatar">
          ✦
        </div>
      )}

      <div className={role === "user" ? "user-message" : "bot-message"}>
        <div className="message-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>

        {role === "assistant" && (
          <button className="copy-btn" onClick={copyText}>
            {copied ? "✓ Copied" : "📋 Copy"}
          </button>
        )}
      </div>
    </div>
  );
}

export default Message;