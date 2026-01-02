import "../styles/LandingView/landingView.css";
import { useNavigate } from "react-router-dom";
import Testimonials from "../components/Landing/Testimonials";
import { TopNavBar } from "../components/Landing/TopNavBar";
import { Footer } from "../components/Landing/Footer";
import { useTranslation } from "react-i18next";
// Images
import BeingHappyIMG from "../assets/LandingView/being_happy_2.jpg";
import SpeakIMG from "../assets/LandingView/speak.jpg";
import ScheduleIMG from "../assets/LandingView/schedule.jpg";
import { useAuth } from "../App";

export const LandingView = () => {
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    // Functions
    const navigateToAuth = (isLoginVisible: boolean) => {
        navigate('/auth', {state:{isLoginVisible}});
    }

    return (
        <>
            <TopNavBar authUser={authUser} setAuthUser={setAuthUser}/>
            {authUser ? (
                <div className="hero-section">
                    <h1>{t("Welcome back")} <span className="highlight-text">{authUser.username}</span>!</h1>
                    <h2>{t("It's time to practice!")}</h2>
                    <a onClick={() => navigateToAuth(false)}><button className="explore-btn">{t("Let´s Go!")}</button></a>
                </div>
            ) : (
                <div className="hero-section">
                    <h1>{t("Master a")} <span className="highlight-text">{t("Language")}</span></h1>
                    <h2>{t("Your gateway for mastering languages with ease, using engaging and innovative learning tools!")}</h2>
                    <a onClick={() => navigateToAuth(false)}><button className="explore-btn">{t("Explore Now")}</button></a>
                </div>
            )}

            <section id="why-luabla" className="why-luabla-section">
                <div className="why-luabla-content">
                <h2>{t("Level your")} <span>{t("skills")}</span> 🆙</h2>
                <p>{t("Luabla is your ultimate language-learning partner. You'll achieve fluency faster than ever.")}</p>
                <ul className="features-list">
                    <li><i className="fas fa-check-circle">»</i> {t("Personalized learning paths")}</li>
                    <li><i className="fas fa-check-circle">»</i> {t("Interactive and fun exercises")}</li>
                    <li><i className="fas fa-check-circle">»</i> {t("Progress tracking and feedback")}</li>
                    <li><i className="fas fa-check-circle">»</i> {t("Learn anytime, anywhere")}</li>
                </ul>
                <button onClick={() => navigateToAuth(false)} className="try-now-btn">{t("Try Now")}</button>
                </div>
            </section>

            <div className="features-container">
                <div className="feature">
                    <img src={BeingHappyIMG} alt="Become Bilingual" className="feature-image"/>
                    <h3>{t("Become Bilingual")}</h3>
                    <span className="decoration-line"></span>
                    <p>{t("Build a solid foundation for learning your desired language with an enjoyable and effective method.")}</p>
                </div>
                <div className="feature">
                    <img src={SpeakIMG} alt="Speak with Confidence" className="feature-image"/>
                    <h3>{t("Speak with Confidence")}</h3>
                    <span className="decoration-line"></span>
                    <p>{t("Engage in conversations with native speakers and boost your speaking skills effortlessly.")}</p>
                </div>
                <div className="feature">
                    <img src={ScheduleIMG} alt="Learn at Your Pace" className="feature-image"/>
                    <h3>{t("Learn at Your Own Pace")}</h3>
                    <span className="decoration-line"></span>
                    <p>{t("Enjoy a flexible learning schedule tailored to your goals and lifestyle.")}</p>
                </div>
            </div>

            <Testimonials/>

            <Footer/>
        </>
    );
}