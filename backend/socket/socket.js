import { Server } from "socket.io";
import Message from "../models/messageSchema.js";

const socketSetup = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("userOnline", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", async ({ senderId, receiverId, content }, callback) => {
      try {
        const newMessage = new Message({
          senderId,
          receiverId,
          content,
          status: "sent", // Default status
        });

        const savedMessage = await newMessage.save();

        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit("receiveMessage", savedMessage);

          // Automatically mark message as "delivered"
          await Message.findByIdAndUpdate(savedMessage._id, { status: "delivered" });
          savedMessage.status = "delivered";
          io.to(receiverSocketId).emit("messageStatusUpdate", savedMessage);
        }

        callback(savedMessage);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("markAsRead", async ({ messageIds, receiverId }) => {
      try {
        await Message.updateMany({ _id: { $in: messageIds } }, { status: "read" });

        // Notify sender that messages were read
        const senderSocketId = onlineUsers.get(receiverId);
        if (senderSocketId) {
          io.to(senderSocketId).emit("messageStatusUpdate", { messageIds, status: "read" });
        }
      } catch (error) {
        console.error("Error marking messages as read:", error);
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};

export default socketSetup;
