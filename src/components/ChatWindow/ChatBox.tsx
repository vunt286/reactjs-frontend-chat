import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import "./ChatBox.css";
import InputChat from "./InputChat";

type Member = { _id: string; username: string; email?: string };
type LastMessage = { _id: string; conversationId: string; senderId: string; text: string; createdAt: string };
type User = { _id: string; username: string };
type Conversation = { _id: string; type: "private" | "group"; members: Member[]; lastMessage?: LastMessage; name?: string, unread: boolean };

type Message = {
    _id: string;
    senderId: User;
    text: string;
    createdAt?: string;
};

type Props = {
    messages: Message[];
    currentUser: User;
    selectedConversation: Conversation | null;
    onSend: (text: string) => void;
};

export default function ChatBox({ messages, currentUser, selectedConversation, onSend }: Props) {
    const listRef = useRef<HTMLDivElement>(null);
    const [nameChat, setNameChat] = useState<string | null>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        console.log(selectedConversation, 'selectedConversation');
        if (selectedConversation) {
            let name = null;
            if (selectedConversation.type === 'group') {
                name = selectedConversation.name;
            } else {
                const friend = selectedConversation.members.find((m) => m._id !== currentUser._id);
                name = friend?.username;
            }
            if (name) {
                setNameChat(name);
            }
        }
    }, [selectedConversation]);

    return (
        <main className="chat-window">
            {!selectedConversation && (<>
                <h3>Chọn tin nhắn để chat</h3>
            </>)}
            {selectedConversation && (<>
                <div className="chat-header">
                    <div className="user">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                            alt="avatar"
                            className="avatar"
                        />
                        <div>
                            <div className="username">{nameChat}</div>
                            <div className="status">Đang hoạt động</div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="icon-btn">🔍</button>
                        <button className="icon-btn">📞</button>
                        <button className="icon-btn">⋮</button>
                    </div>
                </div>

                <div className="chat-body" ref={listRef}>
                    {messages.length === 0 && (
                        <div className="no-message">Chưa có tin nhắn nào</div>
                    )}
                    {messages.map((msg, idx) => {
                        const next = messages[idx + 1];
                        const prev = messages[idx - 1];
                        const isFirstInGroup = !prev || prev.senderId._id !== msg.senderId._id;
                        const isLastInGroup = !next || next.senderId._id !== msg.senderId._id;
                        const isOwn = msg.senderId._id === currentUser._id;
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

                <InputChat onSend={onSend} />
            </>)}
        </main>
    );
}
