import type React from "react";
import type { SetStateAction } from "react";
import { useState } from "react";
import { FaUser, FaCertificate } from "react-icons/fa";
import { useLearningDeckStyles } from "../../../styles/AppView/learningDeck";

interface LearningDeckProps {
    authUser:any;
    index:string|number;
    deckId:number;
    title:string;
    description:string;
    image:string;
    author:string;
    level:string;
    cardsQuantity:string;
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID: React.Dispatch<SetStateAction<number>>;
}


export const LearningDeck = ({authUser, index, deckId, title, description, image, author, level, cardsQuantity, setDisplayedContainer, setDeckToPracticeID}:LearningDeckProps) => {
    const [isDeckHovered, setIsDeckHovered] = useState<boolean>(false);
    const styles = useLearningDeckStyles(isDeckHovered)

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
            {author === authUser.username && (<button style={styles.addCardsButton}>Add +</button>)}
            {Number(cardsQuantity) > 0 && (<button style={styles.studyButton} onClick={() => { setDeckToPracticeID(deckId); setDisplayedContainer("practiceDeckFlashcards") }}>Study</button>)}
        </div>
    );
}
