
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

  //Para el modal del match y el componente match
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchProfile, setMatchProfile] = useState(null);

  useEffect(() => {

    const timeout = setTimeout(() => {
      setShowLoadingMessage(true)
    }, 3000) // Para que el mensaje loading salga si la espera es mayor de 3 segundos


    const getProfiles = async () => {
      setLoading(true)
      const data = await searchMatchServices.getAllProfiles()

      let allProfiles = []

      if (Array.isArray(data)) {
        allProfiles = data
      } else if (data.profiles && Array.isArray(data.profiles)) {
        allProfiles = data.profiles
      }

      if (store.user && store.user.profile) {
        // IDs de perfiles que ya diste like o dislike
        const likedIds = store.likesSent?.map(p => p.id) || [];
        const dislikedIds = store.dislikesSent?.map(p => p.id) || [];

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
    getProfiles();

    return () => clearTimeout(timeout)

  }, [store.user, store.likesSent, store.dislikesSent, store.matchProfiles]); //para que se actualice el user, los likes envíados y los dislikes enviados y los matches




    const handleLike = async () => {
  const likedProfile = profiles[currentUser];
  if (!store.user?.profile?.id || !likedProfile?.id) return;

  try {
    const response = await searchMatchServices.addLikeSent(
      store.user.profile.id,
      likedProfile.id
    );

    console.log("Like response --->: ", response);

    // Guardar like localmente
    dispatch({ type: "saveLike", payload: likedProfile });

    // Usar directamente el response como matchData
    const matchData = response;

    // Aquí decides si response indica match (quizá si tiene id, liked_id y liker_id)
    if (matchData && matchData.id) {
      const currentUserId = store.user.profile.id;
      const matchedUserId =
        matchData.liker_id === currentUserId
          ? matchData.liked_id
          : matchData.liker_id;

      let matchedProfile = profiles.find((p) => p.id === matchedUserId);

      if (!matchedProfile) {
        try {
          matchedProfile = await searchMatchServices.getOneProfile(matchedUserId);
        } catch (error) {
          console.error("Error fetching matched profile--->", error);
        }
      }

      if (matchedProfile) {
        setMatchProfile(matchedProfile);
        setShowMatchModal(true);
        console.log("Showing match modal--->:", matchedProfile);
      }
    } else {
      console.log("No match for this response");
    }

    // Actualiza el store con el match (si aplica)
    dispatch({ type: "getMatchProfiles", payload: response });
  } catch (error) {
    console.error("Error en handleLike:", error);
  } finally {
    setCurrentUser((prev) => prev + 1);
  }
};


  const handleDislike = async () => { // Maneja el Dislike button
    const dislikedProfile = profiles[currentUser];
    if (!store.user?.profile?.id || !dislikedProfile?.id) return;
    console.log("Dislike response:----->", dislikedProfile);

    try {
      // Envia el dislike a la API usando el servicio
      await searchMatchServices.addDislikeSent(store.user.profile.id, dislikedProfile.id);

      // Guarda en el store local
      dispatch({ type: "saveDislike", payload: dislikedProfile });
    } catch (error) {
      console.error("Error sending dislike:", error);
    } finally {
      // Pasa al siguiente perfil
      setCurrentUser((prevIndex) => prevIndex + 1);
    }
  };

  const closeMatchModal = () => {
    setShowMatchModal(false);
    setMatchProfile(null);
  };


  // Muestra el spinner y el mensaje cuando está cargando las tarjetas
  if (loading && showLoadingMessage) {
    return (
      <h2>
        <div className="spinner align-self-center">
        </div> Loading new players. Thank you for your patience{" "}
        {store.user?.profile?.nick_name || "player"}
      </h2>)
  }

  //Muestra mensaje si ya no quedan jugadores disponibles
  if (!loading && currentUser >= profiles.length) {
    return (
      <h2 className="text-center mt-5">
        Sorry {store.user?.profile?.nick_name || "player"}, there are no more players around. Try later!
      </h2>)
  }


return (
  <>
    {showMatchModal && matchProfile ? (
      // Solo el modal cuando está activo
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
              onClick={closeMatchModal}
            />
          </div>
        </div>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <ItsMatch profile={matchProfile} />
            </div>
          </div>
        </div>
      </>
    ) : (
      // El resto de la UI cuando NO hay modal
      <>
        <div className='d-flex justify-content-center '>
          <h1 className='search-match-card-font-shadow '>
            Search a mate --- {store.user?.profile?.nick_name || "player"}
          </h1>
        </div>

        {profiles.length > 0 && profiles[currentUser] && (
          <SearchMatchCard
            profile={profiles[currentUser]}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        )}
      </>
    )}
  </>
);

};