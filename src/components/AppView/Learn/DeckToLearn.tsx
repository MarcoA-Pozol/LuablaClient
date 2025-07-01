import type React from "react";

interface DeckToLearnProps {
    index:string|number;
    title:string;
    description:string;
    image:string;
    author:string;
    level:string;
    cardsQuantity:string;
}

export const DeckToLearn = ({index, title, description, image, author, level, cardsQuantity}:DeckToLearnProps) => {

    return (
        <div key={index} style={styles.deck}>
            <h3>{title}</h3>
            <img style={styles.deckImage} src={image ? (`http://localhost:8600${image}`) : ("http://localhost:8600/media/deck_images/cat_1.jpg")}/>
            <p>{description}</p>
            <div style={styles.deckTags}>
                <h4 style={styles.deckAuthor}>{author}</h4>
                <h4 style={styles.deckLevel}>{level}</h4>
                <h4 style={styles.deckCardsQuantity}>{cardsQuantity}</h4>
            </div>
        </div>
    );
}

// Style
const styles: {[key:string]: React.CSSProperties} = {
    deck: {
        border: "1px solid royalblue",
        borderRadius: "8px",
        padding: "16px",
        width: "200px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    },
    deckImage: {
        width: "100%",
        height: "100px",
        objectFit: "cover",
        borderRadius: "4px"
    },
    deckTags: {
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        width: "100%",
        marginBottom: "10px"
    },
    deckAuthor: {
        borderRadius: "5px",
        paddingInline: "5px",
        paddingBlock: "2px",
        border: "none",
        fontSize: "0.8em",
        color: "white",
        backgroundColor: "rgb(95, 30, 179)"
    },
    deckLevel: {
        borderRadius: "5px",
        paddingInline: "5px",
        paddingBlock: "2px",
        border: "none",
        fontSize: "0.8em",
        color: "white",
        backgroundColor: "rgb(224, 72, 45)"
    },
    deckCardsQuantity: {
        borderRadius: "5px",
        paddingInline: "5px",
        paddingBlock: "2px",
        border: "none",
        fontSize: "0.8em",
        color: "white",
        backgroundColor: "rgb(18, 138, 68)"
    }
}