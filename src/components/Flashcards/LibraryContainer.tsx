import { useDecksLists } from "../../hooks/useDecksLists";
import { useLanguages } from "../../hooks/useLanguages";
import { LibraryDeck } from "./LibraryDeck";
import { useTranslation } from "react-i18next";

export const LibraryContainer= () => {
    const { libraryDecksList } = useDecksLists();
    const { languageToLearn } = useLanguages();
    const  { t } = useTranslation();

    return (
        <div style={styles.decksContainer}>
            {libraryDecksList.length > 0 && typeof libraryDecksList[0] === "object" ? (
                libraryDecksList.map((deck: any, index) => (
                    <LibraryDeck deckId={deck.id} index={index} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToLearn === "ZH" ? (deck.hsk_level) : languageToLearn === "JP" ? (deck.jlpt_level) : languageToLearn === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity}/>
                ))
            ) : (
                <p>{t("There are not more available content")}</p>
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