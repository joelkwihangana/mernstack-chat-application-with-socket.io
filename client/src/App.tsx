import "./App.css";
import { Routes, Route } from "react-router-dom";
import Chatpage from "./pages/ChatPage";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<Chatpage />} />
      </Routes>
    </>
  );
}

export default App;
