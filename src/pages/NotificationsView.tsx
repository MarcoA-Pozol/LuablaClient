import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { AppContentContainer } from "../components/AppView/AppContentContainer";
import { useAuth } from "../App";

export const NotificationsView = () => {
    const { authUser } = useAuth();
    
    return (
        <>
            <TopNavBarApp authUser={authUser}/>
            <AppContentContainer>
                Your notifications are here: {authUser.username}
            </AppContentContainer>
        </>
    );
}