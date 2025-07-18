import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { AppContentContainer } from "../components/AppView/AppContentContainer";
import { useAuth } from "../App";

export const ProfileView = () => {
    const { authUser } = useAuth();
    
    return (
        <>
            <TopNavBarApp authUser={authUser}/>
            <AppContentContainer>
                User's profile: {authUser.username}
            </AppContentContainer>
        </>
    );
}