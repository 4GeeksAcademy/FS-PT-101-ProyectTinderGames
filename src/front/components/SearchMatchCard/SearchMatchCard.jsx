import './SearchMatchCard.css';
import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import { useEffect, useState } from 'react';
import searchMatchServices from '../../services/searchMatchServices';

export const SearchMatchCard = ({profile, onLike, onDislike }) => {

  const [animationClass, setAnimationClass] = useState('');
  const [avgStars, setAvgStars] = useState(0);

  useEffect(() => {
    if (!profile?.id) return;
    const fetchAvgStars = async () => {
      try {
        const avg = await searchMatchServices.getStarsByUser(profile.id);
        setAvgStars(Number(avg));
      } catch (err) {
        console.error(err);
      }
    };
    fetchAvgStars();
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

      <div className="search-match-bg">
        
        </div>
        <div className='d-flex justify-content-center'>
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">

            <div className={`card searchMatchCard ${animationClass}`}>
              <div className="card-body">
                <div className='d-flex justify-content-center'>

                  <div className='d-flex justify-content-center rounded-circle'>


                    <img src={profilePic4} alt="App Logo" className='search-match-profile-pic'></img>
                  </div>
                </div>

                {/* Nombre de user = nickname */}
                <h2 className="card-title d-flex justify-content-center mt-2">
                  {profile?.nick_name || 'undefined'}
                </h2>

                {/* stars-rating de los users */}
                <div className='d-flex justify-content-center mt-3 mb-5'>

                {[...Array(5)].map((_, i) => (
                  <i
                  key={i}
                  className={`fa-star fa-lg ms-1 ${i < Math.round(avgStars) ? "fa-solid" : "fa-regular"
                  }`}
                  ></i>
                ))}
                </div>

                <div className="container mt-3">

                  {/* Games */}
                  {profile?.games?.slice(0, 3).map((g, index) => (
                    <div className="row" key={index}>
                      <div className="col-6">
                        <h5 className=' ms-2'>{g.game.title}</h5>
                      </div>

                      <div className="col-6 text-end">
                        <h5 className='search-match-card-blue me-2'>{g.game.hours_played} h</h5>
                      </div>
                    </div>
                  ))}

                  {/*location*/}
                  <div className="row mt-2">
                    <div className="col-6">
                      <h5 className='ms-2'>Location</h5>
                    </div>
                    <div className="col-6 text-end">
                      <h5 className='search-match-card-purple me-2'>{profile?.location || '-'}</h5>
                    </div>
                  </div>

                  {/* language */}
                  <div className="row">
                    <div className="col-6">
                      <h5 className='ms-2'>Language</h5>
                    </div>
                    <div className="col-6 text-end">
                      <h5 className='search-match-card-purple me-2'>{profile?.language || '-'}</h5>
                    </div>
                  </div>

                  {/* botones */}
                  <div className=' mt-4' >

                    <div className='row mt-3 d-flex justify-content-center'>
                      <div className="col-6">

                        {/* dislike button */}
                        <button type="button"
                          onClick={handleDislike}
                          className="p-1 me-1 search-match-button">
                          <i className="hover-button-pulsate-bck fa-solid fa-xmark fa-3x d-flex justify-content-center align-items-center search-match-dislike"></i>
                        </button>
                      </div>

                      {/* like button */}
                      <button type="button"
                        onClick={handleLike}
                        className="p-1 me-1 search-match-button">
                        <i className="hover-button-pulsate-bck fa-solid fa-heart fa-3x d-flex justify-content-center align-items-center search-match-like "></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    </>

  )


}