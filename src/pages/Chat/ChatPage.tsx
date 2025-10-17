import React, { useState, useEffect } from "react";
import ChatList from "../../components/Sidebar/ChatList";
import MessageList from "../../components/ChatWindow/MessageList";
import ChatInput from "../../components/ChatInput";
import "./ChatPage.css";
import { stringToColor } from "../../common/utils";
import { socket } from "../../socket/socket";
import { useAuth } from "../../context/AuthContext";

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
    <div className="chat-page">
      <ChatList
        conversations={conversations}
        selectedId={selectedConversation?._id || null}
        onSelect={id => setSelectedConversation(conversations.find(c => c._id === id) || null)}
        currentUserId={user._id}
        username={user.username}
        onLogout={() => {
          logout();
        }}
      />
      <div className="chat-area">
        {selectedConversation ? (
          <>
            <div className="chat-header">
              {selectedConversation && (
                <div className="chat-header-info">
                  {/* Nếu private chat, lấy người khác là avatar */}
                  {selectedConversation.type === "private" ? (
                    <div className="chat-user">
                      <div className="avatar" style={{
                        backgroundColor: stringToColor(selectedConversation.members
                          .find((m) => m._id !== user._id)
                          ?.username || '')
                      }}>
                        {selectedConversation.members
                          .find((m) => m._id !== user._id)
                          ?.username.charAt(0)
                          .toUpperCase()}
                      </div>
                      <span>
                        {selectedConversation.members.find((m) => m._id !== user._id)?.username}
                      </span>
                    </div>
                  ) : (
                    /* Nếu group chat */
                    <div className="chat-group">
                      <div className="group-avatars">
                        {selectedConversation.members.slice(0, 3).map((m, idx) => (
                          <div
                            key={m._id}
                            className="avatar group"
                            style={{
                              backgroundColor: stringToColor(m.username),
                              zIndex: 10 - idx,
                              left: idx * 16, // đẩy ngang từng avatar
                            }}
                          >
                            {m.username.charAt(0).toUpperCase()}
                          </div>
                        ))}
                      </div>
                      <span className="group-name">{selectedConversation.name}</span>
                    </div>
                  )}
                </div>
              )}

            </div>
            <MessageList messages={messages} currentUserId={user._id} />
            <ChatInput onSend={handleSend} />
          </>
        ) : (
          <div className="no-chat">Chọn cuộc trò chuyện để bắt đầu</div>
        )}
      </div>
    </div>
  );
}
