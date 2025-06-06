// MatchMiniCard.jsx
import React, { useEffect, useState } from 'react';
import './matchMiniCard.css';
import goldMedal from "../assets/img/medals/gold-medal.png";
import silverMedal from "../assets/img/medals/silver-medal.png";
import bronzeMedal from "../assets/img/medals/bronze-medal.png";
import { useNavigate } from 'react-router-dom';

export const MatchMiniCard = ({ id, nickname, gender, games }) => {
  useEffect(() => {
    // Selecciona todas las imágenes con data-bs-toggle="popover" y crea un Popover de Bootstrap para cada una
    document
      .querySelectorAll('[data-bs-toggle="popover"]')
      .forEach((el) => {
        // eslint-disable-next-line no-new
        new bootstrap.Popover(el);
      });
  }, []); // Se ejecuta solo al montar

  const [showModal, setShowModal] = useState(false)
  const navigate = useNavigate();

  // Dentro del componente (antes del return), calcula los 3 juegos con más horas:
  const topThreeGames = games
    ? [...games]
      .sort((a, b) => b.game.hours_played - a.game.hours_played)
      .slice(0, 3)
    : [];

  const selectMedal = (gamehours) => {
    const hours = parseInt(gamehours, 10);
    if (isNaN(hours)) {
      return bronzeMedal;
    }
    if (hours >= 2500) {
      return goldMedal;
    } else if (hours >= 500) {
      return silverMedal;
    } else {
      return bronzeMedal;
    }
  };

  return (
    <>
      <div
        className="match-card card h-100 w-100 matchCardd"
        onClick={()=> navigate(`matchDetails/${id}`)}
      >
        <div className="card-body d-flex flex-column p-3">
          <div className="d-flex align-items-center mb-2">
            <h5 className="card-title text-truncate mb-0">{nickname}</h5>
            <span className="badge text-bg-dark ms-auto">{gender}</span>
          </div>
          <div className="flex-grow-1 overflow-auto align-content-center medalsBox rounded m-2">
            {topThreeGames && topThreeGames.length > 0 ? (
              <div className="d-flex flex-row flex-nowrap justify-content-around">
                {topThreeGames.map((el, index) => (
                  <div key={el.game.id || index}>
                    <img
                      src={selectMedal(el.game.hours_played)}
                      className="img-fluid"
                      style={{ width: '3rem', height: 'auto', cursor: 'pointer' }}
                      alt="Medal"
                      role="button"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover focus"
                      data-bs-container="body"
                      data-bs-placement="bottom"
                      data-bs-content={`${el.game.title} — ${el.game.hours_played} horas`}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-light mb-0">
                <small>Este usuario no tiene juegos</small>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}