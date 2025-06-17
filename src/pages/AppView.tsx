import { GetCardsData } from "../components/LandingView/GetCardsData";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";

export const AppView = () => {
    return (
        <>
            <PickLanguageForm/>
            <GetCardsData/>
        </>
    );
}