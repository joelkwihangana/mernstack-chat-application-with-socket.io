import React, { useEffect, useState } from "react";
import axios from "axios";

interface IChat {
  chatName: string;
  _id: string;
  isGroupChat: boolean;
  email: string;
}

// interface ChatpageProps {}

const Chatpage: React.FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const fetchChats = async () => {
    try {
      const { data } = await axios.get("/api/chat");
      console.log(data);
      setChats(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <h1>List of chats</h1>
      <ul>
        {chats.map((item) => (
          <li key={item._id}>{item.chatName}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chatpage;
