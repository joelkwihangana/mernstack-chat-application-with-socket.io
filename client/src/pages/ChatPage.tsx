import React, { useEffect, useState } from "react";
import axios from "axios";

export interface IChats {
  _id: string;
  isGroupChat: boolean;
  users: {
    name: string;
    email: string;
  }[];
  chatName: string;
  groupAdmin?: {
    name: string;
    email: string;
  };
}

const ChatPage = () => {
  const [chats, setChats] = useState<IChats[]>([]);
  const fetchChats = async () => {
    const response = await axios.get("http://localhost:5000/api/chat");

    console.log(response.data);
    setChats(response.data);
  };

  useEffect(() => {
    fetchChats();
    console.log("chats are: ", chats);
  }, []);
  return (
    <div>
      <h1>List of Chats</h1>
      <ul>
        {chats.map((chat) => (
          <li key={chat._id}>{chat.chatName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChatPage;
