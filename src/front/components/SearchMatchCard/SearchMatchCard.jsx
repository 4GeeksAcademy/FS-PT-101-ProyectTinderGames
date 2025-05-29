import './SearchMatchCard.css';
import profilePic from "../../assets/img/icons/icon-profile.png";
import { useState } from 'react';


export const SearchMatchCard = () => {

  const [disliked, setDisliked] = useState(false);
  const [like, setLike] = useState(false)


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

            <div className="card searchMatchCard card-gradient-transparent">
              <div className="card-body">
                <div className='d-flex justify-content-center'>

                  <div className='search-match-profile-pic d-flex justify-content-center rounded-circle'>


                    <img src={profilePic} alt="App Logo"></img>
                  </div>
                </div>


                <h2 className="card-title d-flex justify-content-center mt-2">User Name</h2>
                <div className='search-match-stars d-flex justify-content-center mt-3 mb-4'>

                  <i className="fa-regular fa-star fa-lg"></i>
                  <i className="fa-regular fa-star fa-lg"></i>
                  <i className="fa-regular fa-star fa-lg"></i>
                  <i className="fa-regular fa-star fa-lg"></i>
                  <i className="fa-regular fa-star fa-lg"></i>
                </div>
                <div>


                  <div className="container mt-3">
                    <div className="row">
                      {/* Fila 1 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Age</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>32</h5>
                      </div>

                      {/* Fila 2 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Game name</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-blue text-end me-lg-4 me-md-3 me-sm-3 me-2'>1420 h</h5>
                      </div>

                      {/* Fila 3 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Game name</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-blue text-end me-lg-4 me-md-3 me-sm-3 me-2'>1420 h</h5>
                      </div>

                      {/* Fila 4 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Game name</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-blue text-end me-lg-4 me-md-3 me-sm-3 me-2'>1420 h</h5>
                      </div>

                      {/* Fila 5 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Location</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>Spain</h5>
                      </div>

                      {/* Fila 6 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='ms-lg-4 ms-md-3 ms-sm-3 ms-2'>Language</h5>
                      </div>
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6">
                        <h5 className='search-match-card-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>SP, EN</h5>
                      </div>

                      {/* Fila 7 */}
                      <div className="col-12 col-sm-6 col-md-6 col-lg-6 mt-3">
                        <div className="ms-lg-4 ms-md-3 ms-sm-3 ms-2 d-flex justify-content-end me-3">
                          {/* dislike button */}
                          <button type="button"
                            onClick={() => setDisliked(true)}
                            className={`p-1 me-1 search-match-button ${disliked ? 'slide-out-blurred-left' : ''}`}>
                            <i className="hover-button-pulsate-bck fa-solid fa-xmark fa-3x d-flex justify-content-center align-items-center search-match-dislike"></i>
                          </button>
                        </div>
                      </div>

                      <div className="col-12 col-sm-6 col-md-6 col-lg-6 mt-3">
                        <div className="me-lg-4 me-md-3 me-sm-3 me-2 d-flex justify-content-start ms-3">
                          {/* like button */}
                          <button type="button"
                            onClick={() => setLike(true)}
                            className={`p-1 me-1 search-match-button ${like ? 'slide-out-blurred-right' : ''}`}>
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