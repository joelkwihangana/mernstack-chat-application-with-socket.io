//chatName
//isGroupChat
//users
//latestMessage
//groupAdmin

import mongoose, { Document, Schema } from "mongoose";
import { IChat } from "../interfaces/chatInterfaces";

const chatSchema: Schema<IChat> = new Schema(
  {
    _id: { type: String, required: true },
    chatName: { type: String, trim: true, required: true },
    isGroupChat: { type: Boolean, default: false },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    latestMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    groupAdmin: { type: Schema.Types.ObjectId, ref: "User", required: false },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model<IChat>("Chat", chatSchema);

module.exports = Chat;
