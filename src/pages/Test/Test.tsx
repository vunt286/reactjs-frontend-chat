import ChatWindow from "../../components/test/ChatWindow";
import Sidebar from "../../components/test/Sidebar";
import "./Tes2t.css";


export default function TestPage() {

    return (
        <div className="chat-app">
            {/* SIDEBAR */}
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
                            <div className="username">Nguyễn Văn A</div>
                            <div className="status">Đang hoạt động</div>
                        </div>
                    </div>

                    <nav className="menu">
                        <button>🏠 Trang chủ</button>
                        <button>🤝 Lời mời kết bạn</button>
                        <button className="active">💬 Tin nhắn</button>
                        <button>📋 Nhiệm vụ</button>
                        <button>❓ Hỗ trợ</button>
                    </nav>
                </div>

                {/* TIN NHẮN HEADING + CREATE BUTTON */}
                <div className="messages-section">
                    <div className="messages-header">
                        <div className="messages-title">Tin nhắn</div>
                        <button className="create-btn">+</button>
                    </div>

                    <div className="chat-list">
                        <div className="chat-item">
                            <div className="left">
                                <div className="chat-icon">👥</div>
                                <div className="chat-details">
                                    <div className="chat-name">Nhóm Toán 12A1</div>
                                    <div className="chat-sub">Buổi học “Buổi học SWP...”</div>
                                </div>
                            </div>
                            <div className="right">
                                <span className="chat-time">18:22</span>
                                <span className="chat-badge">3</span>
                            </div>
                        </div>

                        <div className="chat-item">
                            <div className="left">
                                <div className="chat-icon">🔬</div>
                                <div className="chat-details">
                                    <div className="chat-name">Nhóm Vật lý nâng cao</div>
                                    <div className="chat-sub">Hẹn gặp lại vào 8h sáng mai</div>
                                </div>
                            </div>
                            <div className="right">
                                <span className="chat-time">14:15</span>
                            </div>
                        </div>

                        <div className="chat-item active">
                            <div className="left">
                                <div className="chat-icon">🧍‍♀️</div>
                                <div className="chat-details">
                                    <div className="chat-name">Trần Thị B</div>
                                    <div className="chat-sub">Cảm ơn bạn!</div>
                                </div>
                            </div>
                            <div className="right">
                                <span className="chat-time">13:00</span>
                                <span className="chat-badge">1</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="logout">
                    <button>🚪 Đăng xuất</button>
                </div>
            </aside>

            {/* CHAT WINDOW */}
            <main className="chat-window">
                <div className="chat-header">
                    <div className="user">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
                            alt="avatar"
                            className="avatar"
                        />
                        <div>
                            <div className="username">Trần Thị B</div>
                            <div className="status">Đang hoạt động</div>
                        </div>
                    </div>

                    <div className="header-actions">
                        <button className="icon-btn">🔍</button>
                        <button className="icon-btn">📞</button>
                        <button className="icon-btn">⋮</button>
                    </div>
                </div>

                <div className="chat-body">
                    <div className="message received">
                        <div className="bubble">Cảm ơn bạn!</div>
                        <div className="msg-time">13:00</div>
                    </div>
                </div>

                <div className="chat-input">
                    <button className="attach">📎</button>
                    <input placeholder="Nhập tin nhắn..." />
                    <button className="emoji">😊</button>
                    <button className="send-btn">➤</button>
                </div>
            </main>
        </div>
    );
}
