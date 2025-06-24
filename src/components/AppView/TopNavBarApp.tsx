import { useNavigate } from "react-router-dom";
import PandaLogo from "../../assets/LandingView/panda-logo-1.png"
import NotificationsIcon from "../../assets/AppView/notifications_icon.png";
import "../../styles/AppView/topNavBarApp.css";
import { useState } from "react";
// Languages IMGs
import EnglishFlag from "../../assets/AppView/english_flag.png";
import JapaneseFlag from "../../assets/AppView/japanese_flag.png";
import FrenchFlag from "../../assets/AppView/french_flag.png";
import ItalianFlag from "../../assets/AppView/italian_flag.png";
import GermanFlag from "../../assets/AppView/german_flag.png";
import ChineseFlag from "../../assets/AppView/chinese_flag.png";
import SpanishFlag from "../../assets/AppView/spanish_flag.png";
import KoreanFlag from "../../assets/AppView/korean_flag.png";
import PortugueseFlag from "../../assets/AppView/portuguese_flag.png";

import RussianFlag from "../../assets/AppView/russian_flag.png";


interface TopNavBarAppProps {
    authUser: any|null;
}

export const TopNavBarApp = ({authUser}:TopNavBarAppProps) => {
    const navigate = useNavigate();
    const [selectedLanguage,setSelectedLanguage] = useState<string>("English"); 
    const [notificationsCount] = useState<number>(12);

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
                        <img src={EnglishFlag}/>
                    ): selectedLanguage === "French" ? (
                        <img src={FrenchFlag}/>
                    ): selectedLanguage === "Italian" ? (
                        <img src={ItalianFlag}/>
                    ): selectedLanguage === "Spanish" ? (
                        <img src={SpanishFlag}/>
                    ): selectedLanguage === "German" ? (
                        <img src={GermanFlag}/>
                    ): selectedLanguage === "Japanese" ? (
                        <img src={JapaneseFlag}/>
                    ): selectedLanguage === "Chinese" ? (
                        <img src={ChineseFlag}/>
                    ): selectedLanguage === "Korean" ? (
                        <img src={KoreanFlag}/>
                    ): selectedLanguage === "Portuguese" ? (
                        <img src={PortugueseFlag}/>
                    ): selectedLanguage === "Russian" ? (
                        <img src={RussianFlag}/>
                    ): (<img src={EnglishFlag}/>)}

                    <select name="language" id="language" value={selectedLanguage}>
                        <option value="English" selected={selectedLanguage === "English"}>English</option>
                        <option value="Chinese" selected={selectedLanguage === "Chinese"}>Chinese</option>
                        <option value="German" selected={selectedLanguage === "German"}>German</option>
                        <option value="Japanese" selected={selectedLanguage === "Japanese"}>Japanese</option>
                        <option value="Spanish" selected={selectedLanguage === "Spanish"}>Spanish</option>
                        <option value="Korean" selected={selectedLanguage === "Korean"}>Korean</option>
                        <option value="French" selected={selectedLanguage === "French"}>French</option>
                        <option value="Italian" selected={selectedLanguage === "Italian"}>Italian</option>
                        <option value="Portuguese" selected={selectedLanguage === "Portuguese"}>Portuguese</option>
                        <option value="Russian" selected={selectedLanguage === "Russian"}>Russian</option>
                    </select>
                </form>  
            </div>

            <div className="notifications-container">
                <a onClick={() => {navigate("/")}}>
                    <div id="notifications">
                        <img src={NotificationsIcon} alt="Notifications icon"/>
                        { notificationsCount === 0 ? (
                            <h5 style={{backgroundColor:"rgb(36, 25, 97)"}}>{notificationsCount}</h5>
                        ) : (
                            <h5>{notificationsCount}</h5>
                        )}
                    </div>
                </a>
            </div>

            <div className="profile_container">
                <a onClick={() => {navigate("/")}}>
                    <img src={`http://localhost:8600/${authUser.profile_picture}`} alt={authUser.profile_picture}/>  
                </a>
            </div>

        </div>
    );
}