import "../../pages/Privateviews/Search-mate.css";
import { useEffect, useState } from "react";
import { SearchMatchCard } from "../../components/SearchMatchCard/SearchMatchCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import searchMatchServices from "../../services/searchMatchServices";
import { ItsMatch } from "../../components/ItsMatch/ItsMatch";
import { useNavigate } from "react-router-dom";

export const SearchMate = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  // Para el modal del match y el componente match
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchProfile, setMatchProfile] = useState(null);

  useEffect(() => {
    if (!store.user) {
      navigate('/')
    }
  })
  useEffect(() => {
    if (!store.user || !store.user.profile?.id) return;

    const timeout = setTimeout(() => {
      setShowLoadingMessage(true);
    }, 3000);

    if (store.searchMatchProfiles && store.searchMatchProfiles.length > 0) {
      setLoading(false);
      clearTimeout(timeout);
      return;
    }

    const getProfiles = async () => {
      setLoading(true);
      try {
        const data = await searchMatchServices.getFilteredProfiles(store.user.profile.id);

        console.log("Perfiles filtrados por likes/dislikes-->", data);

        let allProfiles = [];

        if (Array.isArray(data)) {
          allProfiles = data;
        } else if (data.profiles && Array.isArray(data.profiles)) {
          allProfiles = data.profiles;
        }

        dispatch({ type: "getSearchMatchProfiles", payload: allProfiles });
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    };

    getProfiles();

    return () => clearTimeout(timeout);
  }, [store.user, dispatch]);


  // Resetear currentUser si cambia la lista de perfiles
  useEffect(() => {
    setCurrentUser(0);
  }, [store.searchMatchProfiles]);


  // Factorizar avance para no repetir lógica
  const advanceToNextProfile = () => {
    setCurrentUser((prev) => prev + 1);
    const remainingProfiles = store.searchMatchProfiles.filter(
      (_, index) => index !== currentUser
    );
    dispatch({ type: "getSearchMatchProfilesFiltered", payload: remainingProfiles });
    setCurrentUser(0);
  };

  //Maneja los likes
  //Maneja los likes
  const handleLike = async () => {
    const likedProfile = store.searchMatchProfiles[currentUser];
    if (!store.user?.profile?.id || !likedProfile?.id) return;

    try {
      const response = await searchMatchServices.addLikeSent(
        store.user.profile.id,
        likedProfile.id
      );

      console.log("Respuesta addLikeSent:", response);

      const matchesData = await searchMatchServices.getUserMatchesInfo(store.user.profile.id);
      console.log("matchesData:", matchesData);

      // Extraemos el array de matches
      const matchesArray = matchesData.matches || [];

      // Buscamos si hay match por user_id (igual al likedProfile.id)
      const matchedProfile = matchesArray.find((m) => m.user_id === likedProfile.id);

      if (matchedProfile) {
        // Buscamos el perfil completo en store.searchMatchProfiles usando user_id
        const fullProfile = store.searchMatchProfiles.find(
          (p) => p.user_id === matchedProfile.user_id
        );

        if (fullProfile) {
          setMatchProfile(fullProfile);
          dispatch({ type: "getItsMatchInfo", payload: fullProfile });
        } else {
          // Si no está en el store, usamos el matchedProfile tal cual
          setMatchProfile(matchedProfile);
          dispatch({ type: "getItsMatchInfo", payload: matchedProfile });
        }

        setShowMatchModal(true);

        setTimeout(() => {
          dispatch({ type: "saveLike", payload: likedProfile });

          const remainingProfiles = store.searchMatchProfiles.filter(
            (_, index) => index !== currentUser
          );

          dispatch({
            type: "getSearchMatchProfilesFiltered",
            payload: remainingProfiles,
          });

          setCurrentUser(0);
        }, 500);
      } else {
        dispatch({ type: "saveLike", payload: likedProfile });
        advanceToNextProfile();
      }
    } catch (error) {
      console.error("Error en handleLike:", error);
    }
  };


  //Maneja los dislikes
  const handleDislike = async () => {
    const dislikedProfile = store.searchMatchProfiles[currentUser];
    if (!store.user?.profile?.id || !dislikedProfile?.id) return;

    try {
      await searchMatchServices.addDislikeSent(
        store.user.profile.id,
        dislikedProfile.id
      );
      dispatch({ type: "saveDislike", payload: dislikedProfile });
    } catch (error) {
      console.error("Error sending dislike:", error);
    } finally {
      setCurrentUser((prev) => prev + 1);
      const remainingProfiles = store.searchMatchProfiles.filter(
        (_, index) => index !== currentUser
      );
      dispatch({ type: "getSearchMatchProfiles", payload: remainingProfiles });
      setCurrentUser(0);
    }

  };

  //Maneja el modal
  const closeMatchModal = () => {
    setShowMatchModal(false);
    setMatchProfile(null);
    dispatch({ type: "getItsMatchInfo", payload: null });
  };

  //Mensaje si tarda al cargar nuevos users
  if (loading && showLoadingMessage) {
    return (
      <h2>
        <div className="spinner align-self-center search-mate-font"></div> Loading new players. Thank you for your patience{" "}
        {store.user?.profile?.nick_name || "player"}
      </h2>
    );
  }

  //Mensaje que muestra si no hay más users
  if (!loading && !showMatchModal && currentUser >= (store.searchMatchProfiles?.length || 0)) {
    return (
      <h2 className="text-center mt-5 search-mate-font">
        Sorry {store.user?.profile?.nick_name || "player"}, there are no more players around. Try later!
      </h2>
    );
  }


  return (
    <>


      {showMatchModal && matchProfile ? (
        <>
          <div className="d-flex justify-content-center align-items-center search-mate-font ">
            <div>
              <h1 className="title-its-match-card-font-shadow mt-2 mb-3">It's a match</h1>
            </div>
            <div>
              <button
                type="button"
                className="btn-close ms-3 search-mate-btn-close-modal"
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
        <>
          <div className="d-flex justify-content-center">
            <h1 className="search-mate-font">
              Search a mate {store.user?.profile.nick_name ? store.user.profile.nick_name : 'undefinied'} {store.user?.id}
            </h1>
          </div>

          {store.searchMatchProfiles &&
            store.searchMatchProfiles.length > 0 &&
            store.searchMatchProfiles[currentUser] && (
              <SearchMatchCard
                profile={store.searchMatchProfiles[currentUser]}
                onLike={handleLike}
                onDislike={handleDislike}
              />
            )}
        </>
      )}
    </>
  );
};
