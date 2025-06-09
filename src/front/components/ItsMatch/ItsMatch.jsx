import './ItsMatch.css';
import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import connectIcon from "../../assets/img/logos/logo-app.png"
import { useEffect, useState } from 'react';
import searchMatchServices from '../../services/searchMatchServices';
import { useNavigate } from 'react-router-dom';



export const ItsMatch = ({ profile, }) => {

    const [avgStars, setAvgStars] = useState(0);
    const navigate = useNavigate()

    useEffect(() => {

        // esto se pone porque estamos con data de prueba, hay que quitarlo después (con esto evitamos la llamada a la API y no nos de error)
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

    const handleClick = () => {
        navigate('/private/your-matches') //Falta hacerlo dinámico cuando el match sea real
    }
    return (

        <>
            <div className='d-flex justify-content-center'>
                <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="card its-match-card">
                        <div className="card-body">
                            <div className='d-flex'>
                                <div className='me-auto '>
                                    {/* profile pic */}
                                    <div className='rounded-circle '>
                                        <img src={profilePic4} alt="App Logo" className='its-match-profile-pic rounded-circle'></img>
                                    </div>
                                    <div>
                                        {/* user name */}
                                        <h2 className="card-title mx-4 mt-3">{profile?.nick_name || 'undefined'}</h2>
                                    </div>

                                    {/* connect button */}
                                    <button
                                        onClick={handleClick}
                                        id="connectButton"
                                        type="button"
                                        className='its-match-card-button'
                                        data-bs-toggle="tooltip"
                                        data-bs-placement="left"
                                        data-bs-title="Find more about your match">
                                        <img src={connectIcon} alt="connect icon" className='its-match-card-icon pulsate-bck' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )

}