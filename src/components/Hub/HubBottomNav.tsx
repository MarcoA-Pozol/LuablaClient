import { useTranslation } from "react-i18next";
import "../../styles/AppView/bottomOptionsBar.css";
import { FaStream, FaBoxes } from 'react-icons/fa';
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
            
            <a onClick={() => {setDisplayedContainer("posts")}}>
                <li>
                    <h4><FaStream style={{color: "rgba(120, 240, 150, 1)"}}/> {t("Posts")}</h4>
                </li>
            </a>
            
        </div>
    );
}