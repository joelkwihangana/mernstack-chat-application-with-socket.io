"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express_1 = __importDefault(require("express"));
const data_1 = require("./data/data");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
app.get("/", (req, res) => {
    res.send("API is running!");
});
// Get all chats
app.get("/api/chat", (req, res) => {
    res.json(data_1.chats);
});
// Get a specific chat by ID
app.get("/api/chat/:id", (req, res) => {
    const chat = data_1.chats.find((c) => c._id === req.params.id);
    if (chat) {
        res.json(chat);
    }
    else {
        res.status(404).json({ message: "Chat not found" });
    }
});
// Start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
