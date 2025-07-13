import React, { useState, useEffect, useRef } from "react";
import { handleObjectCreation, clearFormFields } from "../../../functions/handleObjectCreation";

interface FlashcardCreationFormProps {
  languageToStudy: string;
  refreshDecks:()=>void;
  selectedDeck:any;
}
export const FlashcardCreationForm = ({languageToStudy, refreshDecks, selectedDeck}:FlashcardCreationFormProps) => {
    const flashcardTypeName = languageToStudy === "EN" ? "English" : languageToStudy === "ES" ? "Spanish" : languageToStudy === "JP" ? "Japanese" : languageToStudy === "ZH" ? "Chinese" : languageToStudy === "KO" ? "Korean" : languageToStudy === "PT" ? "Portuguese" : languageToStudy === "DE" ? "German" : languageToStudy === "IT" ? "Italian" : languageToStudy === "FR" ? "French" : languageToStudy === "RU" ? "Russian" : "Unknown";
    const formRef = useRef<HTMLFormElement | null>(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClearForm = () => {
    if (formRef.current) {
      clearFormFields(formRef.current, languageToStudy);
      }
    };

    const handleFlashcardCreation = (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      clearFormFields(form, languageToStudy);
      handleObjectCreation(
        event,
        "http://localhost:8600/api/flashcards/flashcard",
        { deckId: selectedDeck, language: languageToStudy },
        { "Content-Type": "multipart/form-data" },
        "flashcard"
      );
    const timeoutId = setTimeout(() => {
      refreshDecks();
    }, 1000); 

    return () => clearTimeout(timeoutId); 
    };

    // Style
    const styles: { [key: string]: React.CSSProperties } = {
      form: {
        backgroundColor: "white",
        padding: "20px",
        paddingBlock: screenWidth < 768 ? "5px" : "20px",
        borderRadius: "10px",
        width: "300px",
        border: "1px solid royalblue",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: screenWidth < 768 ? "280px" : "340px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      },
      heading: {
        color: "royalblue",
        fontSize: "22px",
        textAlign: "center",
        marginBottom: screenWidth < 768 ? "0" : "20px",
        marginTop: screenWidth < 768 ? "0" : "20px",
      },
      label: {
        display: "inline-flex",
        color: "#333",
        marginBottom: "12px",
        justifyContent: "center"
      },
      input: {
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        height: "10px",
        width: "200px"
      },
      textarea: {
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        height: screenWidth < 768 ? "10px" : "60px",
        width: "200px"
      },
      buttonContainer: {
        display: "inline-flex",
        justifyContent:"center",
        gap: "10px",
        width: "230px",
        margin: "0 auto"
      },
      button: {
        padding: "8px 0px",
        backgroundColor: "royalblue",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        flex: 1,
      },
    };


    return (
      <form ref={formRef} onSubmit={handleFlashcardCreation} style={styles.form} method="POST" encType="multipart/form-data">
        <h2 style={styles.heading}>{flashcardTypeName} Flashcard</h2>

        {languageToStudy !== "JP" && languageToStudy !== "ZH" && languageToStudy !== "KO" && (
          <label style={styles.label}>
            🏷️
            <input
              name="word"
              type="text"
              style={styles.input}
              placeholder="Word"
            />
          </label>
        )}


        {/* Conditional fields */}
        {languageToStudy === "ZH" && (
          <>
            <label style={styles.label}>
              汉
              <input
                name="hanzi"
                type="text"
                style={styles.input}
                placeholder="Hanzi"
              />
            </label>
            <label style={styles.label}>
              📣
              <input
                name="pinyin"
                type="text"
                style={styles.input}
                placeholder="Pinyin"
              />
            </label>
          </>
        )}

        {languageToStudy === "JP" && (
          <label style={styles.label}>
            🉐
            <input
              name="kana"
              type="text"
              style={styles.input}
              placeholder="Kana"
            />
          </label>
        )}

        {languageToStudy === "KO" && (
          <label style={styles.label}>
            한
            <input
              name="hangul"
              type="text"
              style={styles.input}
              placeholder="Hangul"
            />
          </label>
        )}

        {(languageToStudy === "JP" || languageToStudy === "KO") && (
          <label style={styles.label}>
            🔤
            <input
              name="romaji"
              type="text"
              style={styles.input}
              placeholder="Romaji"
            />
          </label>
        )}

        {languageToStudy === "JP" && (
          <label style={styles.label}>
            漢
            <input
              name="kanji"
              type="text"
              style={styles.input}
              placeholder="Kanji (optional)"
            />
          </label>
        )}

        <label style={styles.label}>
          💡
          <input
            name="meaning"
            type="text"
            style={styles.input}
            placeholder="Meaning"
          />
        </label>

        <label style={styles.label}>
          💬
          <textarea
            name="examplePhrase"
            style={styles.textarea}
            placeholder="Example phrase"
          />
        </label>

        <div style={styles.buttonContainer}>
          <button type="button" style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }} onClick={handleClearForm}>
            Clean
          </button>
          <button type="submit" style={styles.button}>
            Add
          </button>
        </div>
      </form>
    );
};