import { useState, useEffect } from "react";
import axios from "axios";
import { cefrLevelsList, jlptLevelsList, hskLevelsList, topikLevelsList } from "../../../datasets/AppView";

interface DeckSelectionFormProps {
  languageToStudy: string;
  userDecksList:any[];
}
export const DeckSelectionForm = ({languageToStudy, userDecksList}:DeckSelectionFormProps) => {
  const decks = userDecksList;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
  useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  const levelList =
  languageToStudy === "JP"
    ? jlptLevelsList
    : languageToStudy === "ZH"
    ? hskLevelsList: 
    languageToStudy === "KO"
    ? topikLevelsList
    : cefrLevelsList;

  const handleDeckCreation = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post("http://localhost:8600/api/app/deck", formData, {withCredentials:true, headers:{"Content-Type": "multipart/form-data"}});
      const responseData = response.data;

      if (response.status !== 201) {
        alert(`Error while trying to create a deck: ${responseData.error}`);
      } 

      alert("Deck created!");
    } catch (error) {
      alert(`Creating deck failed: ${error}`);
    }


    setShowCreateForm(false);
  };


  // Style
  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      padding: "20px",
      paddingBlock: screenWidth < 768 ? "0px" : "20px",
      border: "1px solid royalblue",
      borderRadius: "10px",
      width: "300px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      height: screenWidth < 768 ? "180px" : "340px",
      position: screenWidth < 768 ? "sticky" : "sticky",
      bottom: "60px",
      backgroundColor: "white"
    },
    heading: {
      color: "royalblue",
      fontSize: screenWidth < 768 ? "1rem" : "1.5rem",
      marginBottom: screenWidth < 768 ? "0" : "20px",
      textAlign: "center",
    },
    noDecksContainer: {
      textAlign: "center",
    },
    decksList: {
      borderRadius: "5px",
      display: "flex",
      flexDirection: "column",
      gap: screenWidth < 768 ? "1px" : "5px",
      marginBottom: screenWidth < 768 ? "0" : "20px",
      height: screenWidth < 768 ? "80px" : "200px",
      overflowY: "scroll"
    },
    deckItem: {
      backgroundColor: "white",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: screenWidth < 768 ? "1px" : "10px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "0.3s ease",
    },
    deckImage: {
      width: "60px",
      height: "60px",
      borderRadius: "6px",
      objectFit: "cover",
    },
    deckName: {
      fontSize: "18px",
      color: "#333",
    },
    text: {
      color: "#333",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "royalblue",
      color: "white",
      border: "none",
      padding: "10px 16px",
      fontSize: "16px",
      borderRadius: "6px",
      cursor: "pointer",
      margin: "5px",
    },
    createMore: {
      textAlign: "center",
    },
    // Floating form
    overlay: {
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    floatingForm: {
      backgroundColor: "white",
      padding: "25px",
      borderRadius: "10px",
      maxWidth: "500px",
      width: "90%",
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    },
    label: {
      display: "block",
      marginBottom: "12px",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "8px",
      marginTop: "4px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    textarea: {
      width: "100%",
      padding: "8px",
      marginTop: "4px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      resize: "vertical",
      minHeight: "60px",
    },
    formButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
  };


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Choose a Deck</h2>

      {decks.length === 0 ? (
        <div style={styles.noDecksContainer}>
          <p style={styles.text}>You don't have any decks yet.</p>
          <button style={styles.button} onClick={() => setShowCreateForm(true)}>+ Create New Deck</button>
        </div>
      ) : (
        <>
          <div style={styles.decksList}>
            {decks.map((deck) => (
              <div key={deck.id} style={styles.deckItem}>
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

      {/* Floating Create Deck Form */}
      {showCreateForm && (
        <div style={styles.overlay}>
          <form onSubmit={(event) => handleDeckCreation(event)} style={styles.floatingForm} method="POST" encType="multipart/form-data">
            <h3 style={styles.heading}>Create New Deck</h3>

            <input type="hidden" name="language" value={languageToStudy}/>

            <label style={styles.label}>
              Title:
              <input type="text" name="title" style={styles.input} required={true} placeholder="Example: ''Words for Beginners''"/>
            </label>

            <label style={styles.label}>
              Description:
              <textarea name="description" style={styles.textarea} required={true} placeholder="Example: ''These words are ideal if you are starting with learning this language from scratch.''"/>
            </label>

            <label style={styles.label}>
              {languageToStudy === "JP" ? ("JLPT Level") : languageToStudy === "ZH" ? ("HSK Level") : languageToStudy === "KO" ? ("TOPIK Level") : ("CEFR Level")}
              <select name={languageToStudy === "JP" ? ("jlptLevel") : languageToStudy === "ZH" ? ("hskLevel") : languageToStudy === "KO" ? ("topikLevel") : ("cefrLevel")} required={true}>
                <option disabled={true}>Select</option>
                { levelList.map((level, index) => (
                  <option key={index} value={level}>
                    { level }
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              Shareable Deck:
              <input type="checkbox" name="isShareable" required={false}/>
            </label>

            <label style={styles.label}>
              Background Image:
              <input type="file" name="image" style={styles.input} required={false}/>
            </label>

            <div style={styles.formButtons}>
              <button style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }} onClick={() => setShowCreateForm(false)}>Cancel</button>
              <button type="submit" style={styles.button}>Create</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};