import { useNavigate } from "react-router-dom";
import { ProfileInfoSection } from "../components/ProfileView/ProfileInfoSection";

export const ProfileView = () => {
    const navigate = useNavigate();

    return (
        <> 
            <p onClick={() => {navigate("/app")}} style={{color:"wheat", textAlign:"center", cursor:"pointer"}}>Back to app</p>
            <ProfileInfoSection/>
        </>
    );
}