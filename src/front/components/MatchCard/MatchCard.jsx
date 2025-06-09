import './MatchCard.css';
import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import connectIcon from "../../assets/img/logos/logo-app.png"
import { useEffect, useState } from 'react';
import searchMatchServices from '../../services/searchMatchServices';



export const MatchCard = ({ profile, }) => {

    const [avgStars, setAvgStars] = useState(0);

    useEffect(() => {

        // este IF se pone porque estamos con data de prueba, hay que quitarlo después (con esto evitamos la llamada a la API y no nos de error)
        if (profile?.stars !== undefined) {
            setAvgStars(profile.stars);
            return; 
        }

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



    useEffect(() => {
        const el = document.getElementById('connectButton');
        if (el) {
            new window.bootstrap.Tooltip(el, {
                boundary: document.body
            });
        }
    }, []);


    return (

        <>

            <div className="match-card-bg">
                <div className=' '>
                </div>
                <div className='d-flex justify-content-center'>
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6">

                        <div className="card matchCard">
                            <div className="card-body">
                                <div className='d-flex'>

                                    <div className='d-flex me-auto '>
                                        {/* profile pic */}
                                        <div className='rounded-circle '>
                                            <img src={profilePic4} alt="App Logo" className='match-profile-pic rounded-circle'></img>
                                        </div>
                                        <div>
                                            {/* user name */}
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                <h1 className="card-title mx-4 mt-3">{profile?.nick_name || 'undefined'}</h1>
                                                <h2 className="match-card-text-purple text-end mt-3">32</h2>
                                            </div>
                                            {/* stars */}
                                            <div className="d-flex justify-content-center mx-4">
                                                {console.log("avgStars:", avgStars)}
                                                {[...Array(5)].map((_, i) => (
                                                    <i
                                                        key={i}
                                                        className={`fa-star fa-2x ms-1 ${i < Math.round(avgStars) ? "fa-solid" : "fa-regular"}`}
                                                    ></i>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        {/* connect button */}
                                        <div className='match-card-connect'>
                                            <button id="connectButton" type="button" className='match-card-button'
                                                data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Connect">
                                                <img src={connectIcon} alt="connect icon" className='match-card-icon pulsate-bck' />
                                            </button>

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='d-flex align-items-start '>

                                <div className="card match-card-games mx-3 ">
                                    <div className="card-body">
                                        <div className="container mt-3">
                                            <div className="row">

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


                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card match-card-languages mx-3 mt-3">
                                    <div className="card-body ps-0">

                                        <div className="container mt-3">
                                            <div className="row">
                                                {/* Location */}
                                                <div className="col-12 col-sm-2 col-md-2 col-lg-2 mb-1">
                                                    <h5 className='ms-2'>
                                                        <i className="fa-solid fa-xl fa-globe"></i>
                                                    </h5>
                                                </div>
                                                <div className="col-12 col-sm-10 col-md-10 col-lg-10 d-flex justify-content-start ps-5">
                                                    <p className='match-card-text-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>{profile?.location || '-'}</p>
                                                </div>

                                                {/* Language */}
                                                <div className="col-12 col-sm-2 col-md-2 col-lg-2">
                                                    <h5 className='ms-2'>
                                                        <i className="fa-solid fa-xl fa-language"></i>
                                                    </h5>
                                                </div>
                                                <div className="col-12 col-sm-10 col-md-10 col-lg-10 d-flex justify-content-start ps-5">
                                                    <p className='match-card-text-purple text-end me-lg-4 me-md-3 me-sm-3 me-2'>{profile?.language || '-'} </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex'>

                                {/* preferences */}
                                <div className="card match-card-preferences mx-3 mt-3">
                                    <div className="card-body">
                                        <h5 className="ms-2 mb-1">Preferences</h5>
                                        <p className='match-card-text-purple ms-2'>
                                            {profile?.preferences || '-'}
                                        </p>
                                    </div>
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