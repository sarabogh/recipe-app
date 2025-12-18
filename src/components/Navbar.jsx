import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ currentUser, onLogout }) {
  const location = useLocation();

  const linkClass = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <nav>
      <Link to="/" className="logo">
        <span className="logo-heart">🤍</span>
        Taste of Home
      </Link>

      <div className="nav-links">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/search" className={linkClass("/search")}>Search</Link>
        {currentUser && (
          <Link to="/favorites" className={linkClass("/favorites")}>
            Favorites
          </Link>
        )}
        {currentUser ? (
          <Link to="/login" onClick={onLogout}>Logout</Link>
        ) : (
          <Link to="/login" className={linkClass("/login")}>Login</Link>
        )}
      </div>
    </nav>
  );
}
