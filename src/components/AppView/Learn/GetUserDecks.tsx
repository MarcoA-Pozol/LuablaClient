import type { SetStateAction } from "react";
import { DeckToLearn } from "./DeckToLearn";

interface GetUserDecksProps {
    authUser:any;
    userDecksList:any[];
    ownedDecksList:any[];
    languageToStudy:string;
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeFlashcardsList: React.Dispatch<SetStateAction<object[]|any[]>>;
}
export const DecksToStudyContainer = ({authUser, userDecksList, ownedDecksList, languageToStudy, setDisplayedContainer, setDeckToPracticeFlashcardsList}:GetUserDecksProps) => {

    return (
        <div style={styles.decksContainer}>
            {userDecksList.length > 0 && typeof userDecksList[0] === "object" ? (
                userDecksList.map((deck: any, index) => (
                    <DeckToLearn authUser={authUser} index={index} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToStudy === "ZH" ? (deck.hsk_level) : languageToStudy === "JP" ? (deck.jlpt_level) : languageToStudy === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeFlashcardsList={setDeckToPracticeFlashcardsList}/>
                ))
                ) : (
                <p>No decks found</p>
            )}

            {ownedDecksList.length > 0 && typeof ownedDecksList[0] === "object" && (
                ownedDecksList.map((deck: any, index) => (
                    <DeckToLearn authUser={authUser} index={index} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToStudy === "ZH" ? (deck.hsk_level) : languageToStudy === "JP" ? (deck.jlpt_level) : languageToStudy === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeFlashcardsList={setDeckToPracticeFlashcardsList}/>
                ))
            )}
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
  decksContainer: {
    paddingTop: "20px",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
    gap: "50px",
  },
};
