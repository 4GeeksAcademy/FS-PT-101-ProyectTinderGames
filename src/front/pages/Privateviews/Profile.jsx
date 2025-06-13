// Profile.jsx
// Componente de perfil de usuario con edición, selección de avatar, medallas de juego y sección de comentarios

import React, { useEffect, useState } from "react";
import "../../pages/Privateviews/Profile.css";                                // Estilos específicos de la vista de perfil

// Hooks y servicios
import useGlobalReducer from "../../hooks/useGlobalReducer";                  // Hook para acceder al store global y dispatch
import userServices from "../../services/userServices.js";                   // Servicios relacionados con usuario (fetch, update)
import reviewServices from "../../services/reviewServices.js";               // Servicios para gestión de reviews (comentarios)
import gameServices from "../../services/gameServices.js"

// Assets - Medallas de juego
import goldMedal from "../../assets/img/medals/gold-medal.png";
import silverMedal from "../../assets/img/medals/silver-medal.png";
import bronzeMedal from "../../assets/img/medals/bronze-medal.png";

// Assets - Avatares de perfil
import photo1 from "../../assets/img/profile-pics/profile-pic-1.png";
import photo2 from "../../assets/img/profile-pics/profile-pic-2.png";
import photo3 from "../../assets/img/profile-pics/profile-pic-3.png";
import photo4 from "../../assets/img/profile-pics/profile-pic-4.png";
import photo5 from "../../assets/img/profile-pics/profile-pic-5.png";
import photo6 from "../../assets/img/profile-pics/profile-pic-6.png";
import photo7 from "../../assets/img/profile-pics/profile-pic-7.png";
import photo8 from "../../assets/img/profile-pics/profile-pic-8.png";
import photo9 from "../../assets/img/profile-pics/profile-pic-9.png";

const Profile = () => {
  // Acceso al store global y dispatch para actualizar datos
  const [availableGames, setAvailableGames] = useState([]);
  const [game, setGame] = useState({ title: '', hours_played: '' });
  const [loading, setLoading] = useState(true);
  const { store, dispatch } = useGlobalReducer();
  const url = import.meta.env.VITE_BACKEND_URL;   // URL base del backend

  // Estados locales
  const [activeTab, setActiveTab] = useState("info");                    // Pestaña activa (info, activity, comments)
  const [isEditing, setIsEditing] = useState(false);                       // Modo edición on/off
  const [showModal, setShowModal] = useState(false);                       // Mostrar modal de avatar
  const [profile, setProfile] = useState({ photo: "photo1" });            // Estado local de perfil

  // Opciones para selects
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const genders = ["Male", "Female", "Undefined"];

  // Juegos del usuario y top 3 por horas jugadas
  const allGames = store.user?.profile?.games ?? [];
  const topThreeGames = allGames
    .slice() // Copia para no mutar original
    .sort((a, b) => (b.hours_played ?? 0) - (a.hours_played ?? 0))
    .slice(0, 3);

  // Mapeo avatars: filename -> clave interna
  const picMap = {
    "profile-pic-1.png": "photo1",
    "profile-pic-2.png": "photo2",
    "profile-pic-3.png": "photo3",
    "profile-pic-4.png": "photo4",
    "profile-pic-5.png": "photo5",
    "profile-pic-6.png": "photo6",
    "profile-pic-7.png": "photo7",
    "profile-pic-8.png": "photo8",
    "profile-pic-9.png": "photo9",
  };
  const photoAssets = { photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9 };

  // Carga inicial de perfil y reviews recibidos
  useEffect(() => {
    loadProfile();
    reviewServices.getAllReviewsReceived(store.user?.id)
      .then(data => dispatch({ type: "matchReviewsReceived", payload: data }));
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const pageSize = 40; // max permitido por petición
      const pages = 25;    // para aproximarnos a ~1000 títulos
      let allGames = [];

      for (let page = 1; page <= pages; page++) {
        const resp = await fetch(
          `https://api.rawg.io/api/games?key=${import.meta.env.VITE_RAWG_KEY}&page_size=${pageSize}&page=${page}`
        );
        if (!resp.ok) throw new Error('Error cargando juegos');
        const data = await resp.json();
        allGames = allGames.concat(data.results.map((g) => g.name));
      }
      setAvailableGames(allGames);
    } catch (err) {
      console.error('RAWG fetch error:', err);
    } finally {
      setLoading(false);
      userServices.getUserInfo().then(data => dispatch({ type: 'getUserInfo', payload: data.user }))
    }
  };

  // Cargar perfil desde backend
  const loadProfile = async () => {
    userServices.getUserInfo().then(data => dispatch({ type: 'getUserInfo', payload: data.user }))
    if (!store.user.profile) return;
    try {
      const resp = await fetch(`${url}/api/profiles/${store.user.profile?.id}`);
      if (!resp.ok) throw new Error('Error al cargar datos');
      const datos = await resp.json();
      setProfile({
        name: datos.name,
        nick_name: datos.nick_name,
        age: datos.age,
        gender: datos.gender,
        location: datos.location,
        zodiac: datos.zodiac,
        discord: datos.discord,
        steam_id: datos.steam,
        language: datos.language,
        preferences: datos.preferences,
        bio: datos.bio,
        photo: datos.photo || 'photo1',
      });
    } catch (error) {
      console.error('Error en loadProfile:', error);
    }
  };

  // Cambiar avatar en backend y estado local
  const handlePicChange = async (fileName) => {
    const newKey = picMap[fileName] || 'photo1';
    try {
      await userServices.changeUserPhoto(store.user.id, { photo: newKey });
      setProfile(prev => ({ ...prev, photo: newKey }));
    } catch (err) {
      console.error('Error al cambiar foto:', err);
    } finally {
      setShowModal(false);
    }
  };

  // Seleccionar asset de avatar
  const selectPhoto = () => photoAssets[profile.photo] || photo1;

  // Seleccionar medalla según horas
  const selectMedal = (hours) => {
    const h = parseInt(hours, 10) || 0;
    if (h >= 2500) return goldMedal;
    if (h >= 500) return silverMedal;
    return bronzeMedal;
  };

  // Crear o actualizar perfil
  const updateProfile = async () => {
    if (isEditing) {
      if (store.user.profile) {
        try {
          const resp = await fetch(url + `/api/profiles/${store.user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
          });
          if (!resp.ok) throw new Error('Error al guardar perfil');
          const result = await resp.json();
        } catch (err) {
          console.error('Error en updateProfile:', err);
        }
        loadProfile();
      } else {
        try {
          const resp = await fetch(url + `/api/profiles/${store.user?.id}`, {
            methods: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(profile),
          });
          if (!resp.ok) throw new Error('Error al guardar perfil');
          const result = await resp.json();
        } catch (err) {
          console.error('Error en updateProfile:', err);
        }
        loadProfile();
      }
    }

    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setGame((prev) => ({
      ...prev,
      [id === 'gameName' ? 'title' : 'hours_played']: value,
    }));
  };

  // Manejar cambios en inputs
  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAdd = async () => {
    try {
      // 1) esperamos a que el juego se posteé en el backend
      await gameServices.postNewGame(store.user.profile?.id, game);

      // 2) recargamos el perfil UNA VEZ que ya está guardado
      await loadProfile();

      // 3) cerramos el modal
      const modalEl = document.getElementById('commentModal');
      const modal = window.bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      console.log('Game added and profile reloaded:', game);
      setGame({ title: '', hours_played: '' });
    } catch (err) {
      console.error('Error añadiendo el juego o recargando perfil:', err);
      // aquí podrías mostrar un toast o mensaje de error al usuario
    }
  };

  const handleDeleteGame = async (game_id) => {
    await gameServices.deleteGameById(game_id);
    await loadProfile();
  }


  return (
    <div className="profile-container">
      {/* PANEL IZQUIERDO: Avatar y Medallas */}
      <div className="left-panel">
        <div className="avatar-section">
          <button className="gear-btn" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-gear"></i>
          </button>
          <img src={selectPhoto()} alt="Avatar" className="profile-avatar" />
        </div>
        <h2>{profile.nick_name}</h2>
        <p className="location">{profile.location}</p>
        <div className="medal-list">
          {topThreeGames.map((el, i) => (
            <div key={el.game?.id || i} className="medal-game-card">
              <img
                src={selectMedal(el.game?.hours_played)}
                alt="Medal"
                className="medal-icon"
              />
              <div className="game-img-wrapper w-100">
                <h5 className="m-0 p-2">{el.game?.title}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PANEL DERECHO: Bio, Tabs e Info */}
      <div className="right-panel">
        <div className="bio-box">
          {isEditing ? (
            <textarea
              className="form-control textareastyle"
              rows={3}
              value={profile.bio}
              onChange={e => handleInputChange('bio', e.target.value)}
            />
          ) : (
            <p>{profile.bio}</p>
          )}
        </div>
        <div className="tabs">
          {['info', 'Games', 'comments'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
          ))}
        </div>
        {activeTab === 'info' && (
          <div className="info-section container">
            {/* Nombre y Nickname */}
            <div className="row">
              {['name', 'nick_name'].map((f, i) => (
                <div key={i} className="col-md-6">
                  <label>{f === 'nick_name' ? 'Nickname' : 'Name'}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile[f]}
                      onChange={e => handleInputChange(f, e.target.value)}
                    />
                  ) : (
                    <p>{profile[f]}</p>
                  )}
                </div>
              ))}
            </div>
            {/* Age, Gender, Zodiac */}
            <div className="row">
              <div className="col-md-4">
                <label>Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age}
                    onChange={e => handleInputChange('age', +e.target.value)}
                  />
                ) : (
                  <p>{profile.age}</p>
                )}
              </div>
              <div className="col-md-4">
                <label>Gender</label>
                {isEditing ? (
                  <select
                    value={profile.gender}
                    onChange={e => handleInputChange('gender', e.target.value)}
                  >
                    {genders.map((g, idx) => <option key={idx}>{g}</option>)}
                  </select>
                ) : (
                  <p>{profile.gender}</p>
                )}
              </div>
              <div className="col-md-4">
                <label>Zodiac</label>
                {isEditing ? (
                  <select
                    value={profile.zodiac}
                    onChange={e => handleInputChange('zodiac', e.target.value)}
                  >
                    {zodiacSigns.map((z, idx) => <option key={idx}>{z}</option>)}
                  </select>
                ) : (
                  <p>{profile.zodiac}</p>
                )}
              </div>
            </div>
            {/* Contacto y preferencias */}
            <div className="row">
              {['discord', 'steam_id'].map((f, i) => (
                <div key={i} className="col-md-6">
                  <label>{f === 'steam_id' ? 'Steam Friend ID' : 'Discord'}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile[f]}
                      onChange={e => handleInputChange(f, e.target.value)}
                    />
                  ) : (
                    <p>{profile[f]}</p>
                  )}
                </div>
              ))}
              <div className="gaming-prefs-box col-md-6">
                <label>Gaming Preferences</label>
                {isEditing ? (
                  <textarea
                    rows={3}
                    value={profile.preferences}
                    onChange={e => handleInputChange('preferences', e.target.value)}
                  />
                ) : (
                  <p><strong>I'm looking for:</strong> {profile.preferences}</p>
                )}
              </div>
              <div className="col-md-6">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                  />
                ) : (
                  <p>{profile.location}</p>
                )}
              </div>
            </div>
            <div className="row mt-3">
              <div className="col text-left">
                <button className="edit-btn" onClick={updateProfile}>
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'Games' && (
          <div className="container coming-soon-box">
            <div className="row d-flex justify-content-around align-items-center">
              <h2 className="col-lg-6 col-md-12 col-sm-12">Games</h2>
              <button
                type="button"
                className="btn botonLeaveComment col-lg-4 col-md-12 col-sm-12"
                data-bs-toggle="modal"
                data-bs-target="#commentModal"
              >
                Add a new game
              </button>

              <div
                className="modal fade"
                id="commentModal"
                tabIndex="-1"
                aria-labelledby="commentModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="commentModalLabel">
                        Nuevo comentario
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Cerrar"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="mb-3">
                        <label htmlFor="gameName" className="form-label">
                          Selecciona un juego
                        </label>
                        <select
                          id="gameName"
                          className="form-select"
                          value={game.title}
                          onChange={handleChange}
                        >
                          <option value="">-- Elige un juego --</option>
                          {availableGames.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="hoursPlayed" className="form-label">
                          Horas jugadas
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="hoursPlayed"
                          value={game.hours_played}
                          onChange={handleChange}
                          placeholder="Ej. 42"
                          min="0"
                        />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAdd}
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 gap-3 d-flez justify-content-center">
              {store.user?.profile.games && store.user.profile.games.map((el, i) => (
                <div key={i} className="row gamesbox d-flex align-content-center py-3">
                  <div className="d-flex justify-content-around col-lg-10 col-md-12 col-sm-12 align-items-center">
                    <p className="m-0">{el.game.title}</p>
                    <p className="m-0">{el.game.hours_played} hours</p>
                  </div>
                  <div className="d-flex justify-content-around col-lg-2 col-md-12 col-sm-12 align-items-center">
                    <span className="text-danger botonesAccionesJuegos" onClick={()=>handleDeleteGame(el.id)}>D</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'comments' && (
          <div className="info-section container">
            <div className="row justify-content-around">
              <h3 className="col-1 m-2 mb-4">Comments</h3>
              <div className="col-auto m-2 mb-4"></div>
            </div>
            <div className="row">
              {store.matchReviewsReceived.reviews_received.length > 0 ? (
                store.matchReviewsReceived.reviews_received.map(el => (
                  <div key={el.id} className="review-card">
                    <div className="review-container">
                      Author: {el.author_nickname} — {el.stars} ⭐️
                      <p className="m-0 border-0 review-box">
                        <span className="fa-solid fa-comment mx-2"></span>
                        {el.comment}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </div>
          </div>
        )}
      </div>
      {/* Modal de selección de avatar */}
      {showModal && (
        <div className="modal-overlay">
          <div className="avatar-modal">
            <h3>Choose Your Avatar</h3>
            <div className="avatar-grid">
              {Object.keys(picMap).map((file, idx) => (
                <img
                  key={idx}
                  src={`/src/front/assets/img/profile-pics/${file}`}
                  alt={file}
                  className={file === Object.entries(picMap)
                    .find(([, key]) => key === profile.photo)[0]
                    ? 'selected' : ''}
                  onClick={() => handlePicChange(file)}
                />
              ))}
            </div>
            <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
