import "../../styles/LandingView/topNavBar.css";
import PandaLogoIMG from "../../assets/LandingView/panda-logo-1.png";
import type { TopNavBarProps } from "../../types/LandingView/TopNavBar";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../App";
import axios from "axios";
// Icons
import { BiLogOut } from "react-icons/bi";

export const TopNavBar = ({isUserAuthenticated}:TopNavBarProps) => {
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuth();

    const navigateToAuth = (isLoginVisible: boolean) => {
        navigate('/auth', {state:{isLoginVisible}});
    }


    const logoutUser = async () => {
        try {
            await axios.post("http://localhost:8600/api/auth/signOut", {}, {
                withCredentials:true
            });
            setAuthUser(null);
            navigate('/');
        } catch (error) {
            alert(`Error when trying to close session: ${error}`);
        }
    };

    return (
        <>
            <header className="header-top-bar">
                <a onClick={() => navigate('/')} id="luabla-logo">
                    <img src={PandaLogoIMG} alt="Panda Logo"/>
                    <h2>Luabla</h2>
                </a>
                <div id="sign-up-options">
                    {authUser ? (
                        <>
                            <a>{authUser}</a>
                            <BiLogOut onClick={logoutUser} id="close-session" style={{ color: "red", fontSize: "2.2rem", cursor:"pointer"}}/>
                        </>
                    ) : (
                        <>
                            <a onClick={() => navigateToAuth(false)} id="sign_up"><li>Sign-Up</li></a>
                            <a onClick={() => navigateToAuth(true)} id="start_session"><li>SignIn</li></a>
                        </>
                    )}
                </div>
            </header>
        </>
    );
}