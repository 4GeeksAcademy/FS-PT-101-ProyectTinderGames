import { useEffect } from "react"
import userServices from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useNavigate } from "react-router-dom"


export const Private_page = () => {
    const navigate = useNavigate()
    const {store, dispatch} = useGlobalReducer()

    useEffect (()=>{
        userServices.getUserInfo().then(data=> dispatch({type:'getUserInfo', payload: data.user}))
    },[])

    const handleLogout = () => {
        dispatch({type:'logout'})
        navigate('/')
    }
    
    return <div>
        {store.user && <div className="text-white">
            <p>esta es la vista privada</p>
            <p>el usuario que ha iniciado sesión es:</p>
            <p>{store.user?.email}</p>
            <button onClick={handleLogout}>LogOut</button>
            </div>}
    </div>
}