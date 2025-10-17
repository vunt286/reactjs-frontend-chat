import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* HEADER */}
      <header className="header">
        <h1 className="logo">Study Together</h1>
        <nav>
          <button className="link-btn" onClick={() => navigate("/auth")}>
            Đăng nhập
          </button>
          <button className="primary-btn" onClick={() => navigate("/auth")}>
            Đăng ký
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <h2>
            Kết nối bạn học –{" "}
            <span className="highlight">Học cùng nhau hiệu quả hơn</span>
          </h2>
          <p>
            Tìm kiếm những người bạn học tập cùng đam mê, tạo nhóm học online và cùng
            nhau chinh phục mục tiêu học tập!
          </p>
          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/register")}>
              Tham gia ngay
            </button>
            <button className="secondary-btn">Tìm hiểu thêm</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://cdn.dribbble.com/userupload/13994608/file/original-bd5a6a82850226741c3ec15dbfc8a37d.png?resize=800x600"
            alt="Study illustration"
          />
        </div>
      </section>

      {/* FEATURES */}
      <section className="features">
        <h3>
          Tại sao chọn <span className="highlight">Study Together</span>?
        </h3>
        <div className="feature-grid">
          <div className="feature-card">
            <div className="icon">👥</div>
            <h4>Tìm bạn học phù hợp</h4>
            <p>
              Kết nối với những người bạn cùng sở thích học tập và mục tiêu tương đồng.
            </p>
          </div>
          <div className="feature-card">
            <div className="icon">💻</div>
            <h4>Tạo nhóm học online</h4>
            <p>Tạo nhóm học qua Google Meet hoặc Zoom, học cùng nhau hiệu quả hơn.</p>
          </div>
          <div className="feature-card">
            <div className="icon">💬</div>
            <h4>Nhắn tin & chia sẻ</h4>
            <p>Trao đổi bài tập, ghi chú, file, và thảo luận các vấn đề học tập.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🗓️</div>
            <h4>Quản lý lịch học</h4>
            <p>Thiết lập thời gian và nhắc nhở học tập mỗi ngày một cách khoa học.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h3>Bắt đầu hành trình học tập cùng nhau ngay hôm nay!</h3>
        <p>
          Tham gia cộng đồng hàng nghìn sinh viên đang học tập và phát triển cùng nhau.
        </p>
        <button className="cta-btn" onClick={() => navigate("/register")}>
          Tham gia miễn phí
        </button>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <h4>Study Together</h4>
        <p>Kết nối sinh viên, tạo môi trường học tập hiệu quả và vui vẻ.</p>
        <div className="social">
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Twitter</a>
        </div>
        <small>© 2024 Study Together. All rights reserved.</small>
      </footer>
    </div>
  );
};

export default HomePage;
