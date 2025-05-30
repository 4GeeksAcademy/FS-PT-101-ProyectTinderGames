// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { Register_page } from "./pages/Register_page";
import { Login_page } from "./pages/Login_page";
import { Private_page } from "./pages/Private_page";
import { PrivateLayout } from "./components/Private/Private-layout";
import { Profile } from "./pages/Privateviews/Profile";
import { SearchMate } from "./pages/Privateviews/Search-mate";
import { YourMatches } from "./pages/Privateviews/Your-matches";
import { FindGames } from "./pages/Privateviews/Find-games";
import { Settings } from "./pages/Privateviews/Settings";


export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/register" element={<Register_page />} />
      <Route path="/login" element={<Login_page />} />
      {/* dejo comentario para separar vistas públicas de las privadas */}
      <Route path="/private" element={<PrivateLayout />}>
        <Route index element={<Private_page />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search-a-mate" element={<SearchMate />} />
        <Route path="your-matches" element={<YourMatches />} />
        <Route path="find-games" element={<FindGames />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/privateside" element={<PrivateLayout />} />  {/* esta ruta la tengo para ver solo la sidebar cuando la esté manejando. */}

    </Route >
  )
);