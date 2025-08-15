import "../../styles/LandingView/footer.css";
import FacebookIMG from "../../assets/LandingView/facebook.png";
import TwitterIMG from "../../assets/LandingView/x.png";
import InstagramIMG from "../../assets/LandingView/instagram.png";
import { useTranslation } from "react-i18next";

export const Footer = () => {
    const { t } = useTranslation();

    return (
        <>
            <footer className="footer-container">
                <div className="social-media-links">
                    <h3>{t("Follow us")}</h3>
                    <ul>
                        <li><a href="#"><img src={FacebookIMG}alt="Facebook"/></a></li>
                        <li><a href="#"><img src={TwitterIMG}alt="Twitter"/></a></li>
                        <li><a href="#"><img src={InstagramIMG} alt="Instagram"/></a></li>
                    </ul>
                </div>
                
                <div className="dev-rights-container">
                    <span className="dev-rights developer">{t("Developed by")} <b>Luabla-Dev Team</b></span>
                    <span className="dev-rights copyright">© Luabla - {t("All rights reserved")}</span>
                </div>

            </footer>
        </>
    );
}