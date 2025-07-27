import { useNavigate } from "react-router-dom";
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


interface TopNavBarAppProps {
    authUser: any|null;
    languageToStudy: string;
    setLanguageToStudy: React.Dispatch<React.SetStateAction<string>>;
}

export const TopNavBarApp = ({authUser, languageToStudy, setLanguageToStudy}:TopNavBarAppProps) => {
    const { notificationsCount } = useSocialData();
    const navigate = useNavigate();

    const handleLanguageSelection = (event:React.ChangeEvent<HTMLSelectElement>) => {
        setLanguageToStudy(event.target.value || "EN");
        localStorage.setItem("languageToStudy", event.target.value || "EN");
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
                {languageToStudy === "EN" ? (
                    <img src={EnglishFlag}/>
                ): languageToStudy === "FR" ? (
                    <img src={FrenchFlag}/>
                ): languageToStudy === "IT" ? (
                    <img src={ItalianFlag}/>
                ): languageToStudy === "ES" ? (
                    <img src={SpanishFlag}/>
                ): languageToStudy === "DE" ? (
                    <img src={GermanFlag}/>
                ): languageToStudy === "JP" ? (
                    <img src={JapaneseFlag}/>
                ): languageToStudy === "ZH" ? (
                    <img src={ChineseFlag}/>
                ): languageToStudy === "KO" ? (
                    <img src={KoreanFlag}/>
                ): languageToStudy === "PT" ? (
                    <img src={PortugueseFlag}/>
                ): languageToStudy === "RU" ? (
                    <img src={RussianFlag}/>
                ): (<img src={EnglishFlag}/>)}

                <select name="languageToStudy" id="language" value={languageToStudy} onChange={handleLanguageSelection}>
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
                <a onClick={() => {navigate("/notifications")}}>
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

        </div>
    );
}