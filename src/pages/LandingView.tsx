import { useNavigate } from "react-router-dom";
import Testimonials from "../components/Landing/Testimonials";
import { TopNavBar } from "../components/Landing/TopNavBar";
import { Footer } from "../components/Landing/Footer";
import { useTranslation } from "react-i18next";
import { useAuth } from "../App";
import { NeoFaceSVG } from "../components/General/Svgs";

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
        <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-violet-500/30">
            <TopNavBar authUser={authUser} setAuthUser={setAuthUser} />

            <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse [animation-delay:2s]"></div>
                    <div className="absolute inset-0 bg-[url('grainy-gradients.vercel.app')] opacity-20 brightness-100 contrast-150"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left animate-fade-in-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 animate-fade-in">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                            </span>
                            {t("The Future of Language Learning")}
                        </div>
                        
                        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter mb-8">
                            {authUser ? (
                                <>
                                    {t("Welcome")}{" "}
                                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-size[200%_auto] animate-gradient">
                                        {authUser.username}
                                    </span>
                                </>
                            ) : (
                                <>
                                    {t("Master")}{" "}
                                    <span className="block text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-violet-500 to-fuchsia-400">
                                        {t("New Worlds")}
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
                            {t("Experience Luabla: Break every barrier, connect with anyone, and start speaking your future today. Ready to transcend borders?")}
                        </p>

                        <div className="flex flex-wrap gap-5">
                            <button 
                                onClick={() => navigateToAuth(false)}
                                className="cursor-pointer group relative px-8 py-4 bg-indigo-600 rounded-2xl font-bold overflow-hidden transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative z-10">{authUser ? t("Resume Path") : t("Start Journey")}</span>
                            </button>
                            <button className="cursor-pointer px-8 py-4 border border-zinc-800 rounded-2xl font-bold hover:bg-white/5 transition-colors">
                                {t("Meet Neo 🐼")}
                            </button>
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center animate-fade-in-right">
                        <div className="absolute w-[80%] h-[80%] bg-indigo-500/10 rounded-full blur-3xl animate-pulse"></div>
                        <NeoFaceSVG/>
                    </div>
                </div>
            </section>

            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 relative p-12 rounded-[3rem] bg-zinc-900/50 border border-zinc-800 overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-30 transition-opacity">
                                <PandaIcon size={200} />
                            </div>
                            <h2 className="text-5xl font-bold mb-6 italic">{t("Level Up")} 📈</h2>
                            <p className="text-zinc-400 text-xl max-w-md mb-8">
                                {t("Achieve fluency faster with our interactive and well oriented method for input and output .")}
                            </p>
                            <div className="flex gap-4">
                                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                                    {t("Interactive")}
                                </div>
                                <div className="p-4 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                                    {t("Adaptative")}
                                </div>
                                <div className="p-4 rounded-2xl bg-fuchsia-500/10 border border-violet-500/20 text-violet-400">
                                    {t("Powered by AI")}
                                </div>
                            </div>
                        </div>

                        <div className="relative p-12 rounded-[3rem] bg-linear-to-br from-indigo-600 to-violet-700 overflow-hidden flex flex-col justify-between group cursor-pointer active:scale-95 transition-transform">
                            <h3 className="text-3xl font-bold leading-tight">{t("Learn Anytime Anywhere")}</h3>
                            <div className="text-6xl animate-bounce-fade">📱Hello!</div>
                        </div>

                        {[
                            { img: SpeakIMG, title: t("Confidence"), color: "indigo" },
                            { img: ScheduleIMG, title: t("Freedom"), color: "violet" },
                            { img: BeingHappyIMG, title: t("Bilingual"), color: "fuchsia" },
                        ].map((item, i) => (
                            <div key={i} className="relative group overflow-hidden rounded-[3rem] bg-zinc-900/50 border border-zinc-800">
                                <div className={`absolute inset-0 bg-${item.color}-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl`}></div>
                                <img src={item.img} alt={item.title} className="w-full h-64 object-cover opacity-60 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" />
                                <div className="absolute bottom-0 left-0 p-8 w-full bg-linear-to-t from-black to-transparent">
                                    <h4 className="text-2xl font-bold">{item.title}</h4>
                                    <div className={`h-1 w-0 group-hover:w-full transition-all duration-500 bg-${item.color}-500 mt-2`}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Testimonials />
            <Footer />
        </div>
    );
};

const PandaIcon = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="currentColor">
        <circle cx="100" cy="100" r="80" opacity="0.2" />
        <circle cx="70" cy="80" r="10" />
        <circle cx="130" cy="80" r="10" />
        <path d="M80 120 Q100 140 120 120" stroke="currentColor" strokeWidth="5" fill="none" />
    </svg>
);
