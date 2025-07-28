import { useNavigate } from "react-router-dom";
import { NotificationsPopUpWindow } from "../SocialView/NotificationsPopUpWindow";
import { useState } from "react";
import PandaLogo from "../../assets/LandingView/panda-logo-1.png"
import NotificationsIcon from "../../assets/AppView/notifications_icon.png";
import "../../styles/AppView/topNavBarApp.css";
import { useSocialData } from "../../hooks/useSocialData";
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
import { useLanguages } from "../../hooks/useLanguages";


interface TopNavBarAppProps {
    authUser: any|null;
}

export const TopNavBarApp = ({authUser}:TopNavBarAppProps) => {
    const { notificationsCount } = useSocialData();
    const navigate = useNavigate();
    const [showNotificationsPopUpWindow, setShowNotificationsPopUpWindow] = useState<boolean>(false);
    const { languageToLearn, setLanguageToLearn } = useLanguages();

    const handleLanguageSelection = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLanguageToLearn(event.target.value || "EN");
        localStorage.setItem("languageToLearn", event.target.value || "EN");
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
                {languageToLearn === "EN" ? (
                    <img src={EnglishFlag}/>
                ): languageToLearn === "FR" ? (
                    <img src={FrenchFlag}/>
                ): languageToLearn === "IT" ? (
                    <img src={ItalianFlag}/>
                ): languageToLearn === "ES" ? (
                    <img src={SpanishFlag}/>
                ): languageToLearn === "DE" ? (
                    <img src={GermanFlag}/>
                ): languageToLearn === "JP" ? (
                    <img src={JapaneseFlag}/>
                ): languageToLearn === "ZH" ? (
                    <img src={ChineseFlag}/>
                ): languageToLearn === "KO" ? (
                    <img src={KoreanFlag}/>
                ): languageToLearn === "PT" ? (
                    <img src={PortugueseFlag}/>
                ): languageToLearn === "RU" ? (
                    <img src={RussianFlag}/>
                ): (<img src={EnglishFlag}/>)}

                <select name="languageToLearn" id="language" value={languageToLearn} onChange={handleLanguageSelection}>
                    <option value="EN">English</option>
                    <option value="ZH">Chinese</option>
                    <option value="DE">Deutsch</option>
                    <option value="JP">Japanese</option>
                    <option value="ES">Spanish</option>
                    <option value="KO">Korean</option>
                    <option value="FR">French</option>
                    <option value="IT">Italian</option>
                    <option value="PT">Portuguese</option>
                    <option value="RU">Russian</option>
                </select>
            </div>

            <div className="notifications-container">
                <a onClick={() => {setShowNotificationsPopUpWindow(true);}}>
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

            <div onClick={() => {navigate("/profile")}} className="profile_container">
                    <img src={`http://localhost:8600/${authUser.profile_picture}`} alt={authUser.profile_picture}/>  
            </div>

            <NotificationsPopUpWindow showNotificationsPopUpWindow={showNotificationsPopUpWindow} setShowNotificationsPopUpWindow={setShowNotificationsPopUpWindow}/>

        </div>
    );
}