import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

type Member = { _id: string; username: string; email?: string };
type LastMessage = { _id: string; conversationId: string; senderId: string; text: string; createdAt: string };
type Conversation = { _id: string; type: "private" | "group"; members: Member[]; lastMessage?: LastMessage; name?: string, unread: boolean };

type Props = {
  conversations: Conversation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  currentUserId: string;
  username: string;
  onLogout: () => void;
};

export default function Sidebar({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
  username,
  onLogout,
}: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-header">
          <h2 className="logo">Study Together</h2>
        </div>

        <div className="user-info">
          <img
            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
            alt="avatar"
            className="avatar"
          />
          <div className="user-meta">
            <div className="username">{username}</div>
            <div className="status">Đang hoạt động</div>
          </div>
        </div>

        <nav className="menu">
          <NavLink to="main" className="menu-item">🏠 Trang chủ</NavLink>
          <NavLink to="friends" className="menu-item">👥 Bạn bè</NavLink>
          <NavLink to="chat" className="menu-item">💬 Tin nhắn</NavLink>
          <NavLink to="friends-requests" className="menu-item">🤝 Lời mời kết bạn</NavLink>
          <NavLink to="/tasks" className="menu-item">📋 Nhiệm vụ</NavLink>
          <NavLink to="/help" className="menu-item">❓ Hỗ trợ</NavLink>
        </nav>
      </div>

      {/* TIN NHẮN HEADING + CREATE BUTTON */}

      <div className="messages-section">
        <div className="messages-header">
          <div className="messages-title">Tin nhắn</div>
          <button className="create-btn">+</button>
        </div>

        {conversations.length === 0 && <div className="chat-item">
          <div className="left">
            <div className="chat-details">
              <div className="chat-name">Chưa có tin nhăn</div>
            </div>
          </div>
        </div>}

        <div className="chat-list">
          {conversations.map((conv) => {
            let displayName = conv.name || "Nhóm";
            const isGroup = conv.type === "group";

            // Last message hiển thị tên người gửi nếu group
            let lastMessageText = conv.lastMessage?.text || "Chưa có tin nhắn";
            if (isGroup && conv.lastMessage) {
              const sender = conv.members.find(m => m._id === conv.lastMessage!.senderId);
              if (sender) lastMessageText = `${sender.username}: ${lastMessageText}`;
            }

            return (
              <div className="chat-item" onClick={() => onSelect(conv._id)}>
                <div className="left">
                  <div className="chat-icon">{isGroup ? '👥' : '🧍‍♀️'}</div>
                  <div className="chat-details">
                    <div className="chat-name">{displayName}</div>
                    <div className="chat-sub">{lastMessageText}</div>
                  </div>
                </div>
                <div className="right">
                  <span className="chat-time">18:22</span>
                  <span className="chat-badge">3</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="logout">
        <button>🚪 Đăng xuất</button>
      </div>
    </aside>
  );
}
