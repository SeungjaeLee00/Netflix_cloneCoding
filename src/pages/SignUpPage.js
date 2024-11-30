import React, { useState } from "react";
import { saveToLocalStorage, getFromLocalStorage } from "../utils/storage";
import "../styles/pages/SignUpPage.css";

const SignUpPage = ({ onShowPopup }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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

    const users = getFromLocalStorage("users") || []; // null인 경우 빈 배열로 처리
    const isEmailUsed = users.some((user) => user.email === email);

    if (isEmailUsed) {
      setError("이미 사용 중인 이메일입니다.");
      return;
    }

    const newUser = { email, password };
    saveToLocalStorage("users", [...users, newUser]);

    alert("회원가입 성공! 로그인 해주세요.");
    onShowPopup();
  };

  return (
    <div className="sign-up-page">
      <h1>회원가입</h1>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChange={handleInputChange}
        />
        {error && <p className="error">{error}</p>}
        <button type="button" onClick={handleSignUp}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
