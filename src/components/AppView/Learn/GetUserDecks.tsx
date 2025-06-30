import { useState, useEffect } from "react";
import axios from "axios";

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
        <div style={styles.container}>
            {decksList.length > 0 && typeof decksList[0] === "object" ? (
            decksList.map((deck: any, index) => (
                <div key={index} style={styles.card}>
                <h3>{deck.title}</h3>
                {deck.description && <p>{deck.description}</p>}
                {deck.image && <img src={`http://localhost:8600/${deck.image}`} alt={deck.title} style={styles.image} />}
                </div>
            ))
            ) : (
            <p>No decks found</p>
            )}
        </div>
    );
}


const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    padding: "20px"
  },
  card: {
    border: "1px solid royalblue",
    borderRadius: "8px",
    padding: "16px",
    width: "200px",
    backgroundColor: "#fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
  },
  image: {
    width: "100%",
    height: "100px",
    objectFit: "cover",
    borderRadius: "4px"
  }
};
