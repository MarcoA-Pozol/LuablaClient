import { useNavigate } from "react-router-dom";
import PandaLogo from "../../assets/LandingView/panda-logo-1.png"
import "../../styles/AppView/topNavBarApp.css";

interface TopNavBarAppProps {
    authUser: string|null;
}

export const TopNavBarApp = ({authUser}:TopNavBarAppProps) => {
    const navigate = useNavigate();

    return (
        <div className="app-top-nav-bar">
            <div className="logo-container" onClick={() => {navigate("/")}}>
                <img src={PandaLogo}/>
                <h2>Luabla</h2>
            </div>
        </div>
    );
}