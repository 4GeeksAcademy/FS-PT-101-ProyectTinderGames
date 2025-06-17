import './SearchMatchCard.css';
import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import { useEffect, useState } from 'react';
import searchMatchServices from '../../services/searchMatchServices';

export const SearchMatchCard = ({ profile, onLike, onDislike }) => {

  const [animationClass, setAnimationClass] = useState('');
  const [avgStars, setAvgStars] = useState(0);

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


  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className="col">

          <div className={`card search-match-card ${animationClass}`}>
            <div className="card-body">
              <div className='d-flex justify-content-center'>

                <div className='d-flex justify-content-center rounded-circle'>


                  <img src={profilePic4} alt="App Logo" className='search-match-profile-pic border border-3'></img>
                </div>
              </div>

              {/* Nombre de user = nickname */}
              <h1 className="card-title d-flex justify-content-center mt-3 search-match-name">
                {profile?.nick_name || 'undefined'}
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
              {profile?.games?.slice(0, 3).map((g, index) => (
                <div className="row align-items-center mb-2" key={index}>
                  <div className="col">
                    <h5 className='ms-4 search-match-text-sm'>{g.game.title}</h5>
                  </div>
                  <div className="col text-end">
                    <h5 className=' me-4 search-match-text-sm'>{g.game.hours_played} h</h5>
                  </div>
                </div>
              ))}

              <hr className="search-match-line" />

              {/* Preferences */}
              <div className="row align-items-center">
                <div className="col">
                  <h5 className='ms-4 search-match-text-sm'>Preferences</h5>
                </div>
                <div className="col text-end">
                  <h5 className='me-4 search-match-text-sm'>{profile?.preferences || '-'}</h5>
                </div>
              </div>

              <hr className="search-match-line" />


              {/* Location */}
              <div className="row mt-2">
                <div className="col d-flex justify-content-end">
                  <h5 className='ms-4 search-match-text-sm'><i className="fa-solid fa-location-dot"></i></h5>
                </div>
                <div className="col d-flex justify-content-start">
                  <h5 className='me-4 search-match-text-sm '>{profile?.location || '-'}</h5>
                </div>
              </div>

              {/* Language */}
              <div className="row ">
                <div className="col d-flex justify-content-end">
                  <h5 className='ms-4 search-match-text-sm '><i className="fa-solid fa-language"></i></h5>
                </div>
                <div className="col d-flex justify-content-start">
                  <h5 className=' me-4 search-match-text-sm'>{profile?.language || '-'}</h5>
                </div>
              </div>




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