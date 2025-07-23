import { useState, type SetStateAction } from "react";
import { FaUser, FaCertificate } from "react-icons/fa";
import { handleAcquireDeck } from "../../../functions/handleAcquireDeck";
import { useTemporaryMessage } from "../../../hooks/useTemporaryMessage";
import { TemporaryMessage } from "../../TemporaryMessage";
import { removeFromLibraryDecks } from "../../../utils/removeFromLibraryDecks";
import { fetchUserDecks } from "../../../functions/fetchDecks";
import type { Deck } from "../../../schemas/Deck";
import { useLibraryDeckStyles } from "../../../styles/AppView/libraryDeck";

interface LibraryDeckProps {
    deckId:number;
    index:string|number;
    title:string;
    description:string;
    image:string;
    author:string;
    level:string;
    cardsQuantity:string;
    language:string;
    refreshLibraryDecksList:(deckId:number)=>void;
    setLibraryDecksList:React.Dispatch<SetStateAction<Deck[]>>;
    setOwnedDecksList:React.Dispatch<SetStateAction<Deck[]>>;
    setUserDecksList:React.Dispatch<SetStateAction<Deck[]>>;
    libraryDecksList:Deck[];
}
export const LibraryDeck = ({deckId, index, title, description, image, author, level, cardsQuantity, language, refreshLibraryDecksList, setLibraryDecksList, setOwnedDecksList, setUserDecksList, libraryDecksList}:LibraryDeckProps) => {
    const [isDeckHovered, setIsDeckHovered] = useState<boolean>(false);
    const temporaryMessage = useTemporaryMessage();
    const styles = useLibraryDeckStyles(isDeckHovered);

    return (
        <div key={index} style={styles.deck} onMouseEnter={() => {setIsDeckHovered(true)}} onMouseLeave={() => {setIsDeckHovered(false)}}>
            <h3 style={styles.title}>{title}</h3>
            <img style={styles.image} src={image ? (`http://localhost:8600${image}`) : ("http://localhost:8600/media/deck_images/cat_1.jpg")}/>
            <p style={styles.description}>{description}</p>
            <div style={styles.tags}>
                <h4 style={styles.author}><FaUser/> {author}</h4>
                <h4 style={styles.level}><FaCertificate/> {level}</h4>
                <h4 style={styles.cardsQuantity}>❐ {cardsQuantity}</h4>
            </div>
            <button
                style={styles.getDeckButton}
                onClick={async () => {
                    await handleAcquireDeck(deckId, language, temporaryMessage);
                    refreshLibraryDecksList(deckId)
                    removeFromLibraryDecks(deckId, setLibraryDecksList, libraryDecksList);
                    await fetchUserDecks(language, setOwnedDecksList, setUserDecksList);
                }}
            >
                Get
            </button>
            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </div>
    );
}