import './SearchMatchCard.css';
import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import { useState } from 'react';

export const SearchMatchCard = ({ profile, onLike, onDislike }) => {

  const [animationClass, setAnimationClass] = useState('');


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
        <div className='d-flex justify-content-center '>

          <h1 className='searchMateCard-font-shadow mt-2 mb-3'>
            Search a mate
          </h1>
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
                <div className='search-match-stars d-flex justify-content-center mt-3 mb-4'>
                {[...Array(5)].map((_, i) => (<i key={i} className={`fa-star fa-lg ms-1 ${i < (profile?.stars || 0) ? "fa-solid" : "fa-regular"}`}></i>))}
                </div>
                <div>


                  <div className="container mt-3">
                    <div className="row">
                      {/* Fila 1 = edad */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Age</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                                        <h5 className='search-match-card-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>
                       {profile?.age || '-'}
                          </h5>
                      </div>

                      {/* Fila 2 = Juego 1 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Game name</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-blue text-end me-lg-4 me-md-3 me-sm-3 me-2'>1420 h</h5>
                      </div>

                      {/* Fila 3 = Juego 2*/}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Game name</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-blue text-end me-lg-4 me-md-3 me-sm-3 me-2'>1420 h</h5>
                      </div>

                      {/* Fila 4 = Juego 3*/}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Game name</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-blue text-end me-lg-4 me-md-3 me-sm-3 me-2'>1420 h</h5>
                      </div>

                      {/* Fila 5 = location*/}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Location</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>{profile?.location || '-'}</h5>
                      </div>

                      {/* Fila 6 = language */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Language</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>{profile?.language || '-'}</h5>
                      </div>

                      {/* Fila 7 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6 mt-3">
                        <div className="ms-lg-4 ms-md-3 ms-sm-3 ms-2 d-flex justify-content-end me-3">

                          {/* dislike button */}
                          <button type="button"
                            onClick={handleDislike}
                            className="p-1 me-1 search-match-button">
                            <i className="hover-button-pulsate-bck fa-solid fa-xmark fa-3x d-flex justify-content-center align-items-center search-match-dislike"></i>
                          </button>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-md-6 col-lg-6 mt-3">
                        <div className="me-lg-4 me-md-3 me-sm-3 me-2 d-flex justify-content-start ms-3">
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
          </div>

        </div>
      </div>
    </>

  )


}