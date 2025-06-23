import './SearchMatchCard.css';
// import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import { useEffect, useState } from 'react';
import searchMatchServices from '../../services/searchMatchServices';
import photo1 from "../../assets/img/profile-pics/profile-pic-1.png";
import photo2 from "../../assets/img/profile-pics/profile-pic-2.png";
import photo3 from "../../assets/img/profile-pics/profile-pic-3.png";
import photo4 from "../../assets/img/profile-pics/profile-pic-4.png";
import photo5 from "../../assets/img/profile-pics/profile-pic-5.png";
import photo6 from "../../assets/img/profile-pics/profile-pic-6.png";
import photo7 from "../../assets/img/profile-pics/profile-pic-7.png";
import photo8 from "../../assets/img/profile-pics/profile-pic-8.png";
import photo9 from "../../assets/img/profile-pics/profile-pic-9.png";

export const SearchMatchCard = ({ profile, onLike, onDislike }) => {

  const [animationClass, setAnimationClass] = useState('');
  const [avgStars, setAvgStars] = useState(0);

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

  useEffect(() => {
    if (!profile?.id) return;
    const getAvgStars = async () => {
      try {
        const average = await searchMatchServices.getStarsByUser(profile.id);
        // console.log('Average stars --->', average)//para ver si funciona
        setAvgStars(Number(average));
      } catch (err) {
        console.error(err);
      }
    };
    getAvgStars();
  }, [profile]);


  const handleLike = () => {
    setAnimationClass('slide-out-right');
    setTimeout(() => {
      setAnimationClass('');
      onLike();
    }, 500);
  };

  const handleDislike = () => {
    setAnimationClass('slide-out-left');
    setTimeout(() => {
      setAnimationClass('');
      onDislike();
    }, 500);
  };

  const formattedPreferences = profile?.preferences
    ? profile.preferences
      .replace(/\band\b/g, ',')   // reemplaza "and" por coma
      .replace(/\.+$/, '')        // elimina punto final al final
      .split(',')                 // separa en array por comas
      .map(pref => pref.trim())   // quita espacios
      .filter(Boolean)            // elimina vacíos
      .join(', ')                 // une con comas sin coma final
    : '-';

  const formattedLanguages = profile?.language ? profile.language
    .replace(/\band\b/g, ',')   // reemplaza "and" por coma
    .replace(/\.+$/, '')        // elimina punto final al final
    .split(',')                 // separa en array por comas
    .map(pref => pref.trim())   // quita espacios
    .filter(Boolean)            // elimina vacíos
    .join(', ')                 // une con comas sin coma final

    : '-';
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className="col">

          <div className={`card search-match-card ${animationClass}`}>
            <div className="card-body">
              <div className='d-flex justify-content-center'>

                <div className='d-flex justify-content-center rounded-circle'>


                  <img src={selectPhoto()} alt="App Logo" className='search-match-profile-pic border border-3'></img>
                </div>
              </div>

              {/* Nombre de user = nickname */}
              <h1 className="card-title d-flex justify-content-center mt-3 search-match-name">
                {profile?.nick_name || 'No nick_name'}
              </h1>

              {/* stars-rating de los users */}
              <div className='d-flex justify-content-center mt-4 mb-5'>

                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    className={`fa-star fa-xl ms-1 search-match-stars ${i < Math.round(avgStars) ? "fa-solid" : "fa-regular"
                      }`}
                  ></i>
                ))}
              </div>

              <hr className="search-match-line" />

              {/* Games */}
              {profile?.games && profile.games.length > 0 ? (
                profile.games
                  .sort((a, b) => b.gameHoursPlayed - a.gameHoursPlayed)
                  .slice(0, 3)
                  .map((g, index) => (
                    <div className="row align-items-center mb-2" key={index}>
                      <div className="col">
                        <h5 className='ms-4 search-match-text-sm'>{g.gameTitle}</h5>
                      </div>
                      <div className="col text-end">
                        <h5 className=' me-4 search-match-text-sm'>{g.gameHoursPlayed} h</h5>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="row align-items-center mb-2">
                  <div className="col text-center">
                    <h5 className='search-match-text-sm'>No games</h5>
                  </div>
                </div>
              )}
              <hr className="search-match-line" />

              {/* Preferences */}
              <div className="col">
                {formattedPreferences && formattedPreferences !== '-' ? (
                  <div className='d-flex ms-4 flex-wrap preferences-container-mobile align-items-center'>
                    <h5 className='search-match-text-sm me-2 preferences-full'>Preferences:</h5>
                    <i className="fa-solid fa-thumbs-up preferences-small mb-2"></i>
                    <h5 className='search-match-text-sm me-2 text-end'>{formattedPreferences}</h5>
                  </div>
                ) : (
                  <div className='d-flex justify-content-center'>
                    <h5 className='search-match-text-sm'>No preferences </h5>
                  </div>
                )}
              </div>

              <hr className="search-match-line" />

              {/* Language */}
              <div className="col">
                <div className='d-flex justify-content-center'>
                  <div className='d-flex ms-4'>
                    <i className="fa-solid fa-language me-2 ms-4"></i>
                    <h5 className='search-match-text-sm me-4'>{formattedLanguages && formattedLanguages !== '-'
                      ? formattedLanguages
                      : 'No languages'}</h5>
                  </div>
                </div>
              </div>

              <hr className="search-match-line" />

              {/* Location */}
              <div className="col">
                <div className='d-flex justify-content-center '>
                  <div className='d-flex ms-4'>
                    <i className="fa-solid fa-location-dot me-2"></i>
                    <h5 className='search-match-text-sm'>{profile?.location || 'No location'}</h5>
                  </div>
                </div>
              </div>

              <hr className="search-match-last-line" />

              {/* botones */}
              <div className='row mt-3 d-flex justify-content-center'>
                <div className="col-6">

                  {/* dislike button */}
                  <button type="button"
                    onClick={handleDislike}
                    className="p-1 me-1 bg-transparent border border-3  search-match-button search-match-dislike-btn-border ">
                    <i className="fa-solid fa-xmark fa-3x d-flex justify-content-center align-items-center search-match-dislike"></i>
                  </button>
                </div>

                {/* like button */}
                <button type="button"
                  onClick={handleLike}
                  className="p-1 me-1 bg-transparent border border-3 search-match-button search-match-like-btn-border">
                  <i className="hover-button-pulsate-bck fa-solid fa-heart fa-2x d-flex justify-content-center align-items-center search-match-like "></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )


}