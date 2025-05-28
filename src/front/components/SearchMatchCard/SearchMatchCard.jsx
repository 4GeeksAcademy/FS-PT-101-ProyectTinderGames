import './SearchMatchCard.css';
import profilePic from "../../assets/img/icons/icon-profile.png";

export const SearchMatchCard = () => {


  return (
    <>


      <h1 className='d-flex justify-content-center searchMateCard-font-shadow'>
        Search a mate
      </h1>

      <div className='d-flex justify-content-center'>
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">


          <div className="card searchMatchCard">
            <div className="card-body">
              <div className='d-flex justify-content-center'>

                <div className='search-match-profile-pic d-flex justify-content-center rounded-circle'>


                  <img src={profilePic} alt="App Logo"></img>
                </div>
              </div>


              <h2 className="card-title d-flex justify-content-center mt-2">User Name</h2>
              <div>


                <div className="container mt-3">
                  <div className="row">
                    {/* Fila 1 */}
                    <div className="col-12 col-sm-6">
                      <h6 className='ms-5'>Age</h6>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6 className='search-match-card-age text-end me-5'>32</h6>
                    </div>

                    {/* Fila 2 */}
                    <div className="col-12 col-sm-6">
                      <h6 className='ms-5'>Game name</h6>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6 className='search-match-card-hours text-end me-5'>1520 h</h6>
                    </div>

                    {/* Fila 3 */}
                    <div className="col-12 col-sm-6">
                      <h6 className='ms-5'>Game name</h6>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6 className='search-match-card-hours text-end me-5'>1520 h</h6>
                    </div>

                    {/* Fila 4 */}
                    <div className="col-12 col-sm-6">
                      <h6 className='ms-5'>Game name</h6>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6 className='search-match-card-hours text-end me-5'>1520 h</h6>
                    </div>

                    {/* Fila 5 */}
                    <div className="col-12 col-sm-6">
                      <h6 className='ms-5'>Location</h6>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6 className='search-match-card-country-language text-end me-5'>Spain</h6>
                    </div>

                    {/* Fila 6 */}
                    <div className="col-12 col-sm-6">
                      <h6 className='ms-5'>Language</h6>
                    </div>
                    <div className="col-12 col-sm-6">
                      <h6 className='search-match-card-country-language text-end me-5'>SP, EN</h6>
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