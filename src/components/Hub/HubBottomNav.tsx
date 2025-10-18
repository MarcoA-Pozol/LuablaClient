import { useTranslation } from "react-i18next";
import "../../styles/AppView/bottomOptionsBar.css";
import { FaEye, FaBook, FaPencilAlt, FaBoxes } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";

export const HubBottomNav = ({setDisplayedContainer}:any) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div className="bottom-options-bar">
            
            <a onClick={() => {navigate('/modules')}}>
                <li>
                    <h4><FaBoxes style={{color: "rgb(120, 180, 240)"}}/> {t("Modules")}</h4>
                </li>
            </a>
            
            <a onClick={() => {setDisplayedContainer("topics")}}>
                <li>
                    <h4><FaEye style={{color: "rgba(120, 240, 150, 1)"}}/> {t("Learn")}</h4>
                </li>
            </a>

            <a onClick={() => {setDisplayedContainer("library")}}>
                <li>
                    <h4><FaBook style={{color: "rgb(210, 160, 220)"}}/> {t("Library")}</h4>
                </li>
            </a>
            
            <a onClick={() => {setDisplayedContainer("creation")}}>
                <li>
                    <h4><FaPencilAlt style={{color: "rgb(190, 190, 120)"}}/> {t("Create")}</h4>
                </li>
            </a>
            
        </div>
    );
}