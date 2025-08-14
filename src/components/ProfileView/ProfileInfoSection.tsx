import { useAuth } from "../../App";
import { useProfileInfoSectionStyles } from "../../styles/ProfileView/profileInfoSection";
import  "../../../i18n";
import { useTranslation } from "react-i18next";

export const ProfileInfoSection = () => {
    const {authUser} = useAuth();
    const styles = useProfileInfoSectionStyles();
    const { t } = useTranslation();

    return (
        <div style={styles.container}>
            <img style={styles.image} src={`http://localhost:8600/${authUser.profile_picture}`}/>
            <h3 style={styles.username}>👤 {authUser.username}</h3>
            <h4 style={styles.username}>📩 {authUser.email}</h4>
            <h4 style={styles.username}>🌐 {authUser.country}</h4>
            <h4>{t("Update profile")}</h4>
        </div>

    );
}