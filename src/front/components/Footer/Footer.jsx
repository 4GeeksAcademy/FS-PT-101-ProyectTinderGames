import './Footer.css';
import TikTok from "../../assets/img/social media/social-media-tiktok.png";
import Instagram from "../../assets/img/social media/social-media-instagram.png";
import Discord from "../../assets/img/social media/social-media-discord.png";
import Facebook from "../../assets/img/social media/social-media-facebook.png";
import Twitter from "../../assets/img/social media/social-media-x.png";

export const Footer = () => (
	<footer className="footer mt-auto py-3 text-footer">
		<div className='d-flex justify-content-center'>

			<div className='text-end me-5'>
				<h5>Want to know more? </h5>
				<h5>Follow us on social media!</h5>
			</div>
			<div className='footer-social-media-icons'>
				<img src={TikTok} alt="TikTok" className='social-media-icon me-2' />
				<img src={Instagram} alt="TikTok" className='social-media-icon me-2' />
				<img src={Discord} alt="TikTok" className='social-media-icon me-1' />
				<img src={Facebook} alt="TikTok" className='social-media-icon' />
				<img src={Twitter} alt="TikTok" className='social-media-icon me-4' />
			</div>
		</div>

	</footer>
);
