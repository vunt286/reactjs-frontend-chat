import React, { useState, useEffect } from "react";
import ChatList from "../../../components/Sidebar/Sidebar";
import "./ChatPage.css";
import { socket } from "../../../socket/socket";
import { useAuth } from "../../../context/AuthContext";
import ChatBox from "../../../components/ChatWindow/ChatBox";

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

export default function ChatPage() {
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

  useEffect(() => {
    const handleNewMessage = (message: any) => {
      console.log("💬 New message received:", message);
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, []);

  //Lấy danh sách conversation
  useEffect(() => {
    if (!user) return;
    const fetchConversations = async () => {
      const res = await fetch(`http://localhost:3001/conversations?userId=${user._id}`);
      const data = await res.json();
      setConversations(data);
    };
    fetchConversations();
  }, [user]);

  //Lấy tin nhắn của conversation khi chọn
  useEffect(() => {
    if (!selectedConversation || !selectedConversation?._id) return;
    // ✅ Join room khi chọn cuộc trò chuyện
    socket.emit("joinRoom", selectedConversation._id);
    const fetchMessages = async () => {
      const res = await fetch(`http://localhost:3001/messages?conversationId=${selectedConversation._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessages(data);
    };
    fetchMessages();

    return () => {
      socket.emit("leaveRoom", selectedConversation._id);
    }
  }, [selectedConversation]);

  //Gửi tin nhắn
  const handleSend = async (text: string) => {
    if (!selectedConversation || !text.trim() || !user) return;

    const receiver = selectedConversation.members.find(m => m._id !== user._id);
    if (!receiver) return;

    const newMessage = { senderId: user._id, text };

    const res = await fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ ...newMessage, conversationId: selectedConversation._id }),
    });

    const savedMsg = await res.json();
    // setMessages(prev => [...prev, savedMsg]);


    // Cập nhật lastMessage trong conversation
    setConversations(prev =>
      prev.map(c =>
        c._id === selectedConversation._id ? { ...c, lastMessage: savedMsg } : c
      )
    );
  };

  if (!user) return null;

  return (
    <div className="chat-app">
      {/* CHAT WINDOW */}
      <ChatBox messages={messages} currentUser={user} selectedConversation={selectedConversation}  onSend={handleSend}/>
    </div>
  );
}
