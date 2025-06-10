import { useEffect, useState } from "react";
import { SearchMatchCard } from "../../components/SearchMatchCard/SearchMatchCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import searchMatchServices from "../../services/searchMatchServices";
import { ItsMatch } from "../../components/ItsMatch/ItsMatch";


export const SearchMate = () => {

  const [profiles, setProfiles] = useState([])
  const [currentUser, setCurrentUser] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const { store, dispatch } = useGlobalReducer();

  const [fakeMatch, setFakeMatch] = useState(false); // Estado para simular match


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
        // IDs de perfiles que ya diste like o dislike
        const likedIds = store.likes?.map(p => p.id) || [];
        const dislikedIds = store.dislikes?.map(p => p.id) || [];

        // Filtramos para excluir al usuario actual y los perfiles ya evaluados
        allProfiles = allProfiles.filter(
          (profile) =>
            profile.id !== store.user.profile.id &&
            !likedIds.includes(profile.id) &&
            !dislikedIds.includes(profile.id)
        );
      }

      setProfiles(allProfiles)
      setLoading(false)
      clearTimeout(timeout)
    };
    getAllUsers();

    return () => clearTimeout(timeout)

  }, [store.user, store.likes, store.dislikes]); //para que se actualice el user, los likes y los dislikes


  // Simula un match después de 3 segundos (puedes ajustar el tiempo)
  useEffect(() => {
    const matchTimeout = setTimeout(() => {
      setFakeMatch(true);
    }, 3000);

    return () => clearTimeout(matchTimeout);
  }, []);

  const handleNext = () => {
    const dislikedProfile = profiles[currentUser];
    dispatch({ type: "saveDislike", payload: dislikedProfile });
    setCurrentUser((prevIndex) => prevIndex + 1);
  };

  const handleLike = async () => { //Maneja el LIKE button para mandar la información a la API y para que cambie de tarjeta
    const likedProfile = profiles[currentUser];
    if (!store.user?.profile?.id || !likedProfile?.id) return;

    try {
      // Enviar el like a la API usando el servicio
      const response = await searchMatchServices.sendLike(store.user.profile.id, likedProfile.id);

      // Guardar el match (si existe)
      dispatch({ type: "getMatchInfo", payload: response });


      // Guardar el perfil al que se le dio like en el store (aunque no haya match)
      dispatch({ type: "saveLike", payload: likedProfile });

      // Mostrar modal si hubo match
      if (response.match) {
        alert("¡Es un match!");
      }

    } catch (error) {
      console.error(error);
    } finally {
      setCurrentUser((prev) => prev + 1);  // Avanzar al siguiente perfil
    }
  };



  // Muestra el spinner y el mensaje cuando está cargando las tarjetas
  if (loading && showLoadingMessage) {
    return <h2> <div className="spinner align-self-center"></div> Loading players. Thank you for your patience{" "}
      {store.user ? store.user.profile != undefined ? store.user.profile?.nick_name : null : null}</h2>
  }

  //Muestra mensaje si ya no quedan jugadores disponibles
  if (!loading && currentUser >= profiles.length) {
    return <h2 className="text-center mt-5"> Sorry {store.user ? store.user.profile != undefined ? store.user.profile.nick_name : null : null}, there are no more players around. Try later!</h2>
  }


  // Perfil de prueba para el match simulado
  const mockedProfile = {
    id: 2,
    nick_name: "pepe.pe_el fantasticooooo",
  };

  return (
    <>
      {!fakeMatch && (
        <div className='d-flex justify-content-center '>
          <h1 className='search-match-card-font-shadow '>
            Search a mate
          </h1>
        </div>
      )}

      {/* Modal para el MatchCard */}
      {fakeMatch && (

        <>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <h1 className='title-its-match-card-font-shadow mt-2 mb-3'>
                It's a match
              </h1>
            </div>
            <div>
              <button
                type="button"
                className="btn-close ms-3 btn-close-modal"
                onClick={() => setFakeMatch(false)}
              >
              </button>
            </div>
          </div>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <ItsMatch profile={mockedProfile} />
              </div>

            </div>
          </div>
        </>
      )}

      {/* La tarjeta de search a mate cuando no hay match */}
      {(
        !fakeMatch && profiles.length > 0 && profiles[currentUser] && ( //Para que cuando la tarjeta se cargue, ya tenga toda la info del user y lo sagan datos undefined
          <SearchMatchCard
            profile={profiles[currentUser]}
            onLike={handleLike}
            onDislike={handleNext}
          />
        )
      )}
    </>

  )
};