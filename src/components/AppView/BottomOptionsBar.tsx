import { useTranslation } from "react-i18next";
import "../../styles/AppView/bottomOptionsBar.css";
import { FaEye, FaBook, FaPencilAlt } from 'react-icons/fa';

export const BottomOptionsBar = ({setDisplayedContainer}:any) => {
    const { t } = useTranslation();

    return (
        <div className="bottom-options-bar">
            
            <a onClick={() => {setDisplayedContainer("learning")}}>
                <li>
                    <h4><FaEye style={{color: "rgb(120, 180, 240)"}}/>{t("Learn")}</h4>
                </li>
            </a>
            
            <a onClick={() => {setDisplayedContainer("library")}}>
                <li>
                    <h4><FaBook style={{color: "rgb(210, 160, 220)"}}/>{t("Library")}</h4>
                </li>
            </a>
            
            <a onClick={() => {setDisplayedContainer("creation")}}>
                <li>
                    <h4><FaPencilAlt style={{color: "rgb(190, 190, 120)"}}/>{t("Create")}</h4>
                </li>
            </a>
            
        </div>
    );
}