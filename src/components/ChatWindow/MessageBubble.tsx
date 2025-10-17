import React from "react";
import "./MessageBubble.css";
import { stringToColor } from "../../common/utils";

type User = { _id: string; username: string };

type Props = {
  text: string;
  isOwn: boolean;
  sender?: User;
  createdAt?: string;
  isFirstInGroup?: boolean; // gộp bubble
};

export default function MessageBubble({
  text,
  isOwn,
  sender,
  createdAt,
  isFirstInGroup = true,
}: Props) {
  return (
    <div className={`message-row ${isOwn ? "own" : "other"}`}>
      {/* Avatar chỉ hiện nếu là tin nhắn đầu nhóm */}
      {isFirstInGroup && !isOwn && sender && (
        <div className="avatar" style={{ backgroundColor: stringToColor(sender.username) }}>{sender.username?.charAt(0).toUpperCase()}</div>
      )}
      <div
        className={`message-bubble-wrapper ${isOwn ? "own" : "other"} ${
          isFirstInGroup ? "first" : "continued"
        }`}
      >
        {isFirstInGroup && !isOwn && sender && (
          <div className="sender-name">{sender.username}</div>
        )}
        <div className="bubble">{text}</div>
        {isFirstInGroup && createdAt && (
          <div className="timestamp">
            {new Date(createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        )}
      </div>
      {isFirstInGroup && isOwn && (
        <div className="avatar own">{sender?.username.charAt(0).toUpperCase()}</div>
      )}
    </div>
  );
}
