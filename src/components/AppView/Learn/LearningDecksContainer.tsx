import { LearningDeck } from "./LearningDeck";
import { useLearningDecksContainerStyles } from "../../../styles/AppView/learningDecksContainer";
import type { LearningDecksContainerProps } from "../../../types/AppView/LearningDecksContainerProps";
import { useDecksLists } from "../../../hooks/useDecksLists";

export const LearningDecksContainer = ({authUser, languageToStudy, setDisplayedContainer, setDeckToPracticeID}:LearningDecksContainerProps) => {
    const styles = useLearningDecksContainerStyles();
    const {userDecksList, ownedDecksList} = useDecksLists()

    return (
        <div style={styles.decksContainer}>
            {userDecksList.length <= 0 && ownedDecksList.length <= 0 ? (
                <p>No decks found</p>
            ) : (
                [...userDecksList, ...ownedDecksList].map((deck: any, index) => (
                    <LearningDeck authUser={authUser} index={index} deckId={deck.id} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToStudy === "ZH" ? (deck.hsk_level) : languageToStudy === "JP" ? (deck.jlpt_level) : languageToStudy === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>
                ))
            )}
        </div>
    );
}
