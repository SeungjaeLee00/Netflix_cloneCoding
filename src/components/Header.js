import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/Header.css";

function Header({ onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리
  const navigate = useNavigate();

  // 스크롤 이벤트 핸들러
  const handleScroll = () => setIsScrolled(window.scrollY > 50);

  // 메뉴 토글
  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // 메뉴 항목 클릭 시 이동 (로그인 상태에 따라 처리)
  const handleNavItemClick = (path) => {
    if (!isLoggedIn) {
      navigate("/signUp");
      return;
    }
    setIsMenuOpen(false);
    navigate(path);
  };

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      // 로그아웃 처리
      localStorage.removeItem("isLoggedIn");
      setIsLoggedIn(false);
      onLogout();
      setIsMenuOpen(false);
    } else {
      // 로그인 처리
      localStorage.setItem("isLoggedIn", true);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn) {
      setIsLoggedIn(true);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={isScrolled ? "header scrolled" : "header"}>
      <div className="logo">
        <Link to="/">Netflix Clone</Link>
      </div>
      <nav className={isMenuOpen ? "open" : ""}>
        <Link to="/" onClick={() => handleNavItemClick("/")}>
          Home
        </Link>
        <Link to="/popular" onClick={() => handleNavItemClick("/popular")}>
          Popular
        </Link>
        <Link to="/search" onClick={() => handleNavItemClick("/search")}>
          Search
        </Link>
        <Link to="/wishlist" onClick={() => handleNavItemClick("/wishlist")}>
          Wishlist
        </Link>

        {/* 로그인 상태일 때만 로그아웃 버튼을 보이도록 함 */}
        {isLoggedIn && <button onClick={handleLoginLogout}>Logout</button>}
      </nav>
      <div
        className={`hamburger ${isMenuOpen ? "open" : ""}`}
        onClick={handleMenuToggle}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
}

export default Header;
