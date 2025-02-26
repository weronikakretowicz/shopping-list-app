import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
  senderId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  receiverId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  isRead: { type: Boolean, default: false },
  listId: { type: mongoose.Types.ObjectId, required: true, ref: "ShoppingList" },
  actionType: { type: String, enum: ["added", "modified"], required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Notification = mongoose.model("Notification", NotificationSchema);
