import { format, parseISO } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useMessageStore from "../../../stores/messsage";
import reactUseCookie from "react-use-cookie";
import { Send } from "lucide-react";
import useUserIdStore from "../../../stores/user";
const statusIcons = {
  sending: "⏳",
  sent: "✅",
  delivered: "📩",
  read: "👀",
};

export default function MessageDetail() {
  const { userId: receiverId } = useParams();
  const [user] = reactUseCookie("my_user");
  const parsedUser = user ? JSON.parse(user) : null;
  const senderId = parsedUser?._id;
  const { fetchUser, selectedUser } = useUserIdStore();
  const { messages, sendMessage, fetchMessages, initializeSocket } =
    useMessageStore();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
 
  console.log(selectedUser, 'selected user ui')
  useEffect(() => {
    if (receiverId) {
      fetchUser(receiverId);
    }
    if (senderId && receiverId) {
      fetchMessages(receiverId);
      initializeSocket(senderId);
    }
  }, [senderId, receiverId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    sendMessage(receiverId, newMessage);
    setNewMessage("");
  };

  const formatMessageTime = (timestamp) => {
    if (!timestamp) return "";
    return format(parseISO(timestamp), "hh:mm a");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-700 flex items-center space-x-4">
        <h2 className="text-xl font-bold">{selectedUser.name}</h2>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <div
            key={message._id || message.tempId}
            className={`flex ${
              message.senderId === senderId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 bg-gray-800 text-white rounded-lg flex gap-2`}
            >
              <p>{message.content}</p>
              <div className="text-xs text-gray-400 flex justify-end items-end">
                <span>{formatMessageTime(message.createdAt)}</span>
                {message.senderId === senderId && (
                  <span className="ml-2">{statusIcons[message.status]}</span>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-700 flex"
      >
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow px-4 py-2 rounded-full bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="p-2 rounded-full bg-blue-600 text-white"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
