import { Server } from "socket.io";

const socketSetup = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  const onlineUsers = new Map(); // Stores userId -> socketId mappings
  
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("userOnline", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("userOffline", (userId) => {
      onlineUsers.delete(userId);
      io.emit("updateOnlineUsers", Array.from(onlineUsers.keys()));
    });
    socket.on("message", (data) => {
      console.log("Received message:", data);

      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketSetup;
