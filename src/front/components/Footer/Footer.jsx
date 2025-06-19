import './Footer.css';
import TikTok from "../../assets/img/social media/social-media-tiktok.png";
import Instagram from "../../assets/img/social media/social-media-instagram.png";
import Discord from "../../assets/img/social media/social-media-discord.png";
import Facebook from "../../assets/img/social media/social-media-facebook.png";
import Twitter from "../../assets/img/social media/social-media-x.png";
import { Link } from 'react-router-dom';

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-footer">
		<div className="d-flex flex-column flex-md-row justify-content-center align-items-md-start text-center text-md-start">

			<div className="footer-text-size me-md-5 order-1 order-md-0">

				{/* Texto para pantallas pequeñas */}
				<h6 className="d-block d-md-none">
					Want to know more? Follow us!
				</h6>

				{/* Texto para el resto de pantallas */}
				<div className="d-none d-md-block">
					<h6>Want to know more?</h6>
					<h6>Follow us on social media!</h6>
				</div>

			</div>

			<div className="footer-social-media-icons mt-2 mt-md-3 order-0 order-md-1 d-flex justify-content-center">
				<a href="https://www.tiktok.com/@playerlinkapp" target="_blank" rel="noopener noreferrer">
					<i className="fa-brands fa-tiktok social-media-icon"></i>
				</a>
				<a href="https://www.tiktok.com/@playerlinkapp" target="_blank" rel="noopener noreferrer">
					<i className="fa-brands fa-instagram social-media-icon"></i>
				</a>
				<i className="fa-brands fa-discord social-media-icon"></i>
				<a href="https://www.facebook.com/profile.php?id=61577751683748" target="_blank" rel="noopener noreferrer">
					<i className="fa-brands fa-facebook-f social-media-icon"></i>
				</a>
				<a href="https://x.com/playerlinkapp" target="_blank" rel="noopener noreferrer">
					<i className="fa-brands fa-x-twitter social-media-icon"></i>
				</a>

			</div>

		</div>
	</footer>

);
