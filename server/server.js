import express from "express";
import { chats } from "./data/data.js";
import dotenv from "dotenv";

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`serever is running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("API is running!");
});

//get all chats
app.get("/api/chat", (req, res) => {
  res.send(chats);
});

//get a specific chat by id
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  console.log(singleChat);
  res.send(singleChat);
});
