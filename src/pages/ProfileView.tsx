import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { AppContentContainer } from "../components/AppView/AppContentContainer";
import { useAuth } from "../App";
import { ProfileInfoSection } from "../components/ProfileView/ProfileInfoSection";

export const ProfileView = () => {
    const { authUser } = useAuth();
    
    return (
        <>  
            <TopNavBarApp authUser={authUser}/>
            <AppContentContainer>
                <ProfileInfoSection/>
            </AppContentContainer>
        </>
    );
}