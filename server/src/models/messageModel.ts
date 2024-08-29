import mongoose, { Document, Schema } from "mongoose";
import { IMessage } from "../interfaces/interfaceMessage";

//this schema is going to have three thing:
//first, the name of the sender or id of the sender
//second, the content of the message that is written for this message
//third, the reference to the chat to which the message belongs to!

const messageModel: Schema<IMessage> = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>("Message", messageModel);

module.exports = Message;
