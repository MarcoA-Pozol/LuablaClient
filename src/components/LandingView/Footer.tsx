import "../../styles/LandingView/footer.css";
import FacebookIMG from "../../assets/LandingView/facebook.png";
import TwitterIMG from "../../assets/LandingView/x.png";
import InstagramIMG from "../../assets/LandingView/instagram.png";

export const Footer = () => {
    return (
        <>
            <footer className="footer-container">
                <div className="social-media-links">
                    <h3>Connect with us</h3>
                    <ul>
                        <li><a href="#"><img src={FacebookIMG}alt="Facebook"/></a></li>
                        <li><a href="#"><img src={TwitterIMG}alt="Twitter"/></a></li>
                        <li><a href="#"><img src={InstagramIMG} alt="Instagram"/></a></li>
                    </ul>
                </div>
                
                <div className="dev-rights-container">
                    <span className="dev-rights developer">Developed by <b>Luabla-Dev Team</b></span>
                    <span className="dev-rights copyright">© Luabla - All rights reserved 2024</span>
                </div>

            </footer>
        </>
    );
}