// Profile.jsx
import React, { useEffect, useState } from "react";
import "../../pages/Privateviews/Profile.css";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import userServices from "../../services/userServices.js";
import reviewServices from "../../services/reviewServices.js"

// Import Medals
import goldMedal from "../../assets/img/medals/gold-medal.png";
import silverMedal from "../../assets/img/medals/silver-medal.png";
import bronzeMedal from "../../assets/img/medals/bronze-medal.png";


// Import avatars
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
  const { store, dispatch } = useGlobalReducer();
  const url = import.meta.env.VITE_BACKEND_URL;

  // Tabs & edit state
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Profile state
  const initialProfile = {
    name: "",
    nick_name: "",
    age: 0,
    gender: "",
    location: "",
    zodiac: "Leo",
    discord: "",
    steam_id: "",
    language: "",
    preferences: "",
    bio: "",
    photo: "photo1",
  };
  const [profile, setProfile] = useState(initialProfile);

  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer",
    "Leo", "Virgo", "Libra", "Scorpio",
    "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];
  const genders = ["Male", "Female", "Undefined"];
  const allGames = store.user?.profile?.games ?? [];
  const topThreeGames = allGames
    .slice()                                      // 1. Copia el array para no mutar el original
    .sort((a, b) => (b.hours_played ?? 0) - (a.hours_played ?? 0))  // 2. Orden descendente por horas
    .slice(0, 3);

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


  // Mapping between filename and key
  const picMap = {
    "profile-pic-1.png": "photo1",
    "profile-pic-2.png": "photo2",
    "profile-pic-3.png": "photo3",
    "profile-pic-4.png": "photo4",
    "profile-pic-5.png": "photo5",
    "profile-pic-6.png": "photo6",
    "profile-pic-7.png": "photo7",
    "profile-pic-8.png": "photo8",
    "profile-pic-9.png": "photo9"
  };

  const photoAssets = {
    photo1, photo2, photo3,
    photo4, photo5, photo6,
    photo7, photo8, photo9
  };

  // Load profile once
  useEffect(() => {
    loadProfile();
    reviewServices.getAllReviewsReceived(store.user?.id).then(data => dispatch({ type: "matchReviewsReceived", payload: data }))

  }, []);

  const loadProfile = async () => {
    try {
      const resp = await fetch(`${url}/api/profiles/${store.user.profile.id}`);
      if (!resp.ok) throw new Error('Error al cargar los datos');
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

  // Change avatar handler (async, updates state immediately)
  const handlePicChange = async (fileName) => {
    const newPhotoKey = picMap[fileName] || 'photo1';
    try {
      // Update backend
      await userServices.changeUserPhoto(store.user.profile.id, { photo: newPhotoKey });
      // Update local state immediately
      setProfile(prev => ({ ...prev, photo: newPhotoKey }));
      console.log(newPhotoKey)
    } catch (err) {
      console.error('Error al cambiar foto:', err);
    } finally {
      setShowModal(false);
    }
  };

  // Select correct asset
  const selectPhoto = () => photoAssets[profile.photo] || photo1;

  // Toggle edit/save
  const updateProfile = async () => {
    if (isEditing) {
      try {
        const resp = await fetch(`${url}/api/profiles/${store.user.profile.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
        });
        if (!resp.ok) throw new Error('Error al actualizar el perfil');
        await resp.json();
      } catch (err) {
        console.error('Error en updateProfile:', err);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // Render
  return (
    <div className="profile-container">
      <div className="left-panel">
        <div className="avatar-section">
          <button className="gear-btn" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-gear"></i>
          </button>
          <img src={selectPhoto()} alt="Avatar" className="profile-avatar" />
        </div>
        <h2>{profile.nick_name}</h2>
        <p className="location">{profile.location}</p>

        {/* Medals */}
        <div className="medal-list">
          {topThreeGames.map((el, index) => {
            const hours = el.game?.hours_played ?? 0;
            const title = el.game?.title ?? `Game ${index + 1}`;

            return (
              <div key={el.game?.id ?? index} className="medal-game-card">
                {/* Icono de la medalla según horas jugadas */}
                <img
                  src={selectMedal(hours)}
                  alt={`${title} Medal`}
                  className="medal-icon"
                  role="button"
                  data-bs-toggle="popover"
                  data-bs-trigger="hover focus"
                  data-bs-container="body"
                  data-bs-placement="bottom"
                  data-bs-content={`${title} — ${hours} horas`}
                />

                {/* Carátula del juego */}
                <div className="game-img-wrapper w-100">
                  <h5 className="m-0 p-2">{el.game.title}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>

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

        {/* Tabs */}
        <div className="tabs">
          {['info', 'activity', 'comments'].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >{tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
          ))}
        </div>

        {activeTab === 'info' && (
          <div className="info-section container">
            {/* Name & Nickname */}
            <div className="row">
              {['name', 'nick_name'].map((field, i) => (
                <div key={i} className="col-md-6">
                  <label>{field === 'nick_name' ? 'Nickname' : 'Name'}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile[field]}
                      onChange={e => handleInputChange(field, e.target.value)}
                    />
                  ) : (<p>{profile[field]}</p>)}
                </div>
              ))}
            </div>

            {/* Age, Gender, Zodiac */}
            <div className="row">
              {/* Age */}
              <div className="col-md-4">
                <label>Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age}
                    onChange={e => handleInputChange('age', +e.target.value)}
                  />
                ) : (<p>{profile.age}</p>)}
              </div>

              {/* Gender */}
              <div className="col-md-4">
                <label>Gender</label>
                {isEditing ? (
                  <select
                    value={profile.gender}
                    onChange={e => handleInputChange('gender', e.target.value)}
                  >
                    {genders.map((g, i) => (<option key={i}>{g}</option>))}
                  </select>
                ) : (<p>{profile.gender}</p>)}
              </div>

              {/* Zodiac */}
              <div className="col-md-4">
                <label>Zodiac</label>
                {isEditing ? (
                  <select
                    value={profile.zodiac}
                    onChange={e => handleInputChange('zodiac', e.target.value)}
                  >
                    {zodiacSigns.map((z, i) => (<option key={i}>{z}</option>))}
                  </select>
                ) : (<p>{profile.zodiac}</p>)}
              </div>
            </div>

            {/* Contact & Preferences */}
            <div className="row">
              {['discord', 'steam_id'].map((field, i) => (
                <div key={i} className="col-md-6">
                  <label>{field === 'steam_id' ? 'Steam Friend ID' : 'Discord'}</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profile[field]}
                      onChange={e => handleInputChange(field, e.target.value)}
                    />
                  ) : (<p>{profile[field]}</p>)}
                </div>
              ))}

              {/* Preferences */}
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

              {/* Location */}
              <div className="col-md-6">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={e => handleInputChange('location', e.target.value)}
                  />
                ) : (<p>{profile.location}</p>)}
              </div>
            </div>

            {/* Save/Edit */}
            <div className="row mt-3">
              <div className="col text-left">
                <button className="edit-btn" onClick={updateProfile}>
                  {isEditing ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="coming-soon-box">
            <h3>Coming soon...</h3>
            <p>This section is under construction. Stay tuned!</p>
          </div>
        )}

        {activeTab === "comments" && <div className="info-section container">
          <div className="row justify-content-around">
            <h3 className="col-1 m-2 mb-4">Comments</h3>
            <div className="col-auto m-2 mb-4">
            </div>
          </div>
          <div className="row">
            {store.matchReviewsReceived.reviews_received.length > 0 ? (
              store.matchReviewsReceived.reviews_received.map((el) => (
                <div key={el.id} className="review-card">
                  <div className="review-container">
                    Author : {el.author_nickname} — {el.stars} ⭐️
                    <p className="m-0 border-0 review-box"> <span className="fa-solid fa-comment mx-2"></span>{el.comment}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>}
      </div>

      {/* Avatar Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="avatar-modal">
            <h3>Choose Your Avatar</h3>
            <div className="avatar-grid">
              {Object.keys(picMap).map((file, idx) => (
                <img
                  key={idx}
                  src={`/src/front/assets/img/profile-pics/${file}`}
                  className={file === Object.entries(picMap)
                    .find(([, key]) => key === profile.photo)[0]
                    ? 'selected' : ''
                  }
                  alt={file}
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
