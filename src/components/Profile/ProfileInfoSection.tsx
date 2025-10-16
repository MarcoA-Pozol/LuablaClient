import { useAuth } from "../../App";
import { useProfileInfoSectionStyles } from "../../styles/ProfileView/profileInfoSection";
import  "../../../i18n";

export const ProfileInfoSection = () => {
    const {authUser} = useAuth();
    const styles = useProfileInfoSectionStyles();

    return (
        <div style={styles.container}>
            <img style={styles.image} src={`http://localhost:8600/${authUser.profile_picture}`}/>
            <h3 style={styles.username}>👤 {authUser.username}</h3>
            <h4 style={styles.username}>📩 {authUser.email}</h4>
            <h4 style={styles.username}>🌐 {authUser.country}</h4>
        </div>

    );
}