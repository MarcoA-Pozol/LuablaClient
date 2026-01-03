import { useTranslation } from "react-i18next";
import FacebookIMG from "../../assets/LandingView/facebook.png";
import TwitterIMG from "../../assets/LandingView/x.png";
import InstagramIMG from "../../assets/LandingView/instagram.png";
import { NeoFaceSVG } from "../General/Svgs";

export const Footer = () => {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#050505] pt-20 pb-10 px-6 border-t border-white/5 overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-indigo-600/5 blur-[100px] pointer-events-none"></div>

            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
                
                <div className="flex flex-col items-center gap-6 mb-16 animate-fade-in-up">
                    <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500">
                        {t("Follow us")}
                    </h3>
                    
                    <ul className="flex items-center gap-8">
                        {[
                            { img: FacebookIMG, name: "Facebook", color: "hover:bg-blue-600" },
                            { img: TwitterIMG, name: "X", color: "hover:bg-zinc-800" },
                            { img: InstagramIMG, name: "Instagram", color: "hover:bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600" }
                        ].map((social, idx) => (
                            <li key={idx} className="group">
                                <a 
                                    href="#" 
                                    className={`relative flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 transition-all duration-500 group-hover:-translate-y-2 ${social.color} group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]`}
                                >
                                    <img 
                                        src={social.img} 
                                        alt={social.name} 
                                        className="w-6 h-6 object-contain brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all" 
                                    />
                                    
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white transition-opacity"></div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent mb-10"></div>

                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 text-zinc-500">
                    
                    <div className="flex items-center gap-3 order-2 md:order-1">
                        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center">
                            <NeoFaceSVG size={20}/>
                        </div>
                        <span className="text-xs font-medium tracking-wide">
                            {t("Developed by")}{" "}
                            <b className="text-zinc-300 hover:text-indigo-400 transition-colors cursor-default">
                                {t("Luabla-Dev Team")}
                            </b>
                        </span>
                    </div>

                    <span className="text-xs font-bold uppercase tracking-widest order-1 md:order-2 opacity-50">
                        © {currentYear} Luabla — {t("All rights reserved")}
                    </span>

                </div>

                <div className="mt-8 text-[10px] text-zinc-800 font-black uppercase tracking-[0.5em] select-none">
                    {t("Neo is watching your progress")} 🐼
                </div>
            </div>
        </footer>
    );
};