import { useTranslation } from "react-i18next";

export const PageNotFoundView = () => {
    const { t } = useTranslation();

    return (
        <>
            404: {t("Page not found")} 
        </>
    );
}