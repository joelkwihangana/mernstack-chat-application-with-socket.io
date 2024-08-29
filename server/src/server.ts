// src/server.ts
import express, { Request, Response } from "express";
import { chats, IChat } from "./data/data";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running!");
});

// Get all chats
app.get("/api/chat", (req: Request, res: Response) => {
  res.json(chats);
});

// Get a specific chat by ID
app.get("/api/chat/:id", (req: Request, res: Response) => {
  const chat = chats.find((c) => c._id === req.params.id);
  if (chat) {
    res.json(chat);
  } else {
    res.status(404).json({ message: "Chat not found" });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
