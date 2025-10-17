import React, { JSX, useEffect, useState } from "react";
import ChatPage from "./pages/Chat/ChatPage";
import { socket } from "./socket/socket";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/Auth/AuthPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/Home/HomePage";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const storedUser = localStorage.getItem("user");
  console.log("user------------home", storedUser);
  
  return storedUser ? children : <Navigate to="/auth" replace />;
};

function App() {
  // const [user, setUser] = useState<any>(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  console.log("useruseruseruser", user);

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log("✅ Connected to server:", socket.id);
      
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected from server");
    });

    socket.on("connect_error", (err) => {
      console.error("⚠️ Connection error:", err.message);
    });
  }, []);

  //<ChatPage user={user} onLogout={() => setUser(null)} />
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <ChatPage />
              </PrivateRoute>
            }
          />
        </Routes>
        <ToastContainer position="top-center" autoClose={2000} theme="colored" />
      </Router>
    </AuthProvider>
  );

}

export default App;
