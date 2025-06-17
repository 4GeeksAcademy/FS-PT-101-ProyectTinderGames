import './ItsMatch.css';
import profilePic4 from "../../assets/img/profile-pics/profile-pic-4.png";
import { useNavigate } from 'react-router-dom';




export const ItsMatch = ({ profile, }) => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/private/your-matches/') //Falta hacerlo dinámico cuando el match sea real (navigate(`/private/your-matches/${profile.id}`))
    }


    
    return (
        <>
            <div className='d-flex justify-content-center'>

                <div className="col">

                    <div onClick={handleClick} className="card its-match-card pulsate-bck">
                        <div className="d-flex align-items-start">

                            <div className="card-body d-flex flex-column flex-md-row align-items-center">
           
                            </div>
                            <div className='rounded-circle mb-3 mb-md-0'>
                                <img src={profilePic4} alt="App Logo" className='its-match-profile-pic border border-4 my-2'></img>
                            </div>
                            <div className="d-flex align-items-start">
                            <div className="text-center text-md-start ms-md-4 mt-2 me-3">
                                <h1>{profile?.nick_name || 'undefined'}</h1>
                            </div>

             
                                </div>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className='d-flex justify-content-center text-center mt-3'>
                Click on the card to know more about your match
            </h4>
        </>

    )

}