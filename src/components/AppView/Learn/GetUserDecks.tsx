import { DeckToLearn } from "./DeckToLearn";

interface GetUserDecksProps {
    authUser:any;
    userDecksList:any[];
    languageToStudy:string;
}
export const GetUserDecks = ({authUser, userDecksList, languageToStudy}:GetUserDecksProps) => {

    return (
        <div style={styles.decksContainer}>
            {userDecksList.length > 0 && typeof userDecksList[0] === "object" ? (
            userDecksList.map((deck: any, index) => (
                <DeckToLearn authUser={authUser} index={index} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToStudy === "ZH" ? (deck.hsk_level) : languageToStudy === "JP" ? (deck.jlpt_level) : languageToStudy === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity}/>
            ))
            ) : (
            <p>No decks found</p>
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
