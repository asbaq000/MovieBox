import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, register } from "../redux/actions/authActions";
import Spinner from "../components/Spinner";
import "../assets/css/pages/Auth.css";

const EyeIcon = ({ size = 20, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const { loading, error: reduxError, userInfo } = auth;

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLocalError("");
    if (!isLogin && password !== confirmPassword) {
      setLocalError("Passwords do not match!");
      return;
    }

    if (isLogin) {
      dispatch(login(email, password));
    } else {
      dispatch(register(name, email, password));
    }
  };

  const switchModeHandler = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setLocalError("");
    dispatch({ type: "AUTH_CLEAR_ERROR" });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form onSubmit={submitHandler}>
          <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>

          {loading && <Spinner />}
          {localError && <div className="alert alert-danger">{localError}</div>}
          {reduxError && !localError && (
            <div className="alert alert-danger">{reduxError}</div>
          )}

          {!isLogin && (
            <div className="form-control">
              <input
                type="text"
                required
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="form-control">
            <input
              type="email"
              required
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              required
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeIcon
              className="password-icon"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {!isLogin && (
            <div className="form-control password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                required
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <EyeIcon
                className="password-icon"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          )}

          {isLogin && (
            <div className="forgot-password-link">
              <Link to="/forgotpassword">Forgot Password?</Link>
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {isLogin ? "Sign In" : "Sign Up"}
          </button>

          <div className="switch-mode">
            <p>
              {isLogin ? "New to MovieBox?" : "Have an account?"}
              <span onClick={switchModeHandler}>
                {isLogin ? " Sign Up Now" : " Sign In"}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
