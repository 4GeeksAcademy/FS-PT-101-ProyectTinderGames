import './MatchCard.css';
import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import goldMedal from "../../assets/img/medals/gold-medal.png"
import connectIcon from "../../assets/img/logos/logo-app.png"

// import { useState } from 'react';


export const MatchCard = () => {

    return (

        <>

            <div className="match-card-bg">
                <div className='d-flex justify-content-center '>

                    <h1 className='title-matchCard-font-shadow mt-2 mb-3'>
                        It's a match
                    </h1>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6">

                        <div className="card matchCard">
                            <div className="card-body">
                                <div className='d-flex align-items-start'>
                                    {/* profile pic */}
                                    <div className='match-profile-pic d-flex rounded-circle'>
                                        <img src={profilePic4} alt="App Logo" className='match-profile-pic rounded-circle'></img>
                                    </div>
                                    <div>
                                        {/* user name */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            <h2 className="card-title mx-4 mt-3">User Name </h2>
                                            <h3 className="match-card-text-purple text-end mt-3">32</h3>
                                        </div>
                                        {/* stars */}
                                        <div className="d-flex justify-content-start mx-4 mt-3">
                                            <i className="fa-regular fa-star fa-2xl ms-3"></i>
                                            <i className="fa-regular fa-star fa-2xl ms-3"></i>
                                            <i className="fa-regular fa-star fa-2xl ms-3"></i>
                                            <i className="fa-regular fa-star fa-2xl ms-3"></i>
                                            <i className="fa-regular fa-star fa-2xl ms-3"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='d-flex align-items-start '>

                                {/* games */}
                                <div class="card match-card-games mx-3 ">
                                    <div class="card-body">
                                        <div className="container mt-3">
                                            <div className="row">

                                                {/* Fila 1 */}
                                                <div className="p-0 col-12 col-sm-9 col-md-9 col-lg-9">
                                                    <h5 className="ms-2 ">Game name</h5>
                                                </div>
                                                <div className="col-12 col-sm-2 col-md-2 col-lg-2">
                                                    <h5 className="text-end match-card-text-blue ">12123h</h5>
                                                </div>
                                                <div className="col-12 col-sm-1 col-md-1 col-lg-1">
                                                    <h5 className="text-end me-lg-4 me-md-3 me-sm-2 me-1  ">
                                                        <img src={goldMedal} alt="gold medal" className="match-card-medal pb-1" />
                                                    </h5>
                                                </div>


                                                {/* Fila 2 */}
                                                <div className="p-0 col-12 col-sm-9 col-md-9 col-lg-9">
                                                    <h5 className="ms-2 ">Game name</h5>
                                                </div>
                                                <div className="col-12 col-sm-2 col-md-2 col-lg-2">
                                                    <h5 className="text-end match-card-text-blue ">32h</h5>
                                                </div>
                                                <div className="col-12 col-sm-1 col-md-1 col-lg-1">
                                                    <h5 className="text-end me-lg-4 me-md-3 me-sm-2 me-1 ">
                                                        <img src={goldMedal} alt="gold medal" className="match-card-medal pb-1" />
                                                    </h5>
                                                </div>

                                                {/* Fila 3 */}
                                                <div className="p-0 col-12 col-sm-9 col-md-9 col-lg-9">
                                                    <h5 className="ms-2 ">Game name</h5>
                                                </div>
                                                <div className="col-12 col-sm-2 col-md-2 col-lg-2">
                                                    <h5 className="text-end match-card-text-blue">32h</h5>
                                                </div>
                                                <div className="col-12 col-sm-1 col-md-1 col-lg-1">
                                                    <h5 className="text-end me-lg-4 me-md-3 me-sm-2 me-1">
                                                        <img src={goldMedal} alt="gold medal" className="match-card-medal pb-1" />
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* languages */}
                                <div class="card match-card-languages mx-3 mt-3">
                                    <div class="card-body ps-0">

                                        <div className="container mt-3">
                                            <div className="row">
                                                {/* Fila 1 */}
                                                <div className="col-12 col-sm-2 col-md-2 col-lg-2 mb-1">
                                                    <h5 className='ms-2'>
                                                        <i class="fa-solid fa-xl fa-globe"></i>
                                                    </h5>
                                                </div>
                                                <div className="col-12 col-sm-10 col-md-10 col-lg-10 d-flex justify-content-start ps-5">
                                                    <p className='match-card-text-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>Spain</p>
                                                </div>

                                                {/* Fila 2 */}
                                                <div className="col-12 col-sm-2 col-md-2 col-lg-2">
                                                    <h5 className='ms-2'>
                                                        <i className="fa-solid fa-xl fa-language"></i>
                                                    </h5>
                                                </div>
                                                <div className="col-12 col-sm-10 col-md-10 col-lg-10 d-flex justify-content-start ps-5">
                                                    <p className='match-card-text-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>SP, EN </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex'>

                                {/* preferences */}
                                <div class="card match-card-preferences mx-3 mt-3">
                                    <div class="card-body">
                                        <h5 class="ms-2 mb-1">Preferences</h5>
                                        <p className='match-card-text-purple ms-2'>
                                            I'm looking for friends that help me to improve my gaming skills but not all the time. I'm competitive but I like to chill too.
                                        </p>
                                    </div>
                                </div>

                                {/* connect button */}

                                <div className='match-card-connect align-self-end'>
                                    <button type="button" className='match-card-button'> <img src={connectIcon} alt="connect icon" className='match-card-icon pulsate-bck' />
                                    </button>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </>

    )

}