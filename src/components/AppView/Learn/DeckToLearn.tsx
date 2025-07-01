import type React from "react";

interface DeckToLearnProps {
    index:string|number;
    title:string;
    description:string;
    image:string;
    level:string;
    languageToStudy:string;
}

export const DeckToLearn = ({index, title, description, image, level, languageToStudy}:DeckToLearnProps) => {

    return (
        <div key={index} style={styles.deck}>
            <h3>{title}</h3>
            <p>{description}</p>
            <img style={styles.deckImage} src={image ? (`http://localhost:8600${image}`) : ("http://localhost:8600/media/deck_images/cat_1.jpg")}/>
            <div style={styles.inlineTags}>
                <span>{languageToStudy === "ZH" ? ("HSK") : languageToStudy === "JP" ? ("JLPT") : languageToStudy === "KO" ? ("TOPIK") : ("CEFR")}{level}</span>
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
    inlineTags: {
        display: "inline-flex",
        justifyContent: "center",
        alignContent: "center",
        textAlign: "center"
    }
}