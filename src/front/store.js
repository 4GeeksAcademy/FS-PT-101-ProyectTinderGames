export const initialStore=()=>{
  return{
    user: JSON.parse(localStorage.getItem('user')) || null,
    userMatchesInfo: null,
    matchInfo: null,
    matchProfiles: null,
    starsByUser: null,
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case "getMatchProfiles":
      return {
        ...store,
        matchProfiles:action.payload
      }
    case "getStarsByUser":
      return {
        ...store,
        starsByUser: action.payload
      }

    case "getMatchInfo":
      return {
        ...store,
        matchInfo:action.payload
      }
    case "getAllMatchesInfo":
      return {
        ...store,
        userMatchesInfo:action.payload
      }
    case 'logout':
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      return {
        ...store,
        user: null
      }
    case 'getUserInfo':
      return{
        ...store,
        user: action.payload
      }
  }    
}
