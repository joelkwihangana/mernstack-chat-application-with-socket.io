import express from "express";
import { chats } from "./data/data.js";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Allow requests from all origins (not recommended for production)
app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`serever is running on port ${PORT}`));

app.get("/", (req, res) => {
  res.send("API is running!");
});

//get all chats
app.get("/api/chat", (req, res) => {
  res.json(chats);
});

//get a specific chat by id
app.get("/api/chat/:id", (req, res) => {
  const singleChat = chats.find((chat) => chat._id === req.params.id);
  console.log(singleChat);
  res.send(singleChat);
});
