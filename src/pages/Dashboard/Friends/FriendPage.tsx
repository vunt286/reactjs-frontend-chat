import React, { useEffect, useState } from "react";
import "./FriendPage.css";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

type Friend = {
  id: string;
  name: string;
  subjects: string[];
  status: "friend" | "pending" | "request_received" | "none";
  avatar: string;
  online: boolean;
};

const FriendPage = () => {
  const { user } = useAuth();

  const [friends, setFriends] = useState<Friend[]>([
    { id: "1", name: "Minh An", subjects: ["Toán học", "Vật lý"], avatar: "/an.jpg", online: true, status: "friend" },
    { id: "2", name: "Thu Hà", subjects: ["Văn học", "Tiếng Anh"], avatar: "/ha.jpg", online: false, status: "friend" },
  ]);

  const [others, setOthers] = useState<Friend[]>([
    { id: "3", name: "Phương Nam", subjects: ["Lịch sử"], avatar: "/nam.jpg", online: false, status: "none" },
    { id: "4", name: "Trà My", subjects: ["Hóa học"], avatar: "/my.jpg", online: true, status: "pending" },
    { id: "5", name: "Bảo Ngọc", subjects: ["Toán học"], avatar: "/ngoc.jpg", online: false, status: "request_received" },
  ]);

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleAddFriend = async (id: string) => {
    const res = await fetch("http://localhost:3001/friendship/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: user?._id, recipientId: id }),
    });
    if (!res.ok) toast.error(`Kết bạn lỗi`);
    toast.success("Gửi lời mời kết bạn thành công!");
    setOthers(prev => prev.map(u => u.id === id ? { ...u, status: "pending" } : u));
  };

  const handleAccept = async (id: string) => {
    const res = await fetch("http://localhost:3001/friendship/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: id, recipientId: user?._id, "action": "accept" }),
    });
    if (!res.ok) toast.error(`Đồng ý kết bạn lỗi`);
    toast.success("Đồng ý kết bạn thành công!");
    const userFilter = others.find(u => u.id === id);
    if (userFilter) {
      setOthers(prev => prev.filter(u => u.id !== id));
      setFriends([...friends, { ...userFilter, status: "friend" }]);
    }
  };

  const handleDecline = async (id: string) => {
    const res = await fetch("http://localhost:3001/friendship/respond", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requesterId: id, recipientId: user?._id, "action": "reject" }),
    });
    if (!res.ok) toast.error(`Xác nhận lỗi`);
    toast.success("Xác nhận thành công!");
    setOthers(prev => prev.filter(u => u.id !== id));
  };

  // 🔹 Lấy dữ liệu từ API
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res: any = await fetch(`http://localhost:3001/friendship/users?userId=${user?._id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" }
        });
        const data = await res.json();

        // Map API data sang structure component cần
        const mappedFriends: Friend[] = data
          .filter((u: any) => u.friendStatus === "friend")
          .map((u: any) => ({
            id: u._id,
            name: u.username,
            subjects: ["Toán học"], // có thể map từ API nếu có
            avatar: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`,
            online: u.status === "online",
            status: "friend"
          }));

        const mappedOthers: Friend[] = data
          .filter((u: any) => u.friendStatus !== "friend")
          .map((u: any) => ({
            id: u._id,
            name: u.username,
            subjects: ["Toán học"], // gán tạm nếu API ko có
            avatar: `https://i.pravatar.cc/100?img=${Math.floor(Math.random() * 70)}`,
            online: u.status === "online",
            status: u.friendStatus
          }));

        setFriends(mappedFriends);
        setOthers(mappedOthers);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách bạn bè:", error);
      }
    };

    fetchFriends();
  }, []);



  return (
    <div className="friend-page">
      {/* 🔹 HEADER */}
      <header className="friend-header">
        <div>
          <h2>Danh sách bạn bè</h2>
          <p>
            {friends.length} bạn bè •{" "}
            {friends.filter((f) => f.online).length} đang hoạt động
          </p>
        </div>
        <div className="view-buttons">
          <button
            className={`icon-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
          >
            <span className="material-icons">grid_view</span>
          </button>
          <button
            className={`icon-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
          >
            <span className="material-icons">view_list</span>
          </button>
        </div>
      </header>

      {/* 🔸 DANH SÁCH BẠN BÈ */}
      <div className={`friend-list ${viewMode}`}>
        {friends.map(friend => (
          <div key={friend.id} className="friend-card">
            <img src={'https://i.pravatar.cc/100?img=' + friend.id} alt={friend.name} />
            <h4>{friend.name}</h4>
            <p className={friend.online ? "online" : "offline"}>
              {friend.online ? "Đang hoạt động" : "Ngoại tuyến"}
            </p>
            <div className="subjects">
              {friend.subjects.map(sub => <span key={sub}>{sub}</span>)}
            </div>
            <button className="chat-btn">💬 Nhắn tin</button>
          </div>
        ))}
      </div>

      {/* 🔸 GỢI Ý KẾT BẠN */}
      <h3>Gợi ý kết bạn</h3>
      <div className={`friend-list ${viewMode}`}>
        {others.map(user => (
          <div key={user.id} className="friend-card">
            <img src={'https://i.pravatar.cc/100?img=' + user.id} alt={user.name} />
            <h4>{user.name}</h4>
            <p className={user.online ? "online" : "offline"}>
              {user.online ? "Đang hoạt động" : "Ngoại tuyến"}
            </p>
            <div className="subjects">
              {user.subjects.map(sub => <span key={sub}>{sub}</span>)}
            </div>

            {user.status === "none" && (
              <button className="add-btn" onClick={() => handleAddFriend(user.id)}>🤝 Kết bạn</button>
            )}
            {user.status === "pending" && (
              <button className="pending-btn" disabled>⏳ Đã gửi lời mời</button>
            )}
            {user.status === "request_received" && (
              <div className="request-btns">
                <button className="accept-btn" onClick={() => handleAccept(user.id)}>✅ Chấp nhận</button>
                <button className="decline-btn" onClick={() => handleDecline(user.id)}>❌ Từ chối</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendPage;
