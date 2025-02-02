import Message from "../models/messageSchema.js";
import { createError } from "../utils/error.js";

export const sendMessage = async (req, res, next) => {
  try {
    const { content, mediaType, mediaUrl } = req.body;
    const { receiverId } = req.params;
    const senderId = req.userId;
    const receiver = await User.findOne({ _id: receiverId });
    if (!receiver) {
      return next(createError(404, "Receiver not found"));
    }
    const message = await Message.create({
      senderId,
      receiverId,
      content,
      mediaType,
      mediaUrl,
    });
    res.status(201).json({ message: "Message sent successfully", message });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const userId = req.userId;
    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId },
        { senderId: receiverId, receiverId: userId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json({ messages });
  } catch (error) {
    next(error);
  }
};
