
import logoApp from "../assets/img/logos/logo-app.png";
import './navbarHome.css'
import { Register } from "./Register/Register";
import { SignIn } from "./SignIn/SignIn";
import { useEffect, useState } from "react";



export const NavbarHome = () => {
  
  const [showSignIn, setShowSignIn] = useState(true);


  // Para que siempre se muestre Sing-In el primero
  useEffect(() => {
    const modalElement = document.getElementById("exampleModal");

    function handleShow() {
      setShowSignIn(true)
    }

    if (modalElement) {
      modalElement.addEventListener("show.bs.modal", handleShow);
    }

    return () => {
      if (modalElement) {
        modalElement.removeEventListener("show.bs.modal", handleShow);
      }
    };
  }, []);


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-black navbar-home-font border-bottom ">
        <div className="container-fluid">
          {/* Logo y nombre de la app */}
          <div className="d-flex align-items-center">
            <a className="navbar-brand" href="#" />
            <img src={logoApp} alt="App Logo" className="d-inline-block align-text-top logo-navbar-home"></img>
            <a className="navbar-brand navbar-home-font navbar-home-font-shadow " href="#">PLAYERLINK</a>
          </div>
          {/* boton fuera del collapse */}
          <button className="navbar-toggler border-2 navbar-home-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          {/*collapse del navbar */}
          <div className="collapse navbar-collapse navbar-home-collapse border-2 navbar-home-toggler" id="navbarNav">
            <div className="d-flex align-items-center justify-content-around ms-5">
              <ul className="navbar-nav">
                <div className="d-flex justify-content-around align-self-center">

                  <li className="nav-item">
                    <a className="nav-link navbar-home-font me-5" href="#howitworks">How It Works</a>

                  </li>
                  <li className="nav-item">
                    <a className="nav-link active navbar-home-font me-5" aria-current="page" href="#bestpractices">Best Practices</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link navbar-home-font me-5" href="#aboutus">About Us</a>
                  </li>
                </div>
                <li className="nav-item">
                  <div className="navbar-home-start-container">

                    {/* Modal button */}
                    <button
                      type="button" className="btn navbar-home-font navbar-home-btn pulsate-bck" data-bs-toggle="modal" data-bs-target="#startModal">
                      START
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </nav>

      {/* modal body */}
      <div className="modal fade" id="startModal" tabIndex="-1" aria-labelledby="startModalLabel" aria-hidden="true" data-bs-backdrop="false">
        <div className="modal-dialog ">
          <div className="modal-content modal-home ">
            <div className="modal-header border-0 mt-5">
              <div className="modal-body d-flex">
                <div>
                  {showSignIn ? (
                    <SignIn onSwitch={() => setShowSignIn(false)} />
                  ) : (
                    <Register onSwitch={() => setShowSignIn(true)} />
                  )}
                </div>
                <div>
                  <button type="button" className="btn-close btn-close-modal" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )





}