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
    const timeout = setTimeout(() => {
      setShowLoadingMessage(true);
    }, 3000);

    // Si ya tenemos perfiles en store, no hacemos fetch
    if (store.searchMatchProfiles && store.searchMatchProfiles.length > 0) {
      setLoading(false);
      clearTimeout(timeout);
      return;
    }

    const getProfiles = async () => {
      setLoading(true);
      try {
        const data = await searchMatchServices.getAllProfiles();

        console.log("Data recibida de la API:--->", data);

        let allProfiles = [];

        if (Array.isArray(data)) {
          allProfiles = data;
        } else if (data.profiles && Array.isArray(data.profiles)) {
          allProfiles = data.profiles;
        }

        if (store.user && store.user.profile) {
          const likedIds = store.likesSent?.map((p) => p.id) || [];
          const dislikedIds = store.dislikesSent?.map((p) => p.id) || [];
          

          allProfiles = allProfiles.filter(
            (profile) =>
              profile.id !== store.user.profile.id &&
              !likedIds.includes(profile.id) &&
              !dislikedIds.includes(profile.id)
          );
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
  }, [store.user, store.likesSent, store.dislikesSent, dispatch]);

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

      dispatch({ type: "saveLike", payload: likedProfile });

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
        }
      }

    } catch (error) {
      console.error("Error en handleLike:", error);
    } finally {
      setCurrentUser((prev) => prev + 1);
      const remainingProfiles = store.searchMatchProfiles.filter(
        (_, index) => index !== currentUser
      );
      dispatch({ type: "getSearchMatchProfiles", payload: remainingProfiles });
      setCurrentUser(0);

    }


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

  if (!loading && currentUser >= (store.searchMatchProfiles?.length || 0)) {
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
        <>
          <div className="d-flex justify-content-center">
            <h1 className="search-mate-font">
              Search a mate
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
