import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import "../assets/css/pages/Auth.css";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resettoken } = useParams();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setMessage("");
    try {
      await api.put(`/auth/resetpassword/${resettoken}`, { password });
      setMessage("Password reset successfully! You can now log in.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError("Invalid or expired token. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form onSubmit={submitHandler}>
          <h2>Reset Password</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-control">
            <input
              type="password"
              required
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              required
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Set New Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
