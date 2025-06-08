import "../../styles/LandingView/topNavBar.css";
import PandaLogoIMG from "../../assets/LandingView/panda-logo-1.png";

interface TopNavBarProps {
    isUserAuthenticated: boolean;
}

export const TopNavBar = ({isUserAuthenticated}:TopNavBarProps) => {
    return (
        <>
            <header className="header-top-bar">
                <a id="luabla-logo">
                    <img src={PandaLogoIMG} alt="Panda Logo"/>
                    <h2>Luabla</h2>
                </a>
                <div id="sign-up-options">
                    <a id="sign_up"><li>Sign-Up</li></a>
                    {isUserAuthenticated ? (
                        <a id="start_session"><li>Logout</li></a>
                    ) : (
                        <a id="close_session"><li>Login</li></a>
                    )}
                </div>
            </header>
        </>
    );
}