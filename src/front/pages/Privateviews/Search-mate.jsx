import "../../pages/Privateviews/Search-mate.css";
import { useEffect, useState } from "react";
import { SearchMatchCard } from "../../components/SearchMatchCard/SearchMatchCard";
import useGlobalReducer from "../../hooks/useGlobalReducer";
import searchMatchServices from "../../services/searchMatchServices";
import { ItsMatch } from "../../components/ItsMatch/ItsMatch";

export const SearchMate = () => {
  const { store, dispatch } = useGlobalReducer();

  const [currentUser, setCurrentUser] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);

  // Para el modal del match y el componente match
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [matchProfile, setMatchProfile] = useState(null);


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

  const handleLike = async () => {
    const likedProfile = store.searchMatchProfiles[currentUser];
    if (!store.user?.profile?.id || !likedProfile?.id) return;

    try {
      const response = await searchMatchServices.addLikeSent(
        store.user.profile.id,
        likedProfile.id
      );

      // 1. Guardar el like en local (modal)
      if (response && response.id) {
        const currentUserId = store.user.profile.id;
        const matchedUserId =
          response.liker_id === currentUserId
            ? response.liked_id
            : response.liker_id;

        let matchedProfile = store.searchMatchProfiles.find(
          (p) => p.id === matchedUserId
        );

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

          // Aquí actualizas el estado global con la info del match
          dispatch({ type: "getItsMatchInfo", payload: matchedProfile })

          // Esperar un poco antes de modificar el store (para que el modal se vea)
          setTimeout(() => {
            dispatch({ type: "saveLike", payload: likedProfile });

            // Remover perfil del store
            const remainingProfiles = store.searchMatchProfiles.filter(
              (_, index) => index !== currentUser
            );
            dispatch({
              type: "getSearchMatchProfilesFiltered",
              payload: remainingProfiles
            });

            setCurrentUser(0);
          }, 500); // 500ms o menos si querés más instantáneo
        } else {
          // Si no hubo match, seguir flujo normal
          dispatch({ type: "saveLike", payload: likedProfile });
          advanceToNextProfile();
        }
      } else {
        // Si no hubo match, seguir flujo normal
        dispatch({ type: "saveLike", payload: likedProfile });
        advanceToNextProfile();
      }

    } catch (error) {
      console.error("Error en handleLike:", error);
    }
  };

  // Factorizar avance para no repetir lógica
  const advanceToNextProfile = () => {
    setCurrentUser((prev) => prev + 1);
    const remainingProfiles = store.searchMatchProfiles.filter(
      (_, index) => index !== currentUser
    );
    dispatch({ type: "getSearchMatchProfilesFiltered", payload: remainingProfiles });
    setCurrentUser(0);
  };


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

  const closeMatchModal = () => {
    setShowMatchModal(false);
    setMatchProfile(null);
  };

  if (loading && showLoadingMessage) {
    return (
      <h2>
        <div className="spinner align-self-center search-mate-font"></div> Loading new players. Thank you for your patience{" "}
        {store.user?.profile?.nick_name || "player"}
      </h2>
    );
  }

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
              Search a mate {store?.user.profile.nick_name} {store?.user.id}
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
