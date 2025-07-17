import { useState, useEffect } from "react";
import axios from "axios";
import { LibraryDeck } from "./LibraryDeck";

interface LibraryContainerProps {
    languageToStudy: string;
}

export const LibraryContainer= ({languageToStudy}:LibraryContainerProps) => {
    const [libraryDecksList, setLibraryDecksList] = useState<string[]>([]);

    const fetchLibraryDecks = async () => {
        try {
            const response = await axios.get("http://localhost:8600/api/decks/libraryDeck", {
                params: {language:languageToStudy},
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setLibraryDecksList(typeof response.data.decks === "string"
            ? JSON.parse(response.data.decks)
            : response.data.decks);
        } catch (error: any) {
            if (error.response) {
                setLibraryDecksList([]);
            } else {
                setLibraryDecksList([]);
            }
        }
    }

    useEffect(() => {
        fetchLibraryDecks();
    }, [languageToStudy])


    return (
        <>
            <div style={styles.decksContainer}>
                {libraryDecksList.length > 0 && typeof libraryDecksList[0] === "object" ? (
                    libraryDecksList.map((deck: any, index) => (
                        <LibraryDeck deckId={deck.id} index={index} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToStudy === "ZH" ? (deck.hsk_level) : languageToStudy === "JP" ? (deck.jlpt_level) : languageToStudy === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity} language={languageToStudy}/>
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