import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface TopNavBarProps {
    authUser: any; 
    setAuthUser: (user: any) => void;
}

export const TopNavBar = ({ authUser, setAuthUser }: TopNavBarProps) => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const navigateToAuth = (isLoginVisible: boolean) => {
        navigate('/auth', { state: { isLoginVisible } });
    };

    const handleLogout = () => {
        setAuthUser(null);
        navigate('/');
    };

    // I need to fix this: the language is not being applied to the UI
    const toggleLang = () => {
        const newLang = i18n.language === 'es' ? 'en' : 'es';
        i18n.changeLanguage(newLang);
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-4">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-2xl 
                            bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)]">
                
                <div 
                    className="flex items-center gap-2 cursor-pointer group" 
                    onClick={() => navigate('/')}
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-indigo-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity"></div>
                        <svg viewBox="0 0 100 100" className="w-10 h-10 drop-shadow-md">
                            <circle cx="50" cy="50" r="45" fill="white" />
                            <circle cx="30" cy="40" r="10" fill="#18181b" />
                            <circle cx="70" cy="40" r="10" fill="#18181b" />
                            <circle cx="50" cy="60" r="8" fill="#18181b" />
                        </svg>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-white">
                        LUA<span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-violet-400">BLA</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    <button 
                        onClick={toggleLang} 
                        className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
                    >
                        🌐 {i18n.language.toUpperCase()}
                    </button>
                    {authUser ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden sm:block text-right">
                                <p className="text-xs text-zinc-500 font-bold uppercase tracking-tighter">{t("Welcome")}</p>
                                <p className="text-sm font-black text-indigo-300">{authUser.username}</p>
                            </div>

                            <button 
                                onClick={handleLogout}
                                className="cursor-pointer px-5 py-2 rounded-xl bg-zinc-800 border border-white/5 hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400 transition-all text-xs font-black uppercase"
                            >
                                {t("Logout")}
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <button 
                                onClick={() => navigateToAuth(true)}
                                className="cursor-pointer text-sm font-bold text-zinc-400 hover:text-white transition-colors px-3 py-2"
                            >
                                {t("Sign In")}
                            </button>
                            <button 
                                onClick={() => navigateToAuth(false)}
                                className="cursor-pointer group relative px-5 py-2.5 bg-indigo-600 rounded-xl font-black text-xs uppercase overflow-hidden shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:scale-105 active:scale-95"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="relative z-10">{t("Join Now")}</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
