import { useEffect } from "react"
import userServices from "../services/userServices"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useParams } from "react-router-dom";

export const MatchUserDetails = () => {
    const {store, dispatch} = useGlobalReducer();
    const {id} = useParams();

    useEffect(()=>{
        userServices.getUserInfoById(id).then(data => dispatch({type:"getMatchInfo", payload:data}))
    },[])


    return <div>
        `user with id`
        <p>{id}</p>
    </div>
}