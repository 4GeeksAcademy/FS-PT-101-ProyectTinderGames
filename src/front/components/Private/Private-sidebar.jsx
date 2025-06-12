import "./private-sidebar.css";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import profileicon from "../../assets/img/icons/icon-profile.png";
import searchicon from "../../assets/img/icons/icon-search-a-mate.png";
import matchicon from "../../assets/img/icons/icon-your-mates.png";
import findicon from "../../assets/img/icons/icon-find-games.png";
import settingsicon from "../../assets/img/icons/icon-settings.png";

export const Sidebar = ({ activePath }) => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/private/profile", icon: profileicon, label: "Profile" },
    { to: "/private/search-a-mate", icon: searchicon, label: "Search a mate" },
    { to: "/private/your-matches", icon: matchicon, label: "Your matches" },
    { to: "/private/find-games", icon: findicon, label: "Find games" },
    { to: "/private/settings", icon: settingsicon, label: "Settings" },
  ];

  // useeffect par que no se rompa en resoluciones pequeñas,
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // si se rompe, que no creo, igual esto lo arregla, depende del dispositivo que se use.
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <>
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>☰</button>
      <div className={`sidebar ${open ? "open" : ""}`}>
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-button ${isActive ? "active" : ""}`}
            onClick={() => setOpen(false)}
          >
            <span className="sidebar-icon">
              <img className="Privateicons" src={link.icon} alt={link.label} />
            </span>
            <span className="sidebar-text">{link.label}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
};
