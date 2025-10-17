import React, { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import "./MessageList.css";

type User = { _id: string; username: string };

type Message = {
  _id: string;
  senderId: User;
  text: string;
  createdAt?: string;
};

type Props = {
  messages: Message[];
  currentUserId: string;
};

export default function MessageList({ messages, currentUserId }: Props) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="message-list" ref={listRef}>
      {messages.length === 0 && (
        <div className="no-message">Chưa có tin nhắn nào</div>
      )}
      {messages.map((msg, idx) => {
        const next = messages[idx + 1];
        const prev = messages[idx - 1];

        const isFirstInGroup = !prev || prev.senderId._id !== msg.senderId._id;
        const isLastInGroup = !next || next.senderId._id !== msg.senderId._id;

        const isOwn = msg.senderId._id === currentUserId;

        return (
          <MessageBubble
            key={msg._id}
            text={msg.text}
            isOwn={isOwn}
            sender={isFirstInGroup ? msg.senderId : undefined}
            createdAt={isLastInGroup ? msg.createdAt : undefined} // timestamp chỉ hiện ở cuối nhóm
            isFirstInGroup={isFirstInGroup}
          />
        );
      })}

    </div>
  );
}
