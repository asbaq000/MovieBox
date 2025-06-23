import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authActions";
import "../assets/css/components/NavBar.css";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MovieBox</Link>
      </div>
      <div className="navbar-search">
        <SearchBar />
      </div>
      <div className="navbar-links">
        {userInfo ? (
          <>
            <Link to="/watchlist">My Lists</Link>
            <Link to="/profile">Profile</Link>
            <a href="#!" onClick={logoutHandler}>
              Logout
            </a>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
