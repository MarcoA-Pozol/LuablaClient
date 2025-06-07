import { LearningDeck } from "./LearningDeck";
import { useLearningDecksContainerStyles } from "../../../styles/AppView/learningDecksContainer";
import type { LearningDecksContainerProps } from "../../../types/AppView/LearningDecksContainerProps";
import { useDecksLists } from "../../../hooks/useDecksLists";
import { useLanguages } from "../../../hooks/useLanguages";
import { useTranslation } from "react-i18next";

export const LearningDecksContainer = ({ setDisplayedContainer, setDeckToPracticeID}:LearningDecksContainerProps) => {
    const styles = useLearningDecksContainerStyles();
    const {userDecksList, ownedDecksList} = useDecksLists()
    const { languageToLearn } = useLanguages();
    const { t } = useTranslation();

    return (
        <div style={styles.decksContainer}>
            {userDecksList.length <= 0 && ownedDecksList.length <= 0 ? (
                <p>{t("No decks found")}</p>
            ) : (
                [...userDecksList, ...ownedDecksList].map((deck: any, index) => (
                    <LearningDeck index={index} deckId={deck.id} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToLearn === "ZH" ? (deck.hsk_level) :languageToLearn === "JP" ? (deck.jlpt_level) :languageToLearn === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>
                ))
            )}
        </div>
    );
}
