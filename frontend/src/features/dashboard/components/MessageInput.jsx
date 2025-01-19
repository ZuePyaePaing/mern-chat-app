import React, { useState } from "react";
import Picker from "emoji-picker-react";

const MessageInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle emoji click
  const handleEmojiClick = (event, emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  // Handle form submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: "10px" }}
        />
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          style={{ padding: "10px" }}
        >
          😊
        </button>
        <button type="submit" style={{ padding: "10px" }}>
          Send
        </button>
      </form>
      {showEmojiPicker && (
        <div style={{ position: "absolute", bottom: "0px", right: "0px", zIndex: 1000 }}>
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
};

export default MessageInput;
