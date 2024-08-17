import express from "express";
import { chats } from "./data/data.js"; // Ensure the path is correct and ends with .js

const app = express();

app.listen(5000, () => console.log("Server is running on port 5000"));

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
