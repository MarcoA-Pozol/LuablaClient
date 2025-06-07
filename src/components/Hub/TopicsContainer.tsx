import { useLanguages } from "../../hooks/useLanguages";
import { useTranslation } from "react-i18next";

export const TopicsContainer = () => {
    const { languageToLearn } = useLanguages();
    const  { t } = useTranslation();

    return (
        <>
            {t(`The topics are here... but in this language ${languageToLearn}`)}
        </>
    );
}
