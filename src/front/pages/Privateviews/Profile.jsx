
import React, { useEffect, useState } from "react";
import "../../pages/Privateviews/Profile.css";
import storeReducer from "../../store";
import useGlobalReducer from "../../hooks/useGlobalReducer";
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
  const [activeTab, setActiveTab] = useState("info");
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPic, setSelectedPic] = useState("profile-pic-1.png");
  const zodiacSigns = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
  ];

  const genders = ["Male", "Female", "Undefined"];

  const [profile, setProfile] = useState({
    name: "",
    nick_name: "J",
    age: 0,
    gender: "",
    location: "",
    zodiac: "Leo",
    discord: "",
    steam_id: "",
    language: "Morroco",
    preferences: "",
    bio: "",
    photo: ""
  });

  useEffect(() => {
    loader();
  }, [])

  const loader = () => {
    fetch(url + `/api/profiles/${store.user.profile.id}`)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error('Error al cargar los datos');
        }
        return resp.json();
      })
      .then((datos) => {
        if (datos.length !== null) {
          setProfile({
            name: datos.name,
            nick_name: datos.nick_name,
            age: datos.age,
            gender: datos.gender,
            location: datos.location,
            zodiac: datos.zodiac,
            discord: datos.discord,
            steam_id: datos.steam,
            preferences: datos.preferences,
            language: datos.language,
            bio: datos.bio,
            photo: datos.photo
          });
          console.log(datos)
        }
      })
      .catch((err) => {
        console.error('Error en el loader:', err);
      });
  };

  const handlePicChange = (pic) => {
    switch (pic) {
      case "profile-pic-1.png":
        return "photo1";
      case "profile-pic-2.png":
        return "photo2";
      case "profile-pic-3.png":
        return "photo3";
      case "profile-pic-4.png":
        return "photo4";
      case "profile-pic-5.png":
        return "photo5";
      case "profile-pic-6.png":
        return "photo6";
      case "profile-pic-7.png":
        return "photo7";
      case "profile-pic-8.png":
        return "photo8";
      case "profile-pic-9.png":
        return "photo9";
      default:
        img = "photo1";
    }
    setShowModal(false);
  };

  const selectPhoto = () => {
    switch (profile.photo) {
      case "photo1": return photo1;
      case "photo2": return photo2;
      case "photo3": return photo3;
      case "photo4": return photo4;
      case "photo5": return photo5;
      case "photo6": return photo6;
      case "photo7": return photo7;
      case "photo8": return photo8;
      case "photo9": return photo9;
      default: return "defaultPhoto";
    }
  };

  const updateProfile = async () => {
    setIsEditing(!isEditing)
    if (!store.user.profile) {
      console.log("profile no existe")
    } else {
      try {
        const resp = await fetch(`${url}/api/profiles/${store.user.id}`, {
          method: 'PUT',                    // o 'PUT' si tu API lo requiere
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(profile)      // enviamos el estado completo
        });

        if (!resp.ok) {
          console.log(profile)
          throw new Error('Error al actualizar el perfil');
        }

        // Si tu API devuelve el perfil actualizado, puedes capturarlo:
        const updated = await resp.json();

        // Opcional: refresca tu loader o actualiza estado local
        loader();

      } catch (err) {
        console.error('Error en updateProfile:', err);
      }

    }
  };

  const handleInputChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="profile-container">
      <div className="left-panel">
        <div className="avatar-section">
          <button className="gear-btn" onClick={() => setShowModal(true)}><i class="fa-solid fa-gear"></i></button>
          <img src={selectPhoto()} className="profile-avatar" />
        </div>
        <h2>{profile.nick_name}</h2>
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
                    value={profile.nick_name}
                    onChange={(e) => handleInputChange("nick_name", e.target.value)}
                  />
                ) : (
                  <p>{profile.nick_name}</p>
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
                    value={profile.steam_id}
                    onChange={(e) => handleInputChange("steam_id", e.target.value)}
                  />
                ) : (
                  <p>{profile.steam_id}</p>
                )}
              </div>
              <div className="gaming-prefs-box col-md-6">
                <label>Gaming Preferences</label>
                {!isEditing ? (
                  <p><strong>I'm looking for: </strong> {profile.preferences}</p>
                ) : (
                  <textarea
                    value={profile.preferences}
                    onChange={(e) => handleInputChange("preferences", e.target.value)}
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
                <button className="edit-btn" onClick={() => updateProfile()}>
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
                    onClick={() => {
                      setSelectedPic(picName);
                      setProfile(prev => ({
                        ...prev,
                        photo: handlePicChange(selectedPic)  // aquí llamas a tu función
                      }));
                      setShowModal(false);
                    }}
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
}

export default Profile;