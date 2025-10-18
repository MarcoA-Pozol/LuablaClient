import { useLanguages } from "../../hooks/useLanguages";
import { useTranslation } from "react-i18next";

export const PostsContainer = () => {
    const { languageToLearn } = useLanguages();
    const  { t } = useTranslation();

    return (
        <>
            {t(`The posts are here... but in this language ${languageToLearn}`)}
        </>
    );
}
