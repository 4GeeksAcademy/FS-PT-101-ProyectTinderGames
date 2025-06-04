import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Private-sidebar";
import { PrivateNavbar } from "./Private-navbar"; {/* la dejo inactiva por que me sale siempre, cuando la quitemos del diseño main, la re-activo*/ }
import "../Private/private-layout.css"
{/*path.. privateside*/}

export const PrivateLayout = () => {
  const location = useLocation();

  return (
    <div className="private-layout">
      <PrivateNavbar/>
      {/*<PrivateNavbar />*/}
      <div className="private-layout-body">
        <Sidebar activePath={location.pathname} />
        <main className="private-content backgorundPrivateLayout">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
