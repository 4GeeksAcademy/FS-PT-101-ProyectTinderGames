import { useEffect, useState } from "react";
import { SearchMatchCard } from "../../components/SearchMatchCard/SearchMatchCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import searchMatchServices from "../../services/searchMatchServices";

export const SearchMate = () => {

  const [profiles, setProfiles] = useState([])
  const [currentUser, setCurrentUser] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {

    const timeout = setTimeout(() => {
      setShowLoadingMessage(true)
    }, 3000) // Para que el mensaje loading salga si la espera es mayor de 3 segundos

    const getAllUsers = async () => {
      setLoading(true)
      const data = await searchMatchServices.getMatchProfiles()

      let allProfiles = []

      if (Array.isArray(data)) {
        allProfiles = data
      } else if (data.profiles && Array.isArray(data.profiles)) {
        allProfiles = data.profiles
      }

      if (store.user && store.user.profile) {
        allProfiles = allProfiles.filter(
          (profile) => profile.id !== store.user.profile.id // el id que se muestra en la tarjeta no es el mismo que el id del usuario/profile logeado
        );
      }
    
    setProfiles(allProfiles)
    setLoading(false)
    clearTimeout(timeout)
  };
    getAllUsers();

    return () => clearTimeout(timeout)

}, [store.user]);


const handleNext = () => {
  setCurrentUser((prevIndex) => (prevIndex + 1)); // Para que muestre todas las tarjetas de todos los ususarios
}

// Muestra el spinner y el mensaje cuando está cargando las tarjetas
if (loading && showLoadingMessage) {
  return <h2> <div className="spinner align-self-center"></div> Loading players. Thank you for your patience{" "}
    {store.user ? store.user.profile != undefined ? store.user.profile?.nick_name : null : null}</h2>
}

//Muestra mensaje si ya no quedan jugadores disponibles
if (!loading && currentUser >= profiles.length) {
  return <h2 className="text-center mt-5"> Sorry {store.user ? store.user.profile != undefined ? store.user.profile.nick_name : null : null}, there are no more players around. Try later!</h2>
}

return (

  <SearchMatchCard profile={profiles[currentUser]} onLike={handleNext} onDislike={handleNext}
  />

)
};