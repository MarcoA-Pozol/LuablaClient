import { useState, useEffect } from "react";
import axios from "axios";
import { DeckToLearn } from "./DeckToLearn";

interface GetUserDecksProps {
    languageToStudy:string;
}
export const GetUserDecks = ({languageToStudy}:GetUserDecksProps) => {
    const [decksList, setDecksList] = useState<any[]>([""]);

    useEffect(() => {

        const fetchDecks = async () => {
            try {
                const response = await axios.get("http://localhost:8600/api/app/deck", {
                    params: {language:languageToStudy},
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setDecksList(typeof response.data.decks === "string"
                ? JSON.parse(response.data.decks)
                : response.data.decks);
            } catch (error: any) {
                if (error.response) {
                    setDecksList(["No decks were found"]);
                } else {
                    setDecksList(["Error with server"]);
                }
            }
        }

        fetchDecks();
    }, [languageToStudy])

    return (
        <div style={styles.decksContainer}>
            {decksList.length > 0 && typeof decksList[0] === "object" ? (
            decksList.map((deck: any, index) => (
                <DeckToLearn index={index} title={deck.title} description={deck.description} image={deck.image} author={deck.author} level={languageToStudy === "ZH" ? (deck.hsk_level) : languageToStudy === "JP" ? (deck.jlpt_level) : languageToStudy === "KO" ? (deck.topik_level) : (deck.cefr_level)} cardsQuantity={deck.cards_quantity}/>
            ))
            ) : (
            <p>No decks found</p>
            )}
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
  decksContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    gap: "20px",
    padding: "20px"
  },
};
