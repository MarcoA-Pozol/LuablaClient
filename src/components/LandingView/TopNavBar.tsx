import "../../styles/LandingView/topNavBar.css";
import PandaLogoIMG from "../../assets/LandingView/panda-logo-1.png";
import type { TopNavBarProps } from "../../types/LandingView/TopNavBar";
import { useNavigate } from 'react-router-dom';

export const TopNavBar = ({isUserAuthenticated}:TopNavBarProps) => {
    const navigate = useNavigate();

    const navigateToAuth = (isLoginVisible: boolean) => {
        navigate('/auth', {state:{isLoginVisible}});
    }


    const logoutUser = () => {
        navigate('/');
    };

    return (
        <>
            <header className="header-top-bar">
                <a onClick={() => navigate('/')} id="luabla-logo">
                    <img src={PandaLogoIMG} alt="Panda Logo"/>
                    <h2>Luabla</h2>
                </a>
                <div id="sign-up-options">
                    <a onClick={() => navigateToAuth(false)} id="sign_up"><li>Sign-Up</li></a>
                    {isUserAuthenticated ? (
                        <a onClick={logoutUser} id="close_session"><li>Logout</li></a>
                    ) : (
                        <a onClick={() => navigateToAuth(true)} id="start_session"><li>Login</li></a>
                    )}
                </div>
            </header>
        </>
    );
}