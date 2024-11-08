import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import {fileURLToPath}from 'url'
import isLogin from "./middlewares/isLogin.js";
import errorMiddleware from "./middlewares/errorMilddleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", isLogin, (req, res, next) => {
  res.status(200).json({ message: "Hello from users route" });
});

//error middleware
app.use(errorMiddleware);

// database connection
connectDB();
//server listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
