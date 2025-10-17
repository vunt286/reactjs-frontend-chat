import React from "react";
import "./ChatWindow.css";

const ChatWindow = () => {
  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-user">Trần Thị B</div>
        <div className="chat-status">Đang hoạt động</div>
      </div>

      <div className="chat-messages">
        <div className="message received">
          <div className="bubble">Cảm ơn bạn!</div>
          <div className="time">13:00</div>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder="Nhập tin nhắn..." />
        <button>➤</button>
      </div>
    </div>
  );
};

export default ChatWindow;
