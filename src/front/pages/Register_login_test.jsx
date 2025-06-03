
import { MatchCard } from "../components/MatchCard/MatchCard"
import { NavbarHome } from "../components/NavbarHome"
import { Register } from "../components/Register/Register"
import { RegisterModal } from "../components/RegisterModal/RegisterModal"
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