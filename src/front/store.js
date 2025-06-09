export const initialStore = () => {
  return {
    user: JSON.parse(localStorage.getItem("user")) || null,
    userMatchesInfo: null,
    matchInfo: null,
    matchProfiles: null,
    starsByUser: null,
    likesSent: [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "saveLike":
      return {
        ...store,
        likesSent: [...(store.likesSent || []), action.payload], // agrega el perfil likedo
      };
    case "addLikeSent":
      return {
        ...store,
        likesSent: [...store.likesSent, action.payload],
      };

    case "getMatchProfiles":
      return {
        ...store,
        matchProfiles: action.payload,
      };
    case "getStarsByUser":
      return {
        ...store,
        starsByUser: action.payload,
      };

    case "getMatchInfo":
      return {
        ...store,
        matchInfo: action.payload,
      };
    case "getAllMatchesInfo":
      return {
        ...store,
        userMatchesInfo: action.payload,
      };
    case "logout":
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return {
        ...store,
        user: null,
      };
    case "getUserInfo":
      return {
        ...store,
        user: action.payload,
      };
  }
}
