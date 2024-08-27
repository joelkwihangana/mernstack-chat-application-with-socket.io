import React, { useEffect, useState } from "react";
import axios from "axios";

interface IChats {
  _id: number;
  chatName: string;
  isGroupChat: string;
}

const ChatPage = () => {
  const [chats, setChats] = useState<IChats[]>([]);
  const fetchChats = async () => {
    const response = await axios.get("http://localhost:5000/api/chat");

    console.log(response);
    setChats(response.data);
  };

  useEffect(() => {
    fetchChats();
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
