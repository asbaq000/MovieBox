import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../assets/css/pages/Profile.css";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const [deletePassword, setDeletePassword] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const changePasswordHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
      const { data } = await api.put("/auth/updatepassword", {
        currentPassword,
        newPassword,
      });

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: "Password updated successfully!",
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to update password.";
      setError(errorMessage);
    }
  };

  const deleteAccountHandler = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      console.log("Deleting account with password:", deletePassword);
    }
  };

  if (!userInfo) return null;

  return (
    <div className="profile-container page-container">
      <h1>My Profile</h1>
      <div className="profile-card">
        <div className="profile-info">
          <div className="info-item">
            <strong>Name:</strong>
            <span>{userInfo.name}</span>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <span>{userInfo.email}</span>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <h2>Change Password</h2>
        <form onSubmit={changePasswordHandler}>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-control">
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Update Password
          </button>
        </form>
      </div>

      <div className="danger-zone">
        <h2>Danger Zone</h2>
        <p>
          Deleting your account is permanent. Please enter your password to
          confirm.
        </p>
        <form onSubmit={deleteAccountHandler} className="delete-form">
          <input
            type="password"
            placeholder="Enter password to delete account"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-delete">
            Delete My Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
