import { useState, useEffect } from "react";
import { FaUser, FaCertificate } from "react-icons/fa";
import { handleAcquireDeck } from "../../../functions/handleAcquireDeck";
import { useTemporaryMessage } from "../../../hooks/useTemporaryMessage";
import { TemporaryMessage } from "../../TemporaryMessage";

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
}
export const LibraryDeck = ({deckId, index, title, description, image, author, level, cardsQuantity, language, refreshLibraryDecksList}:LibraryDeckProps) => {
    const [isDeckHovered, setIsDeckHovered] = useState<boolean>(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const temporaryMessage = useTemporaryMessage();

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Style
    const styles: {[key:string]: React.CSSProperties} = {
        deck: {
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            transform: isDeckHovered ? "translateY(-10px)" : "none",
            boxShadow: isDeckHovered 
            ? "5px 6px 6px 4px rgba(66, 64, 64, 0.6)" 
            : "3px 4px 2px 3px rgb(66, 64, 64)",
            paddingBlock: "10px",
            paddingInline: "10px",
            justifyContent: "center",
            justifyItems: "center",
            textAlign: "center",
            alignItems: "center",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            marginBottom: "50px",
            width: screenWidth < 768 ? "70vw" : "25vw"
        },
        title: {
            width: "100%",
            fontSize: "1.2em",
            color: "#333333",
            marginTop: 0,
            marginBottom: 0,
            paddingInline: "5px",
            textAlign: "center",
            alignContent: "center",
            whiteSpace: "nowrap",
            overflowX: "hidden"
        },
        image: {
            width: "220px",
            height: "130px",
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
            boxShadow: "1px 1px 1px 2px rgb(93, 93, 94)",
            objectFit: "cover"
        },
        description: {
            minHeight: "70px",
            maxHeight: "70px",
            fontSize: "0.9em",
            color: "#404650",
            lineHeight: 1.2,
            marginTop: 0,
            marginBottom: "5px",
            paddingBlock: "10px",
            paddingInline: "20px",
            borderBottom: "1px solid rgb(43, 44, 44)",
            overflowY: "scroll"
        },
        tags: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            marginBottom: "10px"
        },
        author: {
            borderRadius: "5px",
            paddingInline: "5px",
            paddingBlock: "2px",
            border: "none",
            fontSize: "0.8em",
            color: "white",
            backgroundColor: "rgb(95, 30, 179)"
        },
        level: {
            borderRadius: "5px",
            paddingInline: "5px",
            paddingBlock: "2px",
            border: "none",
            fontSize: "0.8em",
            color: "white",
            backgroundColor: "rgb(224, 72, 45)"
        },
        cardsQuantity: {
            borderRadius: "5px",
            paddingInline: "5px",
            paddingBlock: "2px",
            border: "none",
            fontSize: "0.8em",
            color: "white",
            backgroundColor: "rgb(18, 138, 68)"
        },
        getDeckButton: {
            width: "100%",
            paddingBlock: "5px",
            paddingInline: "120px",
            textAlign: "center",
            alignContent: "center",
            backgroundColor: "rgb(35, 10, 90)",
            color: "white",
            cursor: "pointer",
            fontSize: "1.2rem",
            borderRadius: "5px",
            border: "none"
        }
    }

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
                onClick={() => {
                    handleAcquireDeck(deckId, language, temporaryMessage);
                    setTimeout(() => refreshLibraryDecksList(deckId), 1000);
                }}
            >
                Get
            </button>
            {temporaryMessage.show && <TemporaryMessage message={temporaryMessage.text} color={temporaryMessage.color}/>}
        </div>
    );
}