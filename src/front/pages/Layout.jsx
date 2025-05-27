import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import {PrivateNavbar} from "../components/Private/Private-navbar"
import { Footer } from "../components/Footer"



// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            <PrivateNavbar />
  
            {/* <Navbar /> */}
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}