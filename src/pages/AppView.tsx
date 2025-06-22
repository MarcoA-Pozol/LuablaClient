import { GetCardsData } from "../components/LandingView/GetCardsData";
import { useCheckUserHasPickedLanguage } from "../App";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";

export const AppView = () => {
    const { userHasPickedLanguage } = useCheckUserHasPickedLanguage();

    return (
        <>
            { userHasPickedLanguage ? (
                <GetCardsData/>
            ): (
                <PickLanguageForm/>
            )}
        </>
    );
}