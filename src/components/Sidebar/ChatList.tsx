import React from "react";
import "./ChatList.css";
import { stringToColor } from "../../common/utils";

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

export default function ChatList({
  conversations,
  selectedId,
  onSelect,
  currentUserId,
  username,
  onLogout,
}: Props) {
  return (
    <div className="sidebar">
      <div className="chat-list">
        <h2>Finder</h2>
        <ul>
          {conversations.length === 0 && <li>Chưa có cuộc trò chuyện</li>}
          {conversations.map((conv) => {
            let displayName = conv.name || "Nhóm";
            const isGroup = conv.type === "group";

            // Xác định avatar(s)
            let avatarContent;
            if (!isGroup) {
              const other = conv.members.find(m => m._id !== currentUserId);
              displayName = other?.username || "Người lạ";
              avatarContent = <div className="avatar" style={{ backgroundColor: stringToColor(displayName) }}>{displayName.charAt(0).toUpperCase()}</div>;
            } else {
              // Group: hiển thị 2-3 avatar chồng lên nhau
              const groupMembers = conv.members.slice(0, 3).map(m => (
                <div key={m._id} className="group-avatar">{m.username.charAt(0).toUpperCase()}</div>
              ));
              avatarContent = <div className="avatar-group">{groupMembers}</div>;
            }

            // Last message hiển thị tên người gửi nếu group
            let lastMessageText = conv.lastMessage?.text || "Chưa có tin nhắn";
            if (isGroup && conv.lastMessage) {
              const sender = conv.members.find(m => m._id === conv.lastMessage!.senderId);
              if (sender) lastMessageText = `${sender.username}: ${lastMessageText}`;
            }

            return (
              // <li
              //   key={conv._id}
              //   className={conv._id === selectedId ? "active" : ""}
              //   onClick={() => onSelect(conv._id)}
              // >
              //   {avatarContent}
              //   <div className="chat-info">
              //     <div className="chat-name">{displayName}</div>
              //     <div className="last-message">{lastMessageText}</div>
              //   </div>
              // </li>
              <li
                key={conv._id}
                className={`${conv._id === selectedId ? "active" : ""} ${conv.unread ? "unread" : ""}`}
                onClick={() => onSelect(conv._id)}
              >
                {avatarContent}
                <div className="chat-info">
                  <div className={`chat-name ${conv.unread ? "bold" : ""}`}>
                    {displayName}
                  </div>
                  <div className="last-message">
                    {conv.lastMessage?.text || "Chưa có tin nhắn"}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* User profile */}
      <div className="user-profile">
        <div className="user-info">
          <div className="avatar">{username.charAt(0).toUpperCase()}</div>
          <span className="username">{username}</span>
          <button className="logout-btn" onClick={onLogout}>
            Đăng xuất
          </button>
        </div>
      </div>

    </div>
  );
}
