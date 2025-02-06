import { io } from "socket.io-client";
import { create } from "zustand";

export const socket = io("http://localhost:5000", { autoConnect: false });

const useMessageStore = create((set, get) => ({
  messages: [],
  userId: null,

  sendMessage: (receiverId, content) => {
    const senderId = get().userId;
    if (!senderId) return console.error("User ID is missing");

    const tempMessage = {
      senderId,
      receiverId,
      content,
      status: "sending",
      tempId: Date.now(),
    };

    set((state) => ({ messages: [...state.messages, tempMessage] }));

    socket.emit("sendMessage", { senderId, receiverId, content }, (realMessage) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          msg.tempId === tempMessage.tempId ? realMessage : msg
        ),
      }));
    });
  },

  fetchMessages: async (receiverId) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("my_token="))
        ?.split("=")[1];

      if (!token) return console.error("Authentication token missing");

      const response = await fetch(
        `http://localhost:5000/api/v1/get-messages/${receiverId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch messages");

      const { messages } = await response.json();

      set({ messages });

      // Notify backend that these messages are read
      const unreadMessages = messages.filter((msg) => msg.status !== "read").map((msg) => msg._id);
      if (unreadMessages.length > 0) {
        socket.emit("markAsRead", { messageIds: unreadMessages, receiverId });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  },

  initializeSocket: (userId) => {
    if (!userId) return console.error("User ID is required for socket");

    set({ userId });

    if (!socket.connected) {
      socket.connect();
      socket.emit("userOnline", userId);
    }

    socket.off("receiveMessage").on("receiveMessage", (message) => {
      set((state) => ({ messages: [...state.messages, message] }));
    });

    socket.off("messageStatusUpdate").on("messageStatusUpdate", ({ messageIds, status }) => {
      set((state) => ({
        messages: state.messages.map((msg) =>
          messageIds.includes(msg._id) ? { ...msg, status } : msg
        ),
      }));
    });
  },

  disconnectSocket: () => {
    socket.disconnect();
    set({ userId: null });
  },
}));

export default useMessageStore;
