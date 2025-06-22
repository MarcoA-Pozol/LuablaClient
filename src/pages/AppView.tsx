import { GetCardsData } from "../components/LandingView/GetCardsData";
import { useAuth, useCheckUserHasPickedLanguage } from "../App";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AppView = () => {
    const { userHasPickedLanguage } = useCheckUserHasPickedLanguage();
    const { authUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authUser) navigate("/");
    
    }, [authUser, navigate]);

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