import { useAuth } from "../../App";

export const ProfileInfoSection = () => {
    const {authUser} = useAuth();
    
    return (
        <div>
            <img src={`http://localhost:8600/${authUser.profile_picture}`}/>
            <h3>👤 {authUser.username}</h3>
            <h4>📩 {authUser.email}</h4>
            <h4>🌐 {authUser.country}</h4>
        </div>
    );
}