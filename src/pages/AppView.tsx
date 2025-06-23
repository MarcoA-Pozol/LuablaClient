import { GetCardsData } from "../components/LandingView/GetCardsData";
import { useAuth, useCheckUserHasPickedLanguage } from "../App";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";
import { TopNavBarApp } from "../components/AppView/TopNavBarApp";

export const AppView = () => {
    const { userHasPickedLanguage } = useCheckUserHasPickedLanguage();
    const { authUser } = useAuth();
    
    return (
        <>
            <TopNavBarApp authUser={authUser}/>
            <h2>{authUser}</h2>
            { userHasPickedLanguage ? (
                <GetCardsData/>
            ): (
                <div>
                    <PickLanguageForm/>
                </div>
            )}
        </>
    );
}