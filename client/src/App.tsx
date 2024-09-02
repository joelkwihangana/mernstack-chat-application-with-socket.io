import "./App.css";
import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/chats" Component={ChatPage} />
        </Routes>
      </div>
    </>
  );
}

export default App;
