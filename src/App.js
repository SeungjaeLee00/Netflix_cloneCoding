import React, { useState, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import PopularPage from "./pages/PopularPage";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";
import SignUpPage from "./pages/SignUpPage";
import Header from "./components/Header";
import SignInPopup from "./components/SignInPopup";

const App = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null); // null로 초기화하여 로딩 상태를 처리

  // 로그인 상태 확인
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    if (loggedIn === "true") {
      setIsLoggedIn(true);
      setIsPopupVisible(false);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // 팝업 닫기 처리
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsPopupVisible(true); // 로그아웃 후 팝업 다시 표시
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // 로그인 상태를 확인 중인 동안 표시할 UI
  }

  return (
    <Router
      basename={
        process.env.NODE_ENV === "production" ? "/Netflix_cloneCoding" : "/"
      }
    >
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      {isPopupVisible && <SignInPopup onClose={handleClosePopup} />}
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <HomePage /> : <Navigate to="/signUp" />}
        />
        <Route
          path="/popular"
          element={isLoggedIn ? <PopularPage /> : <Navigate to="/signUp" />}
        />
        <Route
          path="/search"
          element={isLoggedIn ? <SearchPage /> : <Navigate to="/signUp" />}
        />
        <Route
          path="/wishlist"
          element={isLoggedIn ? <WishlistPage /> : <Navigate to="/signUp" />}
        />
        <Route
          path="/signUp"
          element={
            isLoggedIn ? (
              <Navigate to="/" />
            ) : (
              <SignUpPage onShowPopup={handleShowPopup} />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
