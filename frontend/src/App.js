// src/App.js
import React from "react";
// Use Routes instead of Switch
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import WatchlistPage from "./pages/WatchlistPage";
import Notification from "./components/Notification";
import SearchResultsPage from "./pages/SearchResultsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Notification />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/search/:keyword" element={<SearchResultsPage />} />
            <Route path="/forgotpassword" element={<ForgotPasswordPage />} />
            <Route
              path="/resetpassword/:resettoken"
              element={<ResetPasswordPage />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
