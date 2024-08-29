// src/data/data.ts
export interface Chat {
    _id: string;
    message: string;
    sender: string;
  }
  
  export const chats: Chat[] = [
    { _id: "1", message: "Hello, how are you?", sender: "John Doe" },
    { _id: "2", message: "I'm fine, thank you!", sender: "Jane Smith" },
  ];
  