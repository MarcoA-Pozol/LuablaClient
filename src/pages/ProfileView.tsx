import { useNavigate } from "react-router-dom";
import { ProfileInfoSection } from "../components/Profile/ProfileInfoSection";
import { InterfaceLanguageSelectionForm } from "../components/Profile/InterfaceLanguageSelectionForm";
import { useTranslation } from "react-i18next";

export const ProfileView = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <> 
            <p onClick={() => {navigate("/modules")}} style={{color:"wheat", textAlign:"center", cursor:"pointer"}}>{t("Go back")}</p>
            <ProfileInfoSection/>
            <InterfaceLanguageSelectionForm/>
        </>
    );
}