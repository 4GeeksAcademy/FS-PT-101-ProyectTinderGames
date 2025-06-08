// Home.jsx
import '../Home.css';
import { NavbarHome } from '../components/NavbarHome.jsx';
import carrusel1 from '../assets/img/carrusel/carrusel-1.png';
import carrusel2 from '../assets/img/carrusel/carrusel-2.png';
import carrusel3 from '../assets/img/carrusel/carrusel-3.png';
import carrusel4 from '../assets/img/carrusel/carrusel-4.png';
import logotarjeta from '../assets/img/logos/logo-tarjetas-about-us.png';
import React, { useEffect } from "react"

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {
	return (
		<>
			<NavbarHome />
			<div className="container-fluid">
				{/* Carrusel Bootstrap 5 */}
				<div className="row">
					<div className="col-12">
						<div
							id="carouselExample"
							className="carousel slide"
							data-bs-ride="carousel"
							data-bs-interval="30000"
						>
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img src={carrusel1} className="d-block w-100" alt="Primera imagen" />
								</div>
								<div className="carousel-item">
									<img src={carrusel2} className="d-block w-100" alt="Segunda imagen" />
								</div>
								<div className="carousel-item">
									<img src={carrusel3} className="d-block w-100" alt="Tercera imagen" />
								</div>
								<div className="carousel-item">
									<img src={carrusel4} className="d-block w-100" alt="Cuarta imagen" />
								</div>
							</div>
							<button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
								<span className="carousel-control-prev-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Anterior</span>
							</button>
							<button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
								<span className="carousel-control-next-icon" aria-hidden="true"></span>
								<span className="visually-hidden">Siguiente</span>
							</button>
						</div>
					</div>
				</div>
				{/* Fin carrusel */}
				{/* How It Works */}
				<section className="howitworks-section pb-5 text-white border-bottom border-top border-white py-5" id='howitworks'>
					<div className="container position-relative">
						<div className="d-flex align-items-start">
							{/* Contenido principal */}
							<div className="flex-grow-1">
								{/* Una sola fila: 1 col en xs, 2 en md, 4 en lg */}
								<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mb-2 pt-5">
									<div className="card">
										<div className="card-inner box text-center">
											<div className="card-front">
												<img src={logotarjeta} alt="logoapp" />
											</div>
											<div className="card-back p-2">Sing up on our app</div>
										</div>
									</div>
									<div className="card">
										<div className="card-inner box text-center">
											<div className="card-front">
												<img src={logotarjeta} alt="logoapp" />
											</div>
											<div className="card-back p-2">Fill in your user details</div>
										</div>
									</div>
								</div>
								<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mb-2 pb-5">
									<div className="card">
										<div className="card-inner box text-center">
											<div className="card-front">
												<img src={logotarjeta} alt="logoapp" />
											</div>
											<div className="card-back p-2">Swipe left or right</div>
										</div>
									</div>
									<div className="card">
										<div className="card-inner box text-center">
											<div className="card-front">
												<img src={logotarjeta} alt="logoapp" />
											</div>
											<div className="card-back p-2">Find your player match</div>
										</div>
									</div>
								</div>
							</div>

							{/* Texto vertical sólo en md+ */}
							<div className="vertical-title ms-4 d-none d-md-block align-self-center">
								HOW IT WORKS
							</div>
						</div>
					</div>
				</section>
				{/* Best Practices */}
				<section className="bestpractices-section py-5 text-white border-bottom border-white" id='bestpractices'>
					<div className="container position-relative">
						<div className="row d-flex align-items-center">

							{/* Texto vertical sólo en md+ */}
							<div className="vertical-title col-2">BEST PRACTICES</div>

							{/* Contenido principal */}
							<div className='col-10'>
								<div className="row mb-2 pt-5">
									<div className="card">
										<div className="card-inner box text-center">
											<div className="card-front">
												Be Yourself
											</div>
											<div className="card-back p-2">Share your real interests, favorite games, and play style—authenticity attracts the right squad.</div>
										</div>
									</div>
									<div className="card">
										<div className="card-inner box text-center">
											<div className="card-front">
												Respect Others
											</div>
											<div className="card-back p-2">Great communities are built on mutual respect. Avoid toxicity and support positive interactions.</div>
										</div>
									</div>
									<div className="card">
										<div className="card-inner box text-center">
											<div className="card-front">
												Stay Active
											</div>
											<div className="card-back p-2">Regularly join games and chats—consistency shows commitment and keeps your squad engaged.</div>
										</div>
									</div>
								</div>
								<div className="row mb-2 pt-5">
								<div className="card">
									<div className="card-inner box text-center">
										<div className="card-front">
											Use Match Filters Wisely
										</div>
										<div className="card-back p-2">Set your preferences (game genres, skill level, time zone) to find players that truly match your vibe."</div>
									</div>
								</div>
								<div className="card">
									<div className="card-inner box text-center">
										<div className="card-front">
											Give Feedback
										</div>
										<div className="card-back p-2">Rate your matches and report bad behavior—it helps keep the community safe and fun.</div>
									</div>
								</div>
								<div className="card">
									<div className="card-inner box text-center">
										<div className="card-front">
											Try New Games Together
										</div>
										<div className="card-back p-2">Explore new titles or challenges with your squad to build stronger connections.</div>
									</div>
								</div>
							</div>
							</div>
						</div>
					</div>
				</section>
				{/* About Us */}
				<section className="about-section py-5 text-white border-bottom" id="aboutus">
					<div className="container">
						<div className="row d-flex align-items-center gap-4 p-3 justify-content-around">
							{/* Columna del contenido (orígenes + quiénes somos) */}
							<div class="col-lg-4 col-sm-12  col-md-10 personalcard p-4 d-flex flex-column text-center tarjeta text-white">
								<div class="card-body">
									<h3 className="neon-heading mb-3">The origins</h3>
									<p className="flex-grow-1">
										Playerlink started as an academic project and, with dedication and passion, became what it is today: a web that links players around the world.
									</p>
								</div>
							</div>
							<div class="col-lg-4 col-sm-12  col-md-10 personalcard p-4 d-flex flex-column text-center tarjeta text-white">
								<div class="card-body">
									<h3 className="neon-heading mb-3">Who are we?</h3>
									<p className="flex-grow-1">
										We are a aquad of gaming enthusiast who know the real fun starts when we play together <br />
										Bryan, Alba & Toni
									</p>
								</div>
							</div>
							{/* Título vertical: solo se muestra en pantallas grandes */}
							<div className="col-lg-1  d-lg-flex justify-content-center">
								<div className="vertical-title">ABOUT US</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};
