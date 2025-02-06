import express from "express";
import { getMessages } from "../controllers/message.controllers.js";
import isLogin from "../middlewares/isLogin.js";

const router = express.Router();

router.get("/get-messages/:receiverId", isLogin, getMessages);
// router.post("/send-message/:receiverId", isLogin, sendMessage);

export default router;
