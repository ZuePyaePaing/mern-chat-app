import { Server } from "socket.io";
import express from "express";
import { createServer } from "http";

const app = express();

const server = createServer(app);

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

export default io;
