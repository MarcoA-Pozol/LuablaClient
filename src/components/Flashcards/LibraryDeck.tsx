import { useState } from "react";
import { FaUser, FaCertificate } from "react-icons/fa";
import { handleAcquireDeck } from "../../functions/handleAcquireDeck";
import { useTemporaryMessage } from "../../hooks/useTemporaryMessage";
import { TemporaryMessage } from "../General/TemporaryMessage";
import { removeFromLibraryDecks } from "../../utils/removeFromLibraryDecks";
import { fetchUserDecks } from "../../requests/decks";
import type { LibraryDeckProps } from "../../types/AppView/LibraryDeckProps";
import { useLibraryDeckStyles } from "../../styles/AppView/libraryDeck";
import { useDecksLists } from "../../hooks/useDecksLists";
import { useLanguages } from "../../hooks/useLanguages";
import { useSocialData } from "../../hooks/useSocialData";
import { createNotification } from "../../functions/createNotification";
import { useTranslation } from "react-i18next";
import { useDefaultDeckImagePath } from "../../hooks/useBaseMediaUrl";

export const LibraryDeck = ({deckId, index, title, description, image, author, level, cardsQuantity}:LibraryDeckProps) => {
    const [isDeckHovered, setIsDeckHovered] = useState<boolean>(false);
    const temporaryMessage = useTemporaryMessage();
    const styles = useLibraryDeckStyles(isDeckHovered);
    const { setLibraryDecksList, setOwnedDecksList, setUserDecksList, libraryDecksList } = useDecksLists();
    const { languageToLearn } = useLanguages();
    const { fetchNotifications } = useSocialData();
    const { t } = useTranslation();

    return (
        <div key={index} style={styles.deck} onMouseEnter={() => {setIsDeckHovered(true)}} onMouseLeave={() => {setIsDeckHovered(false)}}>
            <h3 style={styles.title}>{t(title)}</h3>
            <img style={styles.image} src={image ? (`http://localhost:8600${image}`) : (useDefaultDeckImagePath(languageToLearn))}/>
            <p style={styles.description}>{description}</p>
            <div style={styles.tags}>
                <h4 style={styles.author}><FaUser/> {author}</h4>
                <h4 style={styles.level}><FaCertificate/> {level}</h4>
                <h4 style={styles.cardsQuantity}>❐ {cardsQuantity}</h4>
            </div>
            <button
                style={styles.getDeckButton}
                onClick={async () => {
                    await handleAcquireDeck(deckId, languageToLearn, temporaryMessage);
                    removeFromLibraryDecks(deckId, setLibraryDecksList, libraryDecksList);
                    await fetchUserDecks(languageToLearn, setOwnedDecksList, setUserDecksList);
                    await createNotification("Deck acquired!", `New deck from the library is now available to practice (${title})`, "OBTAINED_DECK");
                    await fetchNotifications();
                }}
            >
                {t("Get")}
            </button>
            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </div>
    );
}