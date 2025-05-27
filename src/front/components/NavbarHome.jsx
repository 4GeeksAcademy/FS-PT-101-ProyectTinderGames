import logoApp from "../assets/img/logos/logo-app.png";
import './navbarHome.css'

export const NavbarHome =() => {


return(
<nav className="navbar navbar-expand-lg bg-black navbarHome-font fixed-height-navbarHome ">
  <div className="container">
    <div className="d-flex align-items-center">
    <a className="navbar-brand" href="#"/>
      <img src={logoApp} alt="App Logo" className="d-inline-block align-text-top logo-navbarHome"></img>
    <a className="navbar-brand navbarHome-font nabarHome-font-shadow" href="#">PLAYERLINK</a>
    </div>
    <div>

    <button className="navbar-toggler border border-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse " id="navbarNav">
      <ul className="navbar-nav">
        <div className="d-flex align-items-center">

        <li className="nav-item">
          <a className="nav-link active navbarHome-font me-5" aria-current="page" href="#">Best Practices</a>
        </li>
        <li className="nav-item">
          <a className="nav-link navbarHome-font me-5" href="#">How it works</a>
        </li>
        <li className="nav-item">
          <a className="nav-link navbarHome-font me-5" href="#">About Us</a>
        </li>
        </div>
        <li className="nav-item">
          

          <div className="navbarHome-start-container">
  <div className="navbarHome-line navbarHome-top-line"></div>
<a className="nav-link navbarHome-font nabarHome-font-shadow" href="#">START</a>  
<div className="navbarHome-line navbarHome-bottom-line"></div>
</div>
        </li>
      </ul>
    </div>
    </div>
  </div>
</nav>
)





}