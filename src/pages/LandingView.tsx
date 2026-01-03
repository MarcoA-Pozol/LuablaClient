import { useNavigate } from "react-router-dom";
import Testimonials from "../components/Landing/Testimonials";
import { TopNavBar } from "../components/Landing/TopNavBar";
import { Footer } from "../components/Landing/Footer";
import { useTranslation } from "react-i18next";
import { useAuth } from "../App";

// Images
import BeingHappyIMG from "../assets/LandingView/being_happy_2.jpg";
import SpeakIMG from "../assets/LandingView/speak.jpg";
import ScheduleIMG from "../assets/LandingView/schedule.jpg";

export const LandingView = () => {
    const { authUser, setAuthUser } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const navigateToAuth = (isLoginVisible: boolean) => {
        navigate('/auth', { state: { isLoginVisible } });
    }

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 overflow-x-hidden">
            <TopNavBar authUser={authUser} setAuthUser={setAuthUser} />

            <section className="relative flex flex-col items-center justify-center text-center px-6 py-24 md:py-32 bg-gradient-to-b from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-950">
                <div className="animate-fade-in-down animate-duration-slow">
                    {authUser ? (
                        <>
                            <h1 className="text-4xl md:text-7xl font-black text-zinc-900 dark:text-white leading-tight">
                                {t("Welcome back")}{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-500">
                                    {authUser.username}
                                </span>!
                            </h1>
                            <h2 className="mt-4 text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-medium">
                                {t("It's time to practice!")}
                            </h2>
                            <button 
                                onClick={() => navigateToAuth(false)}
                                className="mt-10 px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold text-lg shadow-lg shadow-indigo-200 dark:shadow-none transition-all hover:scale-105 animate-pulse-subtle"
                            >
                                {t("Let´s Go!")}
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-5xl md:text-8xl font-black text-zinc-900 dark:text-white tracking-tight">
                                {t("Master a")}{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                                    {t("Language")}
                                </span>
                            </h1>
                            <h2 className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400">
                                {t("Your gateway for mastering languages with ease, using engaging and innovative learning tools!")}
                            </h2>
                            <button 
                                onClick={() => navigateToAuth(false)}
                                className="mt-10 px-10 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 animate-bounce-fade"
                            >
                                {t("Explore Now")}
                            </button>
                        </>
                    )}
                </div>
            </section>

            <section id="why-luabla" className="py-20 px-6 bg-white dark:bg-zinc-950">
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 animate-fade-in-left">
                        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white">
                            {t("Level your")}{" "}
                            <span className="text-indigo-600 italic">{t("skills")}</span> 🆙
                        </h2>
                        <p className="text-lg text-zinc-600 dark:text-zinc-400">
                            {t("Luabla is your ultimate language-learning partner. You'll achieve fluency faster than ever.")}
                        </p>
                        <ul className="space-y-4">
                            {[
                                t("Personalized learning paths"),
                                t("Interactive and fun exercises"),
                                t("Progress tracking and feedback"),
                                t("Learn anytime, anywhere")
                            ].map((feature, index) => (
                                <li key={index} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300 font-medium">
                                    <span className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center rounded-full text-xs">
                                        ✓
                                    </span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button 
                            onClick={() => navigateToAuth(false)}
                            className="group flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 transition-colors"
                        >
                            {t("Try Now")} 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </div>
  
                    <div className="relative animate-fade-in-right">
                        <div className="absolute -inset-4 bg-indigo-500/10 rounded-full blur-3xl"></div>
                        <img 
                            src={BeingHappyIMG} 
                            alt="Happy learning" 
                            className="relative rounded-3xl shadow-2xl border-8 border-white dark:border-zinc-900 rotate-2 hover:rotate-0 transition-transform duration-500"
                        />
                    </div>
                </div>
            </section>

            <section className="py-20 px-6 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { img: BeingHappyIMG, title: t("Become Bilingual"), desc: t("Build a solid foundation for learning your desired language with an enjoyable and effective method.") },
                        { img: SpeakIMG, title: t("Speak with Confidence"), desc: t("Engage in conversations with native speakers and boost your speaking skills effortlessly.") },
                        { img: ScheduleIMG, title: t("Learn at Your Own Pace"), desc: t("Enjoy a flexible learning schedule tailored to your goals and lifestyle.") }
                    ].map((feature, idx) => (
                        <div 
                            key={idx} 
                            className="bg-white dark:bg-zinc-800 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                        >
                            <div className="overflow-hidden rounded-2xl aspect-video mb-6">
                                <img src={feature.img} alt={feature.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white px-2">
                                {feature.title}
                            </h3>
                            <div className="w-12 h-1 bg-indigo-500 my-4 mx-2 rounded-full group-hover:w-24 transition-all"></div>
                            <p className="text-zinc-600 dark:text-zinc-400 px-2 pb-4">
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="animate-fade-in animate-delay-300">
                <Testimonials />
            </div>
            
            <Footer />
        </div>
    );
}
