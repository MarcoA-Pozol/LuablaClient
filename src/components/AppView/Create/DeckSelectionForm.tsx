import { useState, useEffect, type SetStateAction } from "react";
import { DeckCreationForm } from "./DeckCreationForm";
import "../../../styles/AppView/deckSelectionForm.css";
import type { Deck } from "../../../schemas/Deck";

interface DeckSelectionFormProps {
  languageToStudy: string;
  userDecksList:any[];
  selectedDeck:any;
  setSelectedDeck:React.Dispatch<SetStateAction<any>>;
  setOwnedDecksList:React.Dispatch<SetStateAction<Deck[]>>;
  setUserDecksList:React.Dispatch<SetStateAction<Deck[]>>;
}
export const DeckSelectionForm = ({languageToStudy, userDecksList, selectedDeck, setSelectedDeck, setOwnedDecksList, setUserDecksList}:DeckSelectionFormProps) => {
  const decks = userDecksList;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const responsiveValue = function<T>(smallScreenValue: T, largeScreenValue: T, screenWidth: number): T {
    return screenWidth < 768 ? smallScreenValue : largeScreenValue;
  };


  useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);


  // Styles
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: "20px",
      paddingBlock: responsiveValue("0px", "20px", screenWidth),
      border: "1px solid royalblue",
      borderRadius: "10px",
      width: "300px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      height: responsiveValue("180px", "340px", screenWidth),
      position: responsiveValue("sticky", "sticky", screenWidth),
      bottom: "60px",
      backgroundColor: "white"
    },
    heading: {
      color: "royalblue",
      fontSize: responsiveValue("1rem", "1.5rem", screenWidth),
      marginBottom: responsiveValue("0", "20px", screenWidth),
      textAlign: "center",
    },
    noDecksContainer: {
      textAlign: "center",
    },
    decksList: {
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      gap:responsiveValue("1px", "5px", screenWidth),
      marginBottom:responsiveValue("0", "20px", screenWidth),
      height:responsiveValue("90px", "200px", screenWidth),
      overflowY: "scroll"
    },
    deckItem: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: responsiveValue("1px", "10px", screenWidth),
      border: "1px solid #ccc",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s ease",
      width: "250px",
      margin: "0px auto"
    },
    deckImage: {
      width: responsiveValue("25px", "40px", screenWidth),
      height: responsiveValue("25px", "40px", screenWidth),
      borderRadius: "6px",
      objectFit: "cover",
    },
    deckName: {
      fontSize: responsiveValue("1rem", "1.2rem", screenWidth),
      color: "#333",
      width: "100%",
      textAlign: "center"
    },
    text: {
      color: "red",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "royalblue",
      color: "white",
      border: "none",
      padding: responsiveValue("6px 10px", "10px 16px", screenWidth),
      fontSize: "16px",
      borderRadius: "6px",
      cursor: "pointer",
      margin: "5px",
    },
    createMore: {
      textAlign: "center",
    },
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Choose a Deck</h2>

      {decks.length < 1 ? (
        <div style={styles.noDecksContainer}>
          <p style={styles.text}>You don't have any decks yet.</p>
          <button style={styles.button} onClick={() => setShowCreateForm(true)}>+ Create New Deck</button>
        </div>
      ) : (
        <>
          <div style={styles.decksList}>
            {decks.map((deck) => (
              <div onClick={() => {setSelectedDeck(deck.id)}} key={deck.id} style={styles.deckItem} className={selectedDeck === deck.id ? "selected-deck" : ""}>
                <img src={deck.image ? (`http://localhost:8600${deck.image}`) : ("http://localhost:8600/media/deck_images/cat_1.jpg")} alt={deck.title} style={styles.deckImage} />
                <span style={styles.deckName}>{deck.title}</span>
              </div>
            ))}
          </div>

          <div style={styles.createMore}>
            <button style={styles.button} onClick={() => setShowCreateForm(true)}>+ Create Another Deck</button>
          </div>
        </>
      )}

      <DeckCreationForm languageToStudy={languageToStudy} screenWidth={screenWidth} responsiveValue={responsiveValue} showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm} setOwnedDecksList={setOwnedDecksList} setUserDecksList={setUserDecksList}/>
    </div>
  );
};