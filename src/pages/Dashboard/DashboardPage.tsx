import React, { useState, useEffect } from "react";
import "./DashboardPage.css";
import ChatList from "../../components/Sidebar/Sidebar";
import ChatBox from "../../components/ChatWindow/ChatBox";
import { useAuth } from "../../context/AuthContext";
import Sidebar from "../../components/Sidebar/Sidebar";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import MainPage from "./Friends/FriendPage";
import FriendPage from "./Main/MainPage";
import ChatPage from "./Chat/ChatPage";

type Member = { _id: string; username: string; email?: string };
type LastMessage = { _id: string; conversationId: string; senderId: string; text: string; createdAt: string };
type Conversation = { _id: string; type: "private" | "group"; members: Member[]; lastMessage?: LastMessage; name?: string, unread: boolean };
type User = {
  _id: string;
  username: string;
  email?: string;
};
type Message = {
  _id: string;
  conversationId?: string;
  senderId: User;
  text: string;
  createdAt?: string;
};

export default function DashboardPage() {
  const { logout } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [user, setUser] = useState<User | null>(null);


  const token = localStorage.getItem("token");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser, 'storedUserstoredUserstoredUser');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSend = async (text: string) => { }

  if (!user) return null;

  return (
    <div className="chat-app">
        <Sidebar
          conversations={conversations}
          selectedId={selectedConversation?._id || null}
          onSelect={(id: any) => setSelectedConversation(conversations.find(c => c._id === id) || null)}
          currentUserId={user._id}
          username={user.username}
          onLogout={() => {
            logout();
          }}
        />
        {/* CHAT WINDOW */}
        <main className="chat-window">
          <Outlet />
        </main>

      </div>
  );
}
