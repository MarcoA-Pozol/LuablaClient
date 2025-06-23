import { useNavigate } from "react-router-dom";
import PandaLogo from "../../assets/LandingView/panda-logo-1.png"
import "../../styles/AppView/topNavBarApp.css";
import { useState } from "react";

interface TopNavBarAppProps {
    authUser: string|null;
}

export const TopNavBarApp = ({authUser}:TopNavBarAppProps) => {
    const navigate = useNavigate();
    const [selectedLanguage,setSelectedLanguage] = useState<string>("English"); 

    const handleLanguageSelection = () => {
        setSelectedLanguage("Chinese");
    }

    return (
        <div className="app-top-nav-bar">
            <div className="logo-container" onClick={() => {navigate("/")}}>
                <a>
                    <img src={PandaLogo}/>
                    <h2>Luabla</h2>
                </a>
            </div>

            <div id="language_container">
                <form method="post" onSubmit={handleLanguageSelection}>
                    {selectedLanguage === "English" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "French" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "Italian" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "Spanish" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "German" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "Japanese" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "Chinese" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "Korean" ? (
                        <img src={PandaLogo}/>
                    ): selectedLanguage === "Russian" ? (
                        <img src={PandaLogo}/>
                    ): (<img src={PandaLogo}/>)}

                    <select name="language" id="language" value={selectedLanguage}>
                        <option value="English" selected={selectedLanguage === "English"}>English</option>
                        <option value="Chinese" selected={selectedLanguage === "Chinese"}>Chinese</option>
                        <option value="German" selected={selectedLanguage === "German"}>German</option>
                    </select>
                </form>  
            </div>

            <div className="profile_container">
                <a onClick={() => {navigate("/")}}>
                    {authUser ? (
                        <img src={PandaLogo} alt="User's profile picture"/>  
                    ): (
                        <img src={PandaLogo} alt="Default profile picture"/>
                    )}
                </a>
            </div>

        </div>
    );
}