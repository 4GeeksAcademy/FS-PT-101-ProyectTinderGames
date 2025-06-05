
import { MatchCard } from "../components/MatchCard/MatchCard"
import { Register } from "../components/Register/Register"
import { SearchMatchCard } from "../components/SearchMatchCard/SearchMatchCard"
import { SignIn } from "../components/SignIn/SignIn"




export const RegisterLoginTest = () => {
  return (
    <>
      <Register/>
      <SignIn/> 
      <SearchMatchCard/>
      <MatchCard/>
 
    </>
  )

}