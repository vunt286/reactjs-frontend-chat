import React, { useState } from "react";
import "../../styles/auth.css";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

export default function AuthPage() {
    const [activeTab, setActiveTab] = useState("login");
    const { login } = useAuth();

    // State form
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleChangeTable = (tab: string) => {
        setActiveTab(tab);
        setError("");

    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (activeTab === "register") {
                if (formData.password !== formData.confirmPassword) {
                    setError("Mật khẩu xác nhận không khớp");
                    setLoading(false);
                    return;
                }

                if (!formData.password || !formData.confirmPassword || !formData.email || !formData.username) {
                    setError("Vui lòng nhập đủ thông tin");
                    setLoading(false);
                    return;
                }

                const res = await fetch("http://localhost:3001/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: formData.username,
                        email: formData.email,
                        password: formData.password,
                    }),
                });

                if (!res.ok) throw new Error("Đăng ký thất bại");
                toast.success("Đăng ký thành công! Hãy đăng nhập.");
                setActiveTab("login");
            } else {
                if (!formData.password || !formData.username) {
                    setError("Vui lòng nhập đủ thông tin");
                    setLoading(false);
                    return;
                }

                const res = await fetch("http://localhost:3001/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: formData.username,
                        password: formData.password,
                    }),
                });

                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Đăng nhập thất bại");
                console.log(data, '========data');

                // Lưu user vào context
                login(data.user);
                toast.success("✅ Đăng nhập thành công!");
                setTimeout(() => {
                   window.location.href = "/home";
                }, 1000);
            }
        } catch (err: any) {
            toast.error(`❌ ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2 className="title">👥 Study Together</h2>
                <p className="subtitle">
                    {activeTab === "login"
                        ? "Chào mừng bạn quay trở lại!"
                        : "Tham gia cộng đồng học tập"}
                </p>

                <div className="tab-buttons">
                    <button
                        className={activeTab === "login" ? "active" : ""}
                        onClick={() => handleChangeTable("login")}
                    >
                        Đăng nhập
                    </button>
                    <button
                        className={activeTab === "register" ? "active" : ""}
                        onClick={() => handleChangeTable("register")}
                    >
                        Đăng ký
                    </button>
                </div>

                {activeTab === "login" ? (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type="text" name="username" onChange={handleChange} placeholder="Nhập username của bạn" />

                        <label>Mật khẩu</label>
                        <input type="password" name="password" onChange={handleChange} placeholder="Nhập mật khẩu" />

                        {error && <p className="error-text">{error}</p>}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading
                                ? "⏳ Đang xử lý..."
                                : "Đăng nhập"}
                        </button>
                        <a href="#" className="forgot-link">
                            Quên mật khẩu?
                        </a>
                    </form>
                ) : (
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <label>Email</label>
                        <input type="email" name="email"  onChange={handleChange} placeholder="Nhập email của bạn" />

                        <label>Username</label>
                        <input type="text" name="username"  onChange={handleChange} placeholder="Nhập username của bạn" />

                        <label>Mật khẩu</label>
                        <input type="password" name="password"  onChange={handleChange} placeholder="Nhập mật khẩu" />

                        <label>Xác nhận mật khẩu</label>
                        <input type="password" name="confirmPassword"  onChange={handleChange} placeholder="Nhập lại mật khẩu" />

                        {error && <p className="error-text">{error}</p>}

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading
                                ? "⏳ Đang xử lý..."
                                : "Tạo tài khoản"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
