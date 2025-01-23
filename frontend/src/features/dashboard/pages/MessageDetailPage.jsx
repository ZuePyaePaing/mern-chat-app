"use client";

import { useState } from "react";
import { Send, Paperclip, Smile } from "lucide-react";
import useUserIdStore from "../../../stores/user";

const messages = [
  {
    id: 1,
    sender: "other",
    content: "Hey, how are you?",
    timestamp: "10:00 AM",
  },
  {
    id: 2,
    sender: "user",
    content: "I'm doing well, thanks! How about you?",
    timestamp: "10:05 AM",
  },
  {
    id: 3,
    sender: "other",
    content: "Great! I wanted to ask about the project.",
    timestamp: "10:10 AM",
  },
  {
    id: 4,
    sender: "user",
    content: "Sure, what would you like to know?",
    timestamp: "10:12 AM",
  },
  {
    id: 4,
    sender: "user",
    content: "Sure, what would you like to know?",
    timestamp: "10:12 AM",
  },

  {
    id: 4,
    sender: "user",
    content: "Sure, what would you like to know?",
    timestamp: "10:12 AM",
  },

  {
    id: 5,
    sender: "other",
    content: "When do you think we can have the first draft ready?",
    timestamp: "10:15 AM",
  },
];

export default function MessageDetail() {
  const { selectedUserId } = useUserIdStore();
  console.log(selectedUserId, "selectedUserId par");
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  if (!selectedUserId) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <img
            src="/placeholder.svg?height=48&width=48"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">Alice Johnson</h2>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto  scrollbar p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender === "user" ? "bg-blue-600" : "bg-gray-700"
                }`}
              >
                <p>{message.content}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-700"
      >
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
          >
            <Paperclip size={20} />
          </button>
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-grow bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="text-gray-400 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-2"
          >
            <Smile size={20} />
          </button>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
