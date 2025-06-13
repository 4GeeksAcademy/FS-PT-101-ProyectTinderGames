// Profile.jsx
// Componente de perfil de usuario con edición, selección de avatar, medallas de juego y sección de comentarios

import React, { useEffect, useState } from "react";
import "../../pages/Privateviews/Profile.css";                                // Estilos específicos de la vista de perfil

// Hooks y servicios
import useGlobalReducer from "../../hooks/useGlobalReducer";                  // Hook para acceder al store global y dispatch
import userServices from "../../services/userServices.js";                   // Servicios relacionados con usuario (fetch, update)
import reviewServices from "../../services/reviewServices.js";               // Servicios para gestión de reviews (comentarios)

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
  const { store, dispatch } = useGlobalReducer();
  const url = import.meta.env.VITE_BACKEND_URL;   // URL base del backend

  // ---------- ESTADOS LOCALES ----------
  // Control de pestañas: "info", "activity", "comments"
  const [activeTab, setActiveTab] = useState("info");
  // Modo edición: true = muestra inputs, false = muestra datos
  const [isEditing, setIsEditing] = useState(false);
  // Control de visibilidad del modal de selección de avatar
  const [showModal, setShowModal] = useState(false);

  // Estado del perfil en edición o carga inicial
  const initialProfile = {
    name: "", nick_name: "", age: 0,
    gender: "", location: "", zodiac: "Leo",
    discord: "", steam_id: "", language: "",
    preferences: "", bio: "", photo: "photo1",
  };
  const [profile, setProfile] = useState(initialProfile);

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
    .slice()                                         // Copia para no mutar original
    .sort((a, b) => (b.hours_played ?? 0) - (a.hours_played ?? 0))
    .slice(0, 3);

  // Mapeo avatars: filename -> clave interna
  const picMap = {
    "profile-pic-1.png": "photo1", "profile-pic-2.png": "photo2",
    "profile-pic-3.png": "photo3", "profile-pic-4.png": "photo4",
    "profile-pic-5.png": "photo5", "profile-pic-6.png": "photo6",
    "profile-pic-7.png": "photo7", "profile-pic-8.png": "photo8",
    "profile-pic-9.png": "photo9"
  };
  // Import de assets en objeto para selección dinámica
  const photoAssets = { photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9 };

  // ---------- EFFECTS ----------
  // Carga inicial de perfil y reviews recibidos
  useEffect(() => {
    loadProfile();
    reviewServices.getAllReviewsReceived(store.user?.id)
      .then(data => dispatch({ type: "matchReviewsReceived", payload: data }));
  }, []);

  // ---------- FUNCIONES AUXILIARES ----------
  /**
   * Carga el perfil desde el backend y actualiza estado local
   */
  const loadProfile = async () => {
    if (!store.user.profile) return console.log("no profile yet");
    try {
      const resp = await fetch(`${url}/api/profiles/${store.user.profile.id}`);
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
        photo: datos.photo || 'photo1'
      });
    } catch (error) {
      console.error('Error en loadProfile:', error);
    }
  };

  /**
   * @param {string} fileName - Nombre de archivo de la imagen seleccionada
   * Cambia avatar en backend y estado local
   */
  const handlePicChange = async (fileName) => {
    const newPhotoKey = picMap[fileName] || 'photo1';
    try {
      // Actualiza en backend usando el ID de usuario (no profile.id)
      await userServices.changeUserPhoto(store.user.id, { photo: newPhotoKey });
      // Actualiza estado local para reflejar cambio instantáneo
      setProfile(prev => ({ ...prev, photo: newPhotoKey }));
      // Refresca info global del usuario en store
      const data = await userServices.getUserInfo();
      dispatch({ type: 'getUserInfo', payload: data.user });
    } catch (err) {
      console.error('Error al cambiar foto:', err);
    } finally {
      setShowModal(false);
    }
  };

  /**
   * @returns {string} - Ruta de la imagen seleccionada a mostrar
   */
  const selectPhoto = () => photoAssets[profile.photo] || photo1;

  /**
   * @param {number|string} hours - Horas jugadas
   * @returns {string} - Asset de la medalla según horas
   */
  const selectMedal = (hours) => {
    const h = parseInt(hours, 10) || 0;
    if (h >= 2500) return goldMedal;
    if (h >= 500) return silverMedal;
    return bronzeMedal;
  };

  /**
   * Gestiona la lógica de crear o guardar perfil
   */
  const updateProfile = async () => {
    if (isEditing) {
      const method = store.user.profile ? 'PUT' : 'POST';
      const endpoint = store.user.profile
        ? `${url}/api/profiles/${store.user.profile.id}`
        : `${url}/api/profiles/${store.user.id}`;
      try {
        const resp = await fetch(endpoint, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
        });
        if (!resp.ok) throw new Error('Error al guardar perfil');
        const result = await resp.json();
        // Tras crear perfil, actualizar store con nuevo profile.id
        if (method === 'POST') {
          userServices.getUserInfo()
            .then(data => dispatch({ type: 'getUserInfo', payload: data.user }));
        }
      } catch (err) {
        console.error('Error en updateProfile:', err);
      }
    }
    setIsEditing(!isEditing);
  };

  /**
   * @param {string} field - Propiedad de profile a actualizar
   * @param {any} value - Nuevo valor
   */
  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // ---------- RENDERIZADO ----------
  return (
    <div className="profile-container">
      {/* ==== PANEL IZQUIERDO: Avatar + Medallas ==== */}
      <div className="left-panel">
        {/* Sección de avatar con botón de engranaje */}
        <div className="avatar-section">
          <button className="gear-btn" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-gear"></i>
          </button>
          <img src={selectPhoto()} alt="Avatar" className="profile-avatar" />
        </div>
        <h2>{profile.nick_name}</h2>
        <p className="location">{profile.location}</p>

        {/* Medallas de los 3 juegos top */}
        <div className="medal-list">
          {topThreeGames.map((e, i) => {
            const hrs = e.game?.hours_played;
            const title = e.game?.title || `Game ${i + 1}`;
            return (
              <div key={e.game?.id || i} className="medal-game-card">
                <img
                  src={selectMedal(hrs)}
                  alt={`${title} Medal`}
                  className="medal-icon"
                  role="button"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus"
                  data-bs-content={`${title} — ${hrs}h`}
                />
                <div className="game-img-wrapper w-100">
                  <h5 className="m-0 p-2">{title}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ==== PANEL DERECHO: Bio, Tabs e Info ==== */}
      <div className="right-panel">
        {/* Bio editable */}
        <div className="bio-box">
          {isEditing
            ? <textarea
              className="form-control textareastyle"
              rows={3}
              value={profile.bio}
              onChange={e => handleInputChange('bio', e.target.value)}
            />
            : <p>{profile.bio}</p>
          }
        </div>

        {/* Navegación de pestañas */}
        <div className="tabs">
          {['info', 'activity', 'comments'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
          ))}
        </div>

        {/* Contenido de la pestaña Info */}
        {activeTab === 'info' && (
          <div className="info-section container">
            {/* Nombre y Nickname */}
            <div className="row">
              {['name', 'nick_name'].map((f, i) => (
                <div key={i} className="col-md-6">
                  <label>{f === 'nick_name' ? 'Nickname' : 'Name'}</label>
                  {isEditing
                    ? <input
                      type="text"
                      value={profile[f]}
                      onChange={e => handleInputChange(f, e.target.value)}
                    />
                    : <p>{profile[f]}</p>
                  }
                </div>
              ))}
            </div>
            {/* Age, Gender, Zodiac */}
            <div className="row">
              {/* Age */}
              <div className="col-md-4">
                <label>Age</label>
                {isEditing
                  ? <input
                    type="number"
                    value={profile.age}
                    onChange={e => handleInputChange('age', +e.target.value)}
                  />
                  : <p>{profile.age}</p>
                }
              </div>
              {/* Gender */}
              <div className="col-md-4">
                <label>Gender</label>
                {isEditing
                  ? <select
                    value={profile.gender}
                    onChange={e => handleInputChange('gender', e.target.value)}
                  >
                    {genders.map((g, i) => <option key={i}>{g}</option>)}
                  </select>
                  : <p>{profile.gender}</p>
                }
              </div>
              {/* Zodiac */}
              <div className="col-md-4">
                <label>Zodiac</label>
                {isEditing
                  ? <select
                    value={profile.zodiac}
                    onChange={e => handleInputChange('zodiac', e.target.value)}
                  >
                    {zodiacSigns.map((z, i) => <option key={i}>{z}</option>)}
                  </select>
                  : <p>{profile.zodiac}</p>
                }
              </div>
            </div>
            {/* Contacto y preferencias */}
            <div className="row">
              {['discord', 'steam_id'].map((f, i) => (
                <div key={i} className="col-md-6">
                  <label>{f === 'steam_id' ? 'Steam Friend ID' : 'Discord'}</label>
                  {isEditing
                    ? <input
                      type="text"
                      value={profile[f]}
                      onChange={e => handleInputChange(f, e.target.value)}
                    />
                    : <p>{profile[f]}</p>
                  }
                </div>
              ))}
              {/* Gaming Preferences */}
              <div className="gaming-prefs-box col-md-6">
                <label>Gaming Preferences</label>
                {isEditing
                  ? <textarea
                    rows={3}
                    value={profile.preferences}
                    onChange={e => handleInputChange('preferences', e.target.value)}
                  />
                  : <p><strong>I'm looking for:</strong> {profile.preferences}</p>
                }
              </div>
              {/* Location */}
              <div className="col-md-6">
                <label>Location</label>
                {isEditing
                  ? <input
                    type="text"
                    value={profile.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                  />
                  : <p>{profile.location}</p>
                }
              </div>
            </div>
            {/* Botón Save/Edit */}
            <div className="row mt-3">
              <div className="col text-left">
                <button className="edit-btn" onClick={updateProfile}>
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pestaña Activity */}
        {activeTab === 'activity' && (
          <div className="coming-soon-box">
            <h3>Coming soon...</h3>
            <p>Esta sección está en construcción. ¡Pronto novedades!</p>
          </div>
        )}

        {/* Pestaña Comments */}
        {activeTab === 'comments' && (
          <div className="info-section container">
            <div className="row justify-content-around">
              <h3 className="col-1 m-2 mb-4">Comments</h3>
              <div className="col-auto m-2 mb-4"></div>
            </div>
            <div className="row">
              {store.matchReviewsReceived.reviews_received.length > 0
                ? store.matchReviewsReceived.reviews_received.map(el => (
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
                : <p>No comments yet.</p>
              }
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
