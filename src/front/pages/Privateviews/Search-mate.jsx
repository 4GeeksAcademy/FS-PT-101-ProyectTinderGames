import { useEffect, useState } from "react";
import { SearchMatchCard } from "../../components/SearchMatchCard/SearchMatchCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import searchMatchServices from "../../services/searchMatchServices";
import { MatchCard } from "../../components/MatchCard/MatchCard";

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
        allProfiles = allProfiles.filter(
          (profile) => profile.id !== store.user.profile.id // Para que no salga el perfil del usuario logeado
        );
      }

      setProfiles(allProfiles)
      setLoading(false)
      clearTimeout(timeout)
    };
    getAllUsers();

    return () => clearTimeout(timeout)

  }, [store.user]);


  // Simula un match después de 3 segundos (puedes ajustar el tiempo)
  useEffect(() => {
    const matchTimeout = setTimeout(() => {
      setFakeMatch(true);
    }, 3000);

    return () => clearTimeout(matchTimeout);
  }, []);

  const handleNext = () => {
    setCurrentUser((prevIndex) => (prevIndex + 1)); // Para que muestre todas las tarjetas de todos los ususarios
  }
  

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
    id: 999,
    nick_name: "Prueba match",
    location: "Spain",
    language: "EN, ES",
    preferences: "Pruebaaaa!",
    stars: 4,
    games: [
      { game: { title: "Game One", hours_played: 120 } },
      { game: { title: "Game Two", hours_played: 45 } },
      { game: { title: "Game Three", hours_played: 78 } }
    ]
  };

  return (
    <>
      {!fakeMatch && (
        <div className='d-flex justify-content-center '>
          <h1 className='searchMateCard-font-shadow mt-2 mb-3'>
            Search a mate
          </h1>
        </div>
      )}

      {/* Modal para el MatchCard */}
      {fakeMatch && (

        <>
          <div className="d-flex justify-content-center align-items-center">
            <div>
              <h1 className='title-matchCard-font-shadow mt-2 mb-3'>
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
                <MatchCard profile={mockedProfile} />
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