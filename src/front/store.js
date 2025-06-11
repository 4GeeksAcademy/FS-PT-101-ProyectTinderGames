export const initialStore = () => {
  return {
    user: JSON.parse(localStorage.getItem("user")) || null,
    userMatchesInfo: null,
    matchInfo: null,
    likesSent: JSON.parse(localStorage.getItem("likesSent")) || [],
    dislikesSent: JSON.parse(localStorage.getItem("dislikesSent")) || [],
    starsByUser: null,
    matchProfiles: null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "saveLike":
      const updatedLikes = [...store.likesSent, action.payload];
      localStorage.setItem("likesSent", JSON.stringify(updatedLikes));
      return {
        ...store,
        likesSent: updatedLikes,
      };

    case "saveDislike": {
      const updatedDislikes = [...store.dislikesSent, action.payload];
      localStorage.setItem("dislikesSent", JSON.stringify(updatedDislikes));
      return {
        ...store,
        dislikesSent: updatedDislikes,
      };
    }

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
      localStorage.removeItem("likesSent");
      localStorage.removeItem("dislikesSent");

      return {
        ...store,
        user: null,
        likesSent: [],
        dislikesSent: [],
        userMatchesInfo: null,
        starsByUser: null,
        matchProfiles: null,
      };

    case "getUserInfo":
      return {
        ...store,
        user: action.payload,
      };
  }
}
