import { Schema, model } from "mongoose";

const messageSchema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String },
    mediaType: {
      type: String,
      enum: ["text", "image", "video", "audio"],
      default: "text",
    },
    mediaUrl: { type: String },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

export default model("Message", messageSchema);
