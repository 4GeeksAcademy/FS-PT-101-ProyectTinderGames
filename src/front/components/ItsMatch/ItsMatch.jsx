import './ItsMatch.css';
import { useNavigate } from 'react-router-dom';
import photo1 from "../../assets/img/profile-pics/profile-pic-1.png";
import photo2 from "../../assets/img/profile-pics/profile-pic-2.png";
import photo3 from "../../assets/img/profile-pics/profile-pic-3.png";
import photo4 from "../../assets/img/profile-pics/profile-pic-4.png";
import photo5 from "../../assets/img/profile-pics/profile-pic-5.png";
import photo6 from "../../assets/img/profile-pics/profile-pic-6.png";
import photo7 from "../../assets/img/profile-pics/profile-pic-7.png";
import photo8 from "../../assets/img/profile-pics/profile-pic-8.png";
import photo9 from "../../assets/img/profile-pics/profile-pic-9.png";




export const ItsMatch = ({ profile, photo }) => {

    const navigate = useNavigate()

        //Prevención de error si el perfil no existe
    if (!profile) return null;
    const handleClick = () => {
        navigate('/private/your-matches/')
    }

    console.log('ItsMatch profile:', profile);

    const selectPhoto = () => {
        const key = profile?.photo?.trim?.(); 
        switch (key) {
            case "photo1": return photo1;
            case "photo2": return photo2;
            case "photo3": return photo3;
            case "photo4": return photo4;
            case "photo5": return photo5;
            case "photo6": return photo6;
            case "photo7": return photo7;
            case "photo8": return photo8;
            case "photo9": return photo9;
            default: return photo1; 
        }
    };

    console.log('Profile photo string:', profile?.photo);

    return (
        <>
            <div className='d-flex justify-content-center'>

                <div className="col">

                    <div onClick={handleClick} className="card its-match-card pulsate-bck">
                        <div className="d-flex align-items-start">

                            <div className="card-body d-flex flex-column flex-md-row align-items-center">

                            </div>
                            <div className='rounded-circle mb-3 mb-md-0'>
                                <img src={selectPhoto()} alt="Profile avatar" className='its-match-profile-pic border border-4 my-2'></img>
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

            <h4 className='d-flex justify-content-center text-center mt-3 its-match-card-font'>
                Click on the card to know more about your match
            </h4>
        </>
    )

}