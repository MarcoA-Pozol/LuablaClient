import { GetCardsData } from "../components/LandingView/GetCardsData";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";
import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { useAuth } from "../App";

export const AppView = () => {
    const { authUser } = useAuth();
    
    return (
        <>
            <TopNavBarApp authUser={authUser}/>
            { authUser.has_picked_language ? (
                <GetCardsData/>
            ): (
                <div>
                    <PickLanguageForm/>
                </div>
            )}
        </>
    );
}