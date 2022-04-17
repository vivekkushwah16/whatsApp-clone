import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/auth/Login";
import ChatBox from "./Components/chatbox";
import Sidebar from "./Components/sidebar/Sidebar";
import { useStateValue } from "./Store/StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Routes>
              <Route exact path="/rooms/:roomID" element={<ChatBox />} />
              <Route exact path="/" element={<ChatBox />} />
            </Routes>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
