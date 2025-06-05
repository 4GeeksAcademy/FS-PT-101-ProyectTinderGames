import { useEffect, useState } from "react";
import { SearchMatchCard } from "../../components/SearchMatchCard/SearchMatchCard";
import userServices from "../../services/userServices";
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const SearchMate = () => {

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(0)
  const [loading, setLoading] = useState(true)
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const getUsers = async () => {
      const data = await userServices.getUsers()
      setUsers(data)
      setLoading(false)

    }
    getUsers()
  }, [])

  const handleNext = () => {
    setCurrentUser((prevIndex) => (prevIndex + 1) % users.length); // Para que muestre todas las tarjetas de todos los ususarios
  };

  // Muestra el spinner y el mensaje cuando está cargando las tarjetas
  if (loading) return <div> <div className="spinner align-self-center"></div> Loading players. Thank you for your patience{" "}
  {store.user ? store.user.profile != undefined ? store.user.profile.nick_name : null :  null}
    </div>

  //Muestra mensaje si ya no quedan jugadores disponibles
  if (currentUser >= users.length) {
    return <p className="text-center mt-5"> Sorry {store.user ? store.user.profile != undefined ? store.user.profile.nick_name : null :  null}. There are no more players around</p>;
  }

  return (

    <SearchMatchCard user={users[currentUser]} onLike={handleNext} onDislike={handleNext}
    />

  )
};