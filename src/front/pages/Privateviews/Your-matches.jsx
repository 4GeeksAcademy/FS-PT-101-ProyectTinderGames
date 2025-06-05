import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import userServices from "../../services/userServices";


export const YourMatches = () => {
    const navigate = useNavigate()
    const {store, dispatch} = useGlobalReducer();

    useEffect (()=>{
        userServices.getUserInfo().then(data=> dispatch({type:'getUserInfo', payload: data.user}))
    },[])

    const handleLogout = () => {
        dispatch({type:'logout'})
        navigate('/')
    }

    // modificar endpoint de get a match con el posit que está pegado al ordenador
    // a la card se le pasa lo necesario, solamente user_id, genero, nombre y juegos, (solo lo necesario!!!!), lo demás lo cogemos con un get_user_info en la página de detalles de ese usuario
    
    return <div>
        {store.user && <div className="text-white">
            <p>esta es la vista privada</p>
            <p>el usuario que ha iniciado sesión es:</p>
            <p>{store.user?.email}</p>
            <button onClick={handleLogout}>LogOut</button>
            </div>}
    </div>
}