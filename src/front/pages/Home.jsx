// Home.jsx
import React from 'react';
import '../Home.css';
import { NavbarHome } from '../components/NavbarHome.jsx';
import carrusel1 from '../assets/img/carrusel/carrusel-1.png';
import carrusel2 from '../assets/img/carrusel/carrusel-2.png';
import carrusel3 from '../assets/img/carrusel/carrusel-3.png';
import carrusel4 from '../assets/img/carrusel/carrusel-4.png';
import { NeonCard } from '../components/NeonCard.jsx';
import logotarjeta from '../assets/img/logos/logo-tarjetas-about-us.png';

export const Home = () => {
	return (
		<>
			<NavbarHome />
			<div className="container my-5">

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

				{/* About Us */}
				<section className="about-section py-5 text-white my-5 border-bottom border-top">
					<div className="container position-relative">
						<div className="d-flex align-items-start">
							<div className="vertical-title me-4 my-5">ABOUT US</div>
							<div className="row flex-grow-1 gx-4 justify-content-around">
								<div className="col-md-4 mb-4">
									<div className="neon-box p-4 h-100 d-flex flex-column text-center">
										<h3 className="neon-heading mb-4">The origins</h3>
										<p className="flex-grow-1">
											Playerlink started as an academic project and, with dedication and passion, became what it is today: a web that links players around the world.
										</p>
									</div>
								</div>
								<div className="col-md-4 mb-4">
									<div className="neon-box p-4 h-100 d-flex flex-column text-center">
										<h3 className="neon-heading mb-4">Who we are?</h3>
										<p className="flex-grow-1">
											We are a squad of gaming enthusiasts who know the real fun starts when we play together:<br />
											Alba<br />
											Antonino<br />
											Bryan
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{/* How It Works */}
				<section className="howitworks-section pb-5 text-white my-5 border-bottom border-white">
					<div className="container position-relative">
						<div className="d-flex align-items-start">

							{/* Contenido principal */}
							<div className="flex-grow-1">
								<h2 className="neon-heading text-center mb-4 pb-4">
									What do you have to do?
								</h2>

								{/* Una sola fila: 1 col en xs, 2 en md, 4 en lg */}
								<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4 justify-content-center me-5">
									<div className="col d-flex m-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Sign up on our app"
												backImage={logotarjeta}
												backAlt="Logo tarjeta"
											/>
										</div>
									</div>
									<div className="col d-flex m-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Fill in your user details"
												backImage={logotarjeta}
												backAlt="Logo tarjeta"
											/>
										</div>
									</div>
								</div>
								<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4 justify-content-center ms-5">
									<div className="col d-flex m-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Swipe left or right"
												backImage={logotarjeta}
												backAlt="Logo tarjeta"
											/>
										</div>
									</div>
									<div className="col d-flex m-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Find your player match"
												backImage={logotarjeta}
												backAlt="Logo tarjeta"
											/>
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
				<section className="bestpractices-section pb-5 text-white my-5 border-bottom border-white">
					<div className="container position-relative">
						<div className="d-flex align-items-start">

							{/* Texto vertical sólo en md+ */}
							<div className="vertical-title ms-4 d-none d-md-block align-self-center m-5">
								BEST PRACTICES
							</div>

							{/* Contenido principal */}
							<div className="flex-grow-1">
								<h2 className="neon-heading text-center mb-4 pb-4">
									Finding your gamer squad isn’t easy—here are our top tips to help you connect and level up together
								</h2>

								{/* Todas las tarjetas en un solo row; 1 col en xs, 2 en md, 3 en lg */}
								<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">

									{/* Tarjeta 1 */}
									<div className="col d-flex p-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Be Yourself"
												backText="Share your real interests, favorite games, and play style—authenticity attracts the right squad."
											/>
										</div>
									</div>

									{/* Tarjeta 2 */}
									<div className="col d-flex p-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Respect Others"
												backText="Great communities are built on mutual respect. Avoid toxicity and support positive interactions."
											/>
										</div>
									</div>

									{/* Tarjeta 3 */}
									<div className="col d-flex p-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Stay Active"
												backText="Regularly join games and chats—consistency shows commitment and keeps your squad engaged."
											/>
										</div>
									</div>

									{/* Tarjeta 4 */}
									<div className="col d-flex p-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Use Match Filters Wisely"
												backText="Set your preferences (game genres, skill level, time zone) to find players that truly match your vibe."
											/>
										</div>
									</div>

									{/* Tarjeta 5 (imagen de ejemplo) */}
									<div className="col d-flex p-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Give Feedback"
												backText='Rate your matches and report bad behavior—it helps keep the community safe and fun.'
												/>
										</div>
									</div>

									{/* Tarjeta 6 (imagen de ejemplo) */}
									<div className="col d-flex p-5">
										<div className="card-wrapper w-100">
											<NeonCard
												frontText="Try New Games Together"
												backText='Explore new titles or challenges with your squad to build stronger connections.'
												/>
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
				</section>

			</div>
		</>
	);
};
