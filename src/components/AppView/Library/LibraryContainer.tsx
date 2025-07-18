import { LibraryDeck } from "./LibraryDeck";

interface LibraryContainerProps {
    languageToStudy: string;
    libraryDecksList: object[];
    refreshLibraryDecksList:(deckId:number) => void;
}

export const LibraryContainer= ({languageToStudy, libraryDecksList, refreshLibraryDecksList}:LibraryContainerProps) => {

    return (
        <>
            <div style={styles.decksContainer}>
                {libraryDecksList.length > 0 && typeof libraryDecksList[0] === "object" ? (
                    libraryDecksList.map((deck: any, index) => (
                        <LibraryDeck deckId={deck.id} index={index} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToStudy === "ZH" ? (deck.hsk_level) : languageToStudy === "JP" ? (deck.jlpt_level) : languageToStudy === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity} language={languageToStudy} refreshLibraryDecksList={refreshLibraryDecksList}/>
                    ))
                ) : (
                    <p>No decks found</p>
                )}
            </div>
        </>
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