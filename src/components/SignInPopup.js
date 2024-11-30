import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  initializeUserStorage,
} from "../utils/storage";
import "../styles/components/SignInPopup.css";

const SignInPopup = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false); // true면 회원가입 모드
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializeUserStorage();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const { email, password } = form;
    if (!email || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    const users = getFromLocalStorage("users");
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
      return;
    }

    saveToLocalStorage("isLoggedIn", true);
    if (keepLogin) {
      saveToLocalStorage("keepLogin", true);
    }

    alert("로그인 성공!");
    onClose();
    navigate("/");
  };

  const handleSignUp = () => {
    const { email, password, confirmPassword } = form;
    if (!email || !password || !confirmPassword) {
      setError("모든 필드를 입력해주세요.");
      return;
    }
    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 유저 데이터 가져오기
    const users = getFromLocalStorage("users");
    const isEmailUsed = users.some((user) => user.email === email);

    if (isEmailUsed) {
      setError("이미 사용 중인 이메일입니다.");
      return;
    }

    // 새로운 유저 추가
    const newUser = { email, password };
    saveToLocalStorage("users", [...users, newUser]);

    alert("회원가입 성공! 로그인 해주세요.");
    setIsSignUp(false); // 로그인 화면으로 전환
    setForm({ email: "", password: "", confirmPassword: "" });
  };

  const handleSignUpRedirect = () => {
    navigate("/signUp");
    onClose(); // 팝업 닫기
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h1>{isSignUp ? "회원가입" : "로그인"}</h1>
        <form>
          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={handleInputChange}
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              value={form.confirmPassword}
              onChange={handleInputChange}
            />
          )}
          {error && <p className="error">{error}</p>}
          {isSignUp ? (
            <button type="button" onClick={handleSignUp}>
              회원가입
            </button>
          ) : (
            <>
              <label>
                <input
                  type="checkbox"
                  checked={keepLogin}
                  onChange={() => setKeepLogin(!keepLogin)}
                />
                로그인 유지
              </label>
              <button type="button" onClick={handleLogin}>
                로그인
              </button>
            </>
          )}
        </form>
        <button type="button" onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? "이미 계정이 있나요? 로그인" : "계정이 없나요? 회원가입"}
        </button>
        <button className="signUp-btn" onClick={handleSignUpRedirect}>
          회원가입 페이지로 이동
        </button>
      </div>
    </div>
  );
};

export default SignInPopup;
