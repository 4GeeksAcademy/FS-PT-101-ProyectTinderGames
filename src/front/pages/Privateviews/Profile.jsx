
import React, { useState } from "react";
import "../../pages/Privateviews/Profile.css";


const zodiacSigns = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

const genders = ["Male", "Female", "Undefined"];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPic, setSelectedPic] = useState("profile-pic-1.png");

  const [profile, setProfile] = useState({
    name: "Alex Rodriguez",
    nickname: "Jag",
    age: 25,
    gender: "Male",
    location: "Bogotá, Colombia",
    zodiac: "Leo",
    discord: "jagpanther#1234",
    steam: "STEAM_0:1:12345678",
    languages: ["English", "Spanish"],
    gamingPrefs: "Casual FPS and Co-op RPGs",
    bio: "Lorem fistrum a peich amatomaa tiene musho peligro amatomaa. Te va a hasé pupitaa va usté muy cargadoo diodenoo diodeno no puedor ese pedazo de pecador ahorarr hasta luego Lucas caballo blanco caballo negroorl. Al ataquerl apetecan diodeno ahorarr pupita papaar papaar no puedor diodeno caballo blanco caballo negroorl jarl. Ahorarr quietooor condemor qué dise usteer. Condemor fistro llevame al sircoo torpedo ahorarr ahorarr la caidita te voy a borrar el cerito benemeritaar sexuarl. Pecador torpedo condemor pecador."
  });

  const handlePicChange = (pic) => {
    setSelectedPic(pic);
    setShowModal(false);
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="profile-container">
      <div className="left-panel">
        <div className="avatar-section">
          <button className="gear-btn" onClick={() => setShowModal(true)}><i className="fa-solid fa-gear"></i></button>
          <img src={`/src/front/assets/img/profile-pics/${selectedPic}`} className="profile-avatar" />
        </div>
        <h2>{profile.nickname}</h2>
        <p className="location">{profile.location}</p>
        {/* tarjetita de medallas*/}
        <div className="medal-list">
          <div className="medal-game-card">
            <img
              src="/src/front/assets/img/medals/gold-medal.png"
              alt="Gold Medal"
              className="medal-icon"
            />
            <div className="game-img-wrapper">
              <img
                src="https://picsum.photos/id/237/200/120"
                alt="Game 1"
                className="game-cover"
              />
            </div>
          </div>

          <div className="medal-game-card">
            <img
              src="/src/front/assets/img/medals/silver-medal.png"
              alt="Silver Medal"
              className="medal-icon"
            />
            <div className="game-img-wrapper">
              <img
                src="https://picsum.photos/id/238/200/120"
                alt="Game 2"
                className="game-cover"
              />
            </div>
          </div>

          <div className="medal-game-card">
            <img
              src="/src/front/assets/img/medals/bronze-medal.png"
              alt="Bronze Medal"
              className="medal-icon"
            />
            <div className="game-img-wrapper">
              <img
                src="https://picsum.photos/id/239/200/120"
                alt="Game 3"
                className="game-cover"
              />
            </div>
          </div>
        </div>


      </div>

      <div className="right-panel">


        <div className="bio-box">
          <p>{profile.bio}</p>
        </div>

        <div className="tabs">
          <button className={activeTab === "info" ? "active" : ""} onClick={() => setActiveTab("info")}>Info</button>
          <button className={activeTab === "activity" ? "active" : ""} onClick={() => setActiveTab("activity")}>Activity</button>
          <button className={activeTab === "comments" ? "active" : ""} onClick={() => setActiveTab("comments")}>Comments</button>
        </div>

        {activeTab === "info" && (
          <div className="info-section container">
            <div className="row">
              <div className="col-md-6">
                <label>Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>
              <div className="col-md-6">
                <label>Nickname</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.nickname}
                    onChange={(e) => handleInputChange("nickname", e.target.value)}
                  />
                ) : (
                  <p>{profile.nickname}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label>Age</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={profile.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
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
                    onChange={(e) => handleInputChange("gender", e.target.value)}
                  >
                    {genders.map((g, i) => (
                      <option key={i} value={g}>{g}</option>
                    ))}
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
                    onChange={(e) => handleInputChange("zodiac", e.target.value)}
                  >
                    {zodiacSigns.map((z, i) => (
                      <option key={i} value={z}>{z}</option>
                    ))}
                  </select>
                ) : (
                  <p>{profile.zodiac}</p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label>Discord</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.discord}
                    onChange={(e) => handleInputChange("discord", e.target.value)}
                  />
                ) : (
                  <p>{profile.discord}</p>
                )}
              </div>
              <div className="col-md-6">
                <label>Steam friend id</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.steam}
                    onChange={(e) => handleInputChange("steam", e.target.value)}
                  />
                ) : (
                  <p>{profile.steam}</p>
                )}
              </div>
              <div className="gaming-prefs-box col-md-6">
                <label>Gaming Preferences</label>
                {!isEditing ? (
                  <p><strong>I'm looking for: </strong> {profile.gamingPrefs}</p>
                ) : (
                  <textarea
                    value={profile.gamingPrefs}
                    onChange={(e) => handleInputChange("gamingPrefs", e.target.value)}
                    className="gaming-prefs-input"
                    rows={3}
                  />
                )}
              </div>
              <div className="col-md-6">
                <label>Location</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => handleInputChange("steam", e.target.value)}
                  />
                ) : (
                  <p>{profile.location}</p>
                )}
              </div>
            </div>

            <div className="row mt-3">
              <div className="col text-left">
                <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Save" : "Edit"}
                </button>
              </div>
            </div>
          </div>
        )}


        {activeTab === "activity" && (
          <div className="coming-soon-box">
            <h3>Coming soon...</h3>
            <p>This section is under construction. Stay tuned for updates!</p>
          </div>
        )}

        {activeTab === "comments" && <p className="tab-placeholder">Comments content goes here.</p>}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="avatar-modal">
            <h3>Choose Your Avatar</h3>
            <div className="avatar-grid">
              {[...Array(9)].map((_, i) => {
                const picName = `profile-pic-${i + 1}.png`;
                return (
                  <img
                    key={i}
                    src={`/src/front/assets/img/profile-pics/${picName}`}
                    className={selectedPic === picName ? "selected" : ""}
                    onClick={() => handlePicChange(picName)}
                  />
                );
              })}
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={() => setShowModal(false)} className="confirm-btn">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;