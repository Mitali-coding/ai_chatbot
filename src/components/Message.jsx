import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Message({ role, content }) {

  const copyText = () => {
    navigator.clipboard.writeText(content);
    // Future me toast notification lagayenge
    alert("Copied!");
  };

  return (
    <div className={role === "user" ? "user-message" : "bot-message"}>

      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>

      {role === "assistant" && (
        <button
          className="copy-btn"
          onClick={copyText}
        >
          📋 Copy
        </button>
      )}

    </div>
  );
}

export default Message;