import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import userServices from "../../services/userServices";
import matchServices from "../../services/matchServices";
import { MatchMiniCard } from "../../components/matchMiniCard.jsx"


export const YourMatches = () => {
    const navigate = useNavigate()
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        matchServices.getAllMatchesInfo(store.user?.id).then(data => dispatch({ type: "getAllMatchesInfo", payload: data.matches }))
    }, [])

    const handleLogout = () => {
        dispatch({ type: 'logout' })
        navigate('/')
    }

    // modificar endpoint de get a match con el posit que está pegado al ordenador
    // a la card se le pasa lo necesario, solamente user_id, genero, nombre y juegos, (solo lo necesario!!!!), lo demás lo cogemos con un get_user_info en la página de detalles de ese usuario

    return  (
    <div className="container-fluid px-2 px-sm-4">
      <div className="row gy-4 d-flex justify-content-around">
        {store.userMatchesInfo &&
          store.userMatchesInfo.map((el) => (
            <div
              key={el.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"
            >
              <MatchMiniCard
                id={el.user_id}
                nickname={el.nickname}
                gender={el.gender}
                games={el.games}
                age={el.age}
                location={el.location}
              />
            </div>
          ))}
      </div>
    </div>
  );
}