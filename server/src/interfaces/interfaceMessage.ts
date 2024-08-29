import mongoose from "mongoose";

export interface IMessage {
  sender: mongoose.Types.ObjectId;
  content: string;
  chat: mongoose.Types.ObjectId;
}
