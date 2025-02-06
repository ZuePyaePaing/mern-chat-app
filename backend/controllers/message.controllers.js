import Message from "../models/messageSchema.js";
import User from "../models/userSchema.js";
import { createError } from "../utils/error.js";

// export const sendMessage = async (req, res, next) => {
//   try {
//     const { content, mediaType, mediaUrl } = req.body;
//     const { receiverId } = req.params;
//     const senderId = req.userId; // Get sender from auth middleware

//     // Ensure receiver exists
//     const receiver = await User.findById(receiverId);
//     if (!receiver) {
//       return next(createError(404, "Receiver not found"));
//     }

//     // Create message in the database
//     const message = await Message.create({
//       senderId,
//       receiverId,
//       content,
//       mediaType,
//       mediaUrl,
//     });

//     // Emit message via Socket.io
//     req.io.to(receiverId).emit("receiveMessage", message);

//     res.status(201).json({ message });
//   } catch (error) {
//     next(error);
//   }
// };

export const getMessages = async (req, res, next) => {
  try {
    const { receiverId } = req.params;
    const userId = req.userId;

    // Get all messages between two users
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
