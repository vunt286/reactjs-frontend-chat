import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const chats = [
    { name: "Nhóm Toán 12A1", time: "18:22", unread: 3 },
    { name: "Nhóm Vật lý nâng cao", time: "14:15", unread: 0 },
    { name: "Trần Thị B", time: "13:00", unread: 1 },
  ];

  return (
    <div className="sidebar">
      <h2 className="logo">Study Together</h2>

      <div className="menu">
        <button>Trang chủ</button>
        <button>Tin nhắn</button>
        <button>Nhiệm vụ</button>
        <button>Hỗ trợ</button>
      </div>

      <div className="chat-list">
        {chats.map((chat, index) => (
          <div key={index} className={`chat-item ${chat.unread ? "unread" : ""}`}>
            <div className="chat-name">{chat.name}</div>
            <div className="chat-time">{chat.time}</div>
            {chat.unread > 0 && <span className="chat-badge">{chat.unread}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
