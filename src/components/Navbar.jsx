import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useScrollHeader } from "../hooks/useScrollHeader";
import { HOTEL_CONFIG } from "../data/hotelConfig";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { scrolled } = useScrollHeader(isHomePage);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleNavClick = (anchorId) => {
    closeMenu();
    if (isHomePage) {
      const el = document.getElementById(anchorId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <h2>{HOTEL_CONFIG.name}</h2>
            <span>{HOTEL_CONFIG.tagline}</span>
          </Link>
        </div>

        <button
          className="menu-toggle"
          id="menuToggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <i className={menuOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars"}></i>
        </button>

        <nav id="menu" className={menuOpen ? "active" : ""}>
          <ul>
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={() => handleNavClick("home")}
              >
                Home
              </NavLink>
            </li>

            <li>
              {isHomePage ? (
                <a
                  href="#rooms"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("rooms");
                  }}
                >
                  Rooms
                </a>
              ) : (
                <Link to="/#rooms" className="nav-link" onClick={closeMenu}>
                  Rooms
                </Link>
              )}
            </li>

            <li>
              {isHomePage ? (
                <a
                  href="#amenities"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("amenities");
                  }}
                >
                  Amenities
                </a>
              ) : (
                <Link to="/#amenities" className="nav-link" onClick={closeMenu}>
                  Amenities
                </Link>
              )}
            </li>

            <li>
              {isHomePage ? (
                <a
                  href="#gallery"
                  className="nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("gallery");
                  }}
                >
                  Gallery
                </a>
              ) : (
                <Link to="/#gallery" className="nav-link" onClick={closeMenu}>
                  Gallery
                </Link>
              )}
            </li>

            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
                onClick={closeMenu}
              >
                Contact
              </NavLink>
            </li>

            <li>
              <Link className="book-btn" to="/booking" onClick={closeMenu}>
                Book Now
              </Link>
            </li>

            <li>
              <button
                id="darkMode"
                className="dark-btn"
                aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                onClick={toggleTheme}
                type="button"
              >
                <i className={isDark ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
                <span>{isDark ? "Light" : "Dark"}</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
