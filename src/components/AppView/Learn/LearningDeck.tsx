import { useState } from "react";
import { FaUser, FaCertificate } from "react-icons/fa";
import { useLearningDeckStyles } from "../../../styles/AppView/learningDeck";
import type { LearningDeckProps } from "../../../types/AppView/LearningDeckProps";
import { useAuth } from "../../../App";
import { useTranslation } from "react-i18next";
import { useDefaultDeckImagePath } from "../../../hooks/useBaseMediaUrl";
import { useLanguages } from "../../../hooks/useLanguages";

export const LearningDeck = ({index, deckId, title, description, image, author, level, cardsQuantity, setDisplayedContainer, setDeckToPracticeID}:LearningDeckProps) => {
    const [isDeckHovered, setIsDeckHovered] = useState<boolean>(false);
    const styles = useLearningDeckStyles(isDeckHovered)
    const { authUser } = useAuth();
    const { t } = useTranslation();
    const {languageToLearn} = useLanguages();

    return (
        <div key={index} style={styles.deck} onMouseEnter={() => {setIsDeckHovered(true)}} onMouseLeave={() => {setIsDeckHovered(false)}}>
            <h3 style={styles.title}>{t(title)}</h3>
            <img style={styles.image} src={image ? (`http://localhost:8600${image}`) : (useDefaultDeckImagePath(languageToLearn))}/>
            <p style={styles.description}>{t(description)}</p>
            <div style={styles.tags}>
                <h4 style={styles.author}><FaUser/> {author}</h4>
                <h4 style={styles.level}><FaCertificate/> {level}</h4>
                <h4 style={styles.cardsQuantity}>❐ {cardsQuantity}</h4>
            </div>
            {author === authUser.username && (<button style={styles.addCardsButton}>{t("Add")} +</button>)}
            {Number(cardsQuantity) > 0 && (<button style={styles.studyButton} onClick={() => { setDeckToPracticeID(deckId); setDisplayedContainer("practice") }}>{t("Study")}</button>)}
        </div>
    );
}
