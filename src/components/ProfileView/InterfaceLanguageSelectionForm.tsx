import { useTranslation } from "react-i18next";
import "../../../i18n";

export const InterfaceLanguageSelectionForm = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedLang = event.target.value;
        i18n.changeLanguage(selectedLang);
    };

    return (
        <>
            <label>
                {t("Choose language")}
                <select name="language-options" onChange={changeLanguage} defaultValue={i18n.language}>
                    <option value="en">en</option>
                    <option value="es">es</option>
                    <option value="fr">fr</option>
                    <option value="pt">pt</option>
                    <option value="cn">cn</option>
                    <option value="jp">jp</option>
                    <option value="de">de</option>
                    <option value="ru">ru</option>
                    <option value="ko">ko</option>
                    <option value="it">it</option>
                    <option value="hi">hi</option>

                </select>
            </label>
        </>
    );
}