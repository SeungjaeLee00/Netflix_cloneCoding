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
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const basename =
    process.env.NODE_ENV === "production" ? "/Netflix_cloneCoding" : "/";

  // 로그인 상태 확인
  useEffect(() => {
    // const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setIsPopupVisible(!loggedIn); // 로그아웃 상태면 팝업 표시
  }, []);

  // 팝업 닫기 처리
  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const handleShowPopup = () => {
    setIsPopupVisible(true);
  };

  const handleLogin = () => {
    // localStorage.setItem("isLoggedIn", true);
    sessionStorage.setItem("isLoggedIn", true);
    setIsLoggedIn(true);
    setIsPopupVisible(false); // 팝업 닫기
  };

  // 로그아웃 처리
  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    // localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setIsPopupVisible(true); // 로그아웃 후 팝업 다시 표시
  };

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // 로그인 상태 확인 중 로딩 UI
  }

  return (
    <Router basename={basename}>
      <Header onLogout={handleLogout} isLoggedIn={isLoggedIn} />
      {isPopupVisible && (
        <SignInPopup onClose={handleClosePopup} onLogin={handleLogin} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/main" /> : <Navigate to="/signUp" />
          }
        />
        <Route
          path="/main"
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
              <Navigate to="/main" />
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
