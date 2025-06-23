import { GetCardsData } from "../components/LandingView/GetCardsData";
import { useAuth, useCheckUserHasPickedLanguage } from "../App";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";

export const AppView = () => {
    const { userHasPickedLanguage } = useCheckUserHasPickedLanguage();
    const { authUser } = useAuth();
    
    return (
        <>
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