export const initialStore = () => {
  return {
    user: JSON.parse(localStorage.getItem("user")) || null,
    userMatchesInfo: null,
    matchInfo: null,
    matchProfiles: null,
    starsByUser: null,
    likesSent: JSON.parse(localStorage.getItem("likesSent")) || [],
    dislikesSent: JSON.parse(localStorage.getItem("dislikesSent")) || [],
    likesReceived: JSON.parse(localStorage.getItem("likesReceived")) || [],
    dislikesReceived:
      JSON.parse(localStorage.getItem("dislikesReceived")) || [],
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "saveDislikesReceived":
      const updatedDislikesReceived = [
        ...(store.dislikesReceived || []),
        ...action.payload,
      ];
      localStorage.setItem(
        "dislikesReceived",
        JSON.stringify(updatedDislikesReceived)
      );
      return {
        ...store,
        dislikesReceived: updatedDislikesReceived,
      };

    case "saveLikesReceived":
      const updatedLikesReceived = [
        ...(store.likesReceived || []),
        ...action.payload,
      ];
      localStorage.setItem(
        "likesReceived",
        JSON.stringify(updatedLikesReceived)
      );
      return {
        ...store,
        likesReceived: updatedLikesReceived,
      };

    case "saveDislike":
      const updatedDislikes = [...(store.dislikesSent || []), action.payload];
      localStorage.setItem("dislikesSent", JSON.stringify(updatedDislikes));
      return {
        ...store,
        dislikesSent: updatedDislikes,
      };
    case "saveLike":
      const updatedLikes = [...(store.likesSent || []), action.payload];
      localStorage.setItem("likesSent", JSON.stringify(updatedLikes));
      return {
        ...store,
        likesSent: updatedLikes,
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
      localStorage.removeItem("likesSent");
      localStorage.removeItem("dislikesSent");
      localStorage.removeItem("likesReceived");
      localStorage.removeItem("dislikesReceived");
      return {
        ...store,
        user: null,
        likesSent: [],
        dislikesSent: [],
        likesRecieved: [],
        dislikesRecieved: [],
        l,
      };
    case "getUserInfo":
      return {
        ...store,
        user: action.payload,
      };
  }
}
