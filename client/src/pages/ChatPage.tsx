import React, { useEffect } from "react";
import axios from "axios";

const ChatPage = () => {
  const fetchChats = async () => {
    const response = await axios.get("http://localhost:5000/api/chat");

    console.log(response);
  };

  useEffect(() => {
    fetchChats();
  }, []);
  return <div>ChatPage</div>;
};

export default ChatPage;
