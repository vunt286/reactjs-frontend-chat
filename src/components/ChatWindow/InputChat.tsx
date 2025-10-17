import React, { useState } from "react";
import "./InputChat.css";

type Props = {
    onSend: (text: string) => void;
};

export default function InputChat({ onSend }: Props) {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (!text.trim()) return;
        onSend(text.trim());
        setText("");
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="chat-input">
            <button className="attach">📎</button>
            <input placeholder="Nhập tin nhắn..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            <button className="emoji">😊</button>
            <button className="send-btn"  onClick={handleSend} >➤</button>
        </div>
    );
}
