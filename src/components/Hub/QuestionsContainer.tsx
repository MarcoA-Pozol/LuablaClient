import { useLanguages } from "../../hooks/useLanguages";
import { useTranslation } from "react-i18next";

export const QuestionsContainer = () => {
    const { languageToLearn } = useLanguages();
    const  { t } = useTranslation();

    return (
        <>
            {t(`The questions are here... but in this language ${languageToLearn}`)}
        </>
    );
}
