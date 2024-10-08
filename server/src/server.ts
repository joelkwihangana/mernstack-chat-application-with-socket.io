// src/server.ts
import express, { Request, Response } from "express";
import { chats, IChat } from "./data/data";
import cors from "cors";
import connectToDatabase from "./config/db";
import dotenv from "dotenv";

import userRoutes from "./routes/userRoutes";
import { errorHandler, notFound } from "./middlewares/errorMiddlewares";

dotenv.config();

const app = express();
// Middleware
app.use(cors());
const PORT = process.env.PORT || 8000;
connectToDatabase();

app.use(express.json()); //to accept json data

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

//User Authentication

app.use("/api/user", userRoutes);

//middleware routes
app.use(notFound);
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
