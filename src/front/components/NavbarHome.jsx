import logoApp from "../assets/img/logos/logo-app.png";


export const NavbarHome =() => {


return(
<nav class="navbar navbar-expand-lg bg-body-tertiary font-css">
  <div class="container">
    <div>

    <a class="navbar-brand" href="#"/>
      <img src={logoApp} alt="App Logo" width="30" height="24" class="d-inline-block align-text-top"></img>
    <a class="navbar-brand" href="#">PLAYERLINK</a>
    </div>
    <div>

    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Best Practices</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">How it works</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" aria-disabled="true">START</a>
        </li>
      </ul>
    </div>
    </div>
  </div>
</nav>
)





}