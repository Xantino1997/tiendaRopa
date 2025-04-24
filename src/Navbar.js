import React from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import "./App.css";

const Navbar = ({ seasonStyles, displayedSeason, isMenuOpen, setIsMenuOpen, isAuthenticated }) => (
  <nav className={`navbar ${seasonStyles[displayedSeason]}`}>
    <Link to="/">Tienda Online</Link>
    <div className={`menu ${isMenuOpen ? "open" : ""}`}>
      <Link to="/tienda" onClick={() => setIsMenuOpen(false)}>Tienda</Link>
      <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
      {isAuthenticated && <Link to="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
    </div>
    <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
      {isMenuOpen ? <FiX /> : <FiMenu />}
    </button>
  </nav>
);

export default Navbar;
