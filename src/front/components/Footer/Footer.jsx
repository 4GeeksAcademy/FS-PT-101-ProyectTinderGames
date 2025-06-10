import './Footer.css';
import TikTok from "../../assets/img/social media/social-media-tiktok.png";
import Instagram from "../../assets/img/social media/social-media-instagram.png";
import Discord from "../../assets/img/social media/social-media-discord.png";
import Facebook from "../../assets/img/social media/social-media-facebook.png";
import Twitter from "../../assets/img/social media/social-media-x.png";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-footer">
		<div className="d-flex flex-column flex-md-row justify-content-center align-items-center align-items-md-start text-center text-md-start">

			<div className="footer-text-size me-md-5 order-1 order-md-0">

				{/* Texto para pantallas pequeñas */}
				<h5 className="d-block d-md-none">
					Want to know more? Follow us!
				</h5>

				{/* Texto para el resto de pantallas */}
				<div className="d-none d-md-block">
					<h5>Want to know more?</h5>
					<h5>Follow us on social media!</h5>
				</div>

			</div>

			<div className="footer-social-media-icons mt-2 mt-md-3 order-0 order-md-1">
				<img src={TikTok} alt="TikTok" className="social-media-icon me-2 img-fluid" />
				<img src={Instagram} alt="Instagram" className="social-media-icon me-2 img-fluid" />
				<img src={Discord} alt="Discord" className="social-media-icon me-2 img-fluid" />
				<img src={Facebook} alt="Facebook" className="social-media-icon me-2 img-fluid" />
				<img src={Twitter} alt="Twitter" className="social-media-icon img-fluid" />
			</div>

		</div>
	</footer>

);
