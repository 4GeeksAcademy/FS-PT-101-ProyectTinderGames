import "./Private-navbar.css";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const PrivateNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setMenuOpen(!menuOpen);
  const closeDropdown = () => setMenuOpen(false);

  // Que se cierre el drop si le damos toque o fuera.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="private-navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo-link">
          <span className="navbar-logo">
            Player<span className="highlight">Link</span>
          </span>
        </Link>
      </div>

      <div className="navbar-right">

        {/* escritorio */}

        <div className="navbar-desktop">
          <img
            src="https://flagcdn.com/us.svg"
            alt="Bandera"
            className="navbar-flag"
          />
          <span className="navbar-username">Username</span>
          <button className="navbar-download">Download</button>
        </div>

        {/* Resoluciones pequeñas. */}

        <div className="navbar-mobile" ref={dropdownRef}>
          <button className="menu-toggle" onClick={toggleDropdown}>
            ☰
          </button>

          {menuOpen && (
            <div className="dropdown-menu-custom">
              <img
                src="https://flagcdn.com/us.svg"
                alt="Bandera"
                className="navbar-flag"
                onClick={closeDropdown}
              />
              <span className="navbar-username" onClick={closeDropdown}>
                Username
              </span>
              <button className="navbar-download" onClick={closeDropdown}>
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
