import React, { useState } from "react";
import api from "../api";
import "../assets/css/pages/Auth.css";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await api.post("/auth/forgotpassword", { email });
      setMessage(
        "Password reset email sent. Please check your inbox (and spam folder)."
      );
    } catch (err) {
      setError("Failed to send email. Please check the address and try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-wrapper">
        <form onSubmit={submitHandler}>
          <h2>Forgot Password</h2>
          <p className="form-text">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-control">
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send Reset Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
