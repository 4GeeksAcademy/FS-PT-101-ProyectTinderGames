import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import userServices from "../services/userServices";
import useGlobalReducer, { StoreProvider } from "../hooks/useGlobalReducer";
import "../pages/Privateviews/Profile.css";
import reviewServices from "../services/reviewServices";
import goldMedal from "../assets/img/medals/gold-medal.png";
import silverMedal from "../assets/img/medals/silver-medal.png";
import bronzeMedal from "../assets/img/medals/bronze-medal.png";
import photo1 from "../assets/img/profile-pics/profile-pic-1.png";
import photo2 from "../assets/img/profile-pics/profile-pic-2.png";
import photo3 from "../assets/img/profile-pics/profile-pic-3.png";
import photo4 from "../assets/img/profile-pics/profile-pic-4.png";
import photo5 from "../assets/img/profile-pics/profile-pic-5.png";
import photo6 from "../assets/img/profile-pics/profile-pic-6.png";
import photo7 from "../assets/img/profile-pics/profile-pic-7.png";
import photo8 from "../assets/img/profile-pics/profile-pic-8.png";
import photo9 from "../assets/img/profile-pics/profile-pic-9.png";



export const MatchUserDetails = () => {
  const { store, dispatch } = useGlobalReducer();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("info");
  const [showModal, setShowModal] = useState(false);
  const [selectedPic, setSelectedPic] = useState("profile-pic-1.png");
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState({ stars: 0, comment: "" });
  const [hoverRating, setHoverRating] = useState(0);


  // Fetch match info once when `id` changes
  useEffect(() => {
    userServices
      .getUserInfoById(id)
      .then(data => dispatch({ type: "getMatchInfo", payload: data }))
      .catch(err => console.error("Failed to load user info:", err));
    reviewServices.getAllReviewsReceived(id).then(data => dispatch({ type: "matchReviewsReceived", payload: data }))
  }, [id, dispatch]);

  // Build a profile object with default values and optional chaining
  const profile = useMemo(() => {
    const p = store.matchInfo?.profile ?? {};
    return {
      name: p.name ?? "no data",
      nickname: p.nick_name ?? "no data",
      age: p.age ?? "no data",
      gender: p.gender ?? "no data",
      location: p.location ?? "no data",
      zodiac: p.zodiac ?? "no data",
      discord: p.discord ?? "no data",
      steam: p.steam ?? "no data",
      languages: p.languages ?? "no data", // renamed to match API
      gamingPrefs: p.preferences ?? "no data",
      bio: p.bio ?? "no data",
      photo:p.photo?? "no data"
    };
  }, [store.matchInfo]);
  const allGames = store.matchInfo?.profile?.games ?? [];

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

  const handleSaveComment = async (e) => {
    e.preventDefault();

    try {
      // 1. Envía la nueva review: userId, recipientId, { stars, comment }
      await reviewServices.postNewReview(
        store.user.id,
        store.matchInfo.id,
        newComment
      );

      // 2. Limpia el estado del formulario
      setNewComment({ stars: 0, comment: "" });

      // 3. Cierra el modal (Bootstrap 5 API)
      const modalEl = document.getElementById("commentModal");
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();

      reviewServices.getAllReviewsReceived(id).then(data => dispatch({ type: "matchReviewsReceived", payload: data }))

    } catch (error) {
      console.error("Error al guardar el comentario:", error);
      // aquí podrías mostrar un alert o toast de error
    }
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
    default:       return "defaultPhoto";
  }
};

  const topThreeGames = allGames
    .slice()                                      // 1. Copia el array para no mutar el original
    .sort((a, b) => (b.hours_played ?? 0) - (a.hours_played ?? 0))  // 2. Orden descendente por horas
    .slice(0, 3);

  return (
    <div className="profile-container">
      {/* Left Panel */}
      <div className="left-panel">
        <div className="avatar-section">
          <img
            src={selectPhoto()}
            alt="Profile avatar"
            className="profile-avatar"
          />
        </div>
        <h2>{profile.nickname}</h2>
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

      {/* Right Panel */}
      <div className="right-panel">
        <div className="bio-box">
          <p>{profile.bio}</p>
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

        {/* Info Tab Content */}
        {activeTab === "info" && (
          <div className="info-section container">
            <div className="row">
              <div className="col-md-6">
                <label>Name</label>
                <p>{profile.name}</p>
              </div>
              <div className="col-md-6">
                <label>Nickname</label>
                <p>{profile.nickname}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label>Age</label>
                <p>{profile.age}</p>
              </div>
              <div className="col-md-4">
                <label>Gender</label>
                <p>{profile.gender}</p>
              </div>
              <div className="col-md-4">
                <label>Zodiac</label>
                <p>{profile.zodiac}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <label>Discord</label>
                <p>{profile.discord}</p>
              </div>
              <div className="col-md-6">
                <label>Steam friend id</label>
                <p>{profile.steam}</p>
              </div>
              <div className="gaming-prefs-box col-md-6">
                <label>Gaming Preferences</label>
                <p>I'm looking for: {profile.gamingPrefs}</p>
              </div>
              <div className="col-md-6">
                <label>Location</label>
                <p>{profile.location}</p>
              </div>
            </div>
          </div>
        )}

        {/* Other Tabs */}
        {activeTab === "activity" && <p className="tab-placeholder">Activity content goes here.</p>}
        {activeTab === "comments" && <div className="info-section container">
          <div className="row justify-content-around">
            <h3 className="col-1 m-2 mb-4">Comments</h3>
            <div className="col-auto m-2 mb-4">
              <button
                type="button"
                className="btn botonLeaveComment"
                data-bs-toggle="modal"
                data-bs-target="#commentModal"
              >
                Leave a new comment
              </button>
              {/* Modal de nuevo comentario */}
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
                        Leave a new comment
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="modal-body">
                        {/* Rating */}
                        <div className="mb-3 text-warning">
                          <label className="form-label text-dark">Stars</label>
                          <div>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={star}
                                className={`fa-star fa-2x ${(hoverRating || newComment.stars) >= star ? "fa-solid" : "fa-regular"
                                  }`}
                                style={{ cursor: "pointer", marginRight: "0.5rem" }}
                                onClick={() =>
                                  setNewComment((prev) => ({ ...prev, stars: star }))
                                }
                                onMouseEnter={() => setHoverRating(star)}
                                onMouseLeave={() => setHoverRating(0)}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Comment textarea */}
                        <div className="mb-3">
                          <label htmlFor="newComment" className="form-label text-dark">
                            Comment
                          </label>
                          <textarea
                            id="newComment"
                            className="form-control"
                            rows="3"
                            value={newComment.comment}
                            onChange={(e) =>
                              setNewComment((prev) => ({ ...prev, comment: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSaveComment}
                        disabled={!newComment.comment.trim() || newComment.stars === 0}
                      >
                        Save comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
    </div>
  );
};
