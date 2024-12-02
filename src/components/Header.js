import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/Header.css";

function Header({ isLoggedIn, onLogout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => setIsScrolled(window.scrollY > 50);

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
  };

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
      localStorage.removeItem("isLoggedIn");
      onLogout();
      setIsMenuOpen(false);
    } else {
      localStorage.setItem("isLoggedIn", true);
    }
  };

  useEffect(() => {
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
