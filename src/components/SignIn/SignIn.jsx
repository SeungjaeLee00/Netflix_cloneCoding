import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { AuthService } from "../../util/auth/auth.service";
import "./sign-in.css";

const SignIn = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const history = useHistory();
  const authService = new AuthService();

  const isLoginFormValid = email && password;
  const isRegisterFormValid =
    registerEmail &&
    registerPassword &&
    confirmPassword &&
    registerPassword === confirmPassword &&
    acceptTerms;

  const toggleCard = () => {
    setIsLoginVisible(!isLoginVisible);
    setTimeout(() => {
      const registerElement = document.getElementById("register");
      const loginElement = document.getElementById("login");
      if (registerElement) registerElement.classList.toggle("register-swap");
      if (loginElement) loginElement.classList.toggle("login-swap");
    }, 50);
  };

  const focusInput = (inputName) => {
    setFocusedField(inputName);
  };

  const blurInput = () => {
    setFocusedField(null);
  };

  const handleLogin = () => {
    authService
      .tryLogin(email, password)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        alert("Login failed");
      });
  };

  const handleRegister = () => {
    authService
      .tryRegister(registerEmail, registerPassword)
      .then(() => {
        toggleCard();
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <div className="bg-image">
      <div className="container">
        <div id="phone">
          <div id="content-wrapper">
            <div
              className={`card ${isLoginVisible ? "" : "hidden"}`}
              id="login"
            >
              <h1>Sign In</h1>
              <form>
                <div className="input">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => focusInput("email")}
                    onBlur={blurInput}
                  />
                  <label
                    className={focusedField === "email" ? "label-active" : ""}
                  >
                    Email
                  </label>
                </div>
                <div className="input">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => focusInput("password")}
                    onBlur={blurInput}
                  />
                  <label
                    className={
                      focusedField === "password" ? "label-active" : ""
                    }
                  >
                    Password
                  </label>
                </div>
                <button
                  type="button"
                  disabled={!isLoginFormValid}
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>

            <div
              className={`card ${isLoginVisible ? "hidden" : ""}`}
              id="register"
            >
              <h1>Sign Up</h1>
              <form>
                <div className="input">
                  <input
                    type="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    onFocus={() => focusInput("registerEmail")}
                    onBlur={blurInput}
                  />
                  <label
                    className={
                      focusedField === "registerEmail" ? "label-active" : ""
                    }
                  >
                    Email
                  </label>
                </div>
                <div className="input">
                  <input
                    type="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    onFocus={() => focusInput("registerPassword")}
                    onBlur={blurInput}
                  />
                  <label
                    className={
                      focusedField === "registerPassword" ? "label-active" : ""
                    }
                  >
                    Password
                  </label>
                </div>
                <div className="input">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onFocus={() => focusInput("confirmPassword")}
                    onBlur={blurInput}
                  />
                  <label
                    className={
                      focusedField === "confirmPassword" ? "label-active" : ""
                    }
                  >
                    Confirm Password
                  </label>
                </div>
                <div className="checkbox">
                  <input
                    type="checkbox"
                    checked={acceptTerms}
                    onChange={() => setAcceptTerms(!acceptTerms)}
                  />
                  <label>I accept the terms and conditions</label>
                </div>
                <button
                  type="button"
                  disabled={!isRegisterFormValid}
                  onClick={handleRegister}
                >
                  Register
                </button>
              </form>
            </div>

            <div className="account-check" id="accountCheck">
              <span>
                Already have an account?{" "}
                <a href="#" onClick={toggleCard}>
                  Login
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
