import { useState } from "react";
import "../styles/landingView.css";
// Components
import Testimonials from "../components/LandingView/Testimonials";
// Images
import BeingHappyIMG from "../assets/LandingView/being_happy_2.jpg";
import SpeakIMG from "../assets/LandingView/speak.jpg";
import ScheduleIMG from "../assets/LandingView/schedule.jpg";

export const LandingView = () => {
    // States and variables
    const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean>(false);
    const [authUser, setAuthUser] = useState<any>(null);

    // Functions
    const redirectToRegister = () => {
        console.log("Here you can register a new user");
    }

    return (
        <>
            {isUserAuthenticated ? (
                <div className="hero-section">
                    <h1>Welcome again <span className="highlight-text">User</span></h1>
                    <p>Its time to practice!</p>
                    <a><button className="explore-btn">Let´s Go!</button></a>
                </div>
            ) : (
                <div className="hero-section">
                    <h1>Master a <span className="highlight-text">Language</span></h1>
                    <p>Your gateway to mastering languages with ease, using engaging and inovative learning tools!</p>
                    <a><button className="explore-btn">Explore Now</button></a>
                </div>
            )}

            <section id="why-luabla" className="why-luabla-section">
                <div className="why-luabla-content">
                <h2>Why Choose <span>Luabla?</span></h2>
                <p>Luabla is your ultimate language-learning partner. With engaging exercises, tailored lessons, and real-world practice, you'll achieve fluency faster than ever.</p>
                <ul className="features-list">
                    <li><i className="fas fa-check-circle">»</i> Personalized learning paths</li>
                    <li><i className="fas fa-check-circle">»</i> Interactive and fun exercises</li>
                    <li><i className="fas fa-check-circle">»</i> Progress tracking and feedback</li>
                    <li><i className="fas fa-check-circle">»</i> Learn anytime, anywhere</li>
                </ul>
                <button onClick={redirectToRegister} className="try-now-btn">Try Now</button>
                </div>
            </section>

            <div className="features-container">
                <div className="feature">
                    <img src={BeingHappyIMG} alt="Become Bilingual" className="feature-image"/>
                    <h3>Become Bilingual</h3>
                    <span className="decoration-line"></span>
                    <p>Build a solid foundation for learning your desired language with an enjoyable and effective method.</p>
                </div>
                <div className="feature">
                    <img src={SpeakIMG} alt="Speak with Confidence" className="feature-image"/>
                    <h3>Speak with Confidence</h3>
                    <span className="decoration-line"></span>
                    <p>Engage in conversations with native speakers and boost your speaking skills effortlessly.</p>
                </div>
                <div className="feature">
                    <img src={ScheduleIMG} alt="Learn at Your Pace" className="feature-image"/>
                    <h3>Learn at Your Pace</h3>
                    <span className="decoration-line"></span>
                    <p>Enjoy a flexible learning schedule tailored to your goals and lifestyle.</p>
                </div>
            </div>

            <Testimonials/>
        </>
    );
}