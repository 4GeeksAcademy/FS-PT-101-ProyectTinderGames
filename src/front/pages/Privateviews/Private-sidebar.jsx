import "./private-sidebar.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import profileicon from "../../assets/img/icons/icon-profile.png";
import searchicon from "../../assets/img/icons/icon-search-a-mate.png";
import matchicon from "../../assets/img/icons/icon-your-mates.png";
import findicon from "../../assets/img/icons/icon-find-games.png";
import settingsicon from "../../assets/img/icons/icon-settings.png";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburguesa de resoluciones pequeñas... */}
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <div className={`sidebar ${open ? "open" : ""}`}>
        <Link to="/profile" className="sidebar-button" onClick={() => setOpen(false)}>
          <span className="sidebar-icon">{<img className="Privateicons" src={profileicon} alt="profileicon" />}</span>
          <span className="sidebar-text">Profile</span>
        </Link>
        <Link to="/search-a-mate" className="sidebar-button" onClick={() => setOpen(false)}>
          <span className="sidebar-icon">{<img className="Privateicons" src={searchicon} alt="profileicon" />}</span>
          <span className="sidebar-text">Search a mate</span>
        </Link>
        <Link to="/your-matches" className="sidebar-button" onClick={() => setOpen(false)}>
          <span className="sidebar-icon">{<img className="Privateicons" src={matchicon} alt="profileicon" />}</span>
          <span className="sidebar-text">Your matches</span>
        </Link>
        <Link to="/find-games" className="sidebar-button" onClick={() => setOpen(false)}>
          <span className="sidebar-icon">{<img className="Privateicons" src={findicon} alt="profileicon" />}</span>
          <span className="sidebar-text">Find games</span>
        </Link>
        <Link to="/settings" className="sidebar-button" onClick={() => setOpen(false)}>
          <span className="sidebar-icon">{<img className="Privateicons" src={settingsicon} alt="profileicon" />}</span>
          <span className="sidebar-text">Settings</span>
        </Link>
      </div>
    </>
  );
};
