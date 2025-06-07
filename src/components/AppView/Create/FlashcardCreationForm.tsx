import React, { useState, useEffect, useRef } from "react";
import { handleObjectCreation, clearFormFields } from "../../../functions/handleObjectCreation";
import { fetchUserDecks } from "../../../functions/fetchDecks";
import { useDecksLists } from "../../../hooks/useDecksLists";
import { useLanguages } from "../../../hooks/useLanguages";
import { useTranslation } from "react-i18next";
import { useBaseApiUrl } from "../../../hooks/useBaseApiUrl";

interface FlashcardCreationFormProps {
  selectedDeck:any;
}
export const FlashcardCreationForm = ({selectedDeck}:FlashcardCreationFormProps) => {
    const { languageToLearn } = useLanguages();
    const flashcardTypeName = languageToLearn === "EN" ? "English" : languageToLearn === "ES" ? "Spanish" : languageToLearn === "JP" ? "Japanese" : languageToLearn === "ZH" ? "Chinese" : languageToLearn === "KO" ? "Korean" : languageToLearn === "PT" ? "Portuguese" : languageToLearn === "DE" ? "German" : languageToLearn === "IT" ? "Italian" : languageToLearn === "FR" ? "French" : languageToLearn === "RU" ? "Russian" : "Unknown";
    const formRef = useRef<HTMLFormElement | null>(null);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const { setUserDecksList, setOwnedDecksList } = useDecksLists();
    const { t } = useTranslation();

    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleClearForm = () => {
    if (formRef.current) {
      clearFormFields(formRef.current, languageToLearn);
      }
    };

    const handleFlashcardCreation = (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      handleObjectCreation(
        event,
        useBaseApiUrl("/flashcards/flashcard"),
        { deckId: selectedDeck, language: languageToLearn },
        { "Content-Type": "multipart/form-data" },
        "flashcard"
      );
      clearFormFields(form, languageToLearn);
    const timeoutId = setTimeout(() => {
      fetchUserDecks(languageToLearn, setOwnedDecksList, setUserDecksList);
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
        <h2 style={styles.heading}>{t(flashcardTypeName)} {t("Flashcard")}</h2>

        {languageToLearn !== "JP" && languageToLearn !== "ZH" && languageToLearn !== "KO" && languageToLearn !== "RU" && (
          <label style={styles.label}>
            🏷️
            <input
              name="word"
              type="text"
              style={styles.input}
              placeholder={t("Word")}
            />
          </label>
        )}


        {/* Conditional fields */}
        {languageToLearn === "ZH" && (
          <>
            <label style={styles.label}>
              汉
              <input
                name="hanzi"
                type="text"
                style={styles.input}
                placeholder={t("Hanzi")}
              />
            </label>
            <label style={styles.label}>
              📣
              <input
                name="pinyin"
                type="text"
                style={styles.input}
                placeholder={t("Pinyin")}
              />
            </label>
          </>
        )}

        {languageToLearn === "JP" && (
          <label style={styles.label}>
            🉐
            <input
              name="kana"
              type="text"
              style={styles.input}
              placeholder={t("Kana")}
            />
          </label>
        )}

        {languageToLearn === "KO" && (
          <label style={styles.label}>
            한
            <input
              name="hangul"
              type="text"
              style={styles.input}
              placeholder={t("Hangul")}
            />
          </label>
        )}

        {(languageToLearn === "JP" || languageToLearn === "KO") && (
          <label style={styles.label}>
            🔤
            <input
              name="romaji"
              type="text"
              style={styles.input}
              placeholder={t("Romaji")}
            />
          </label>
        )}

        {languageToLearn === "JP" && (
          <label style={styles.label}>
            漢
            <input
              name="kanji"
              type="text"
              style={styles.input}
              placeholder={t("Kanji (optional)")}
            />
          </label>
        )}

        {languageToLearn === "RU" && (
          <>
            <label style={styles.label}>
              🪆
              <input
                name="cyrillic"
                type="text"
                style={styles.input}
                placeholder={t("Cyrillic")}
                />
            </label>

            <label style={styles.label}>
              🔤
              <input
                name="transliteration"
                type="text"
                style={styles.input}
                placeholder={t("Transliteration")}
                />
            </label>
          </>
        )}


        <label style={styles.label}>
          💡
          <input
            name="meaning"
            type="text"
            style={styles.input}
            placeholder={t("Meaning")}
          />
        </label>

        <label style={styles.label}>
          💬
          <textarea
            name="examplePhrase"
            style={styles.textarea}
            placeholder={t("Example phrase")}
          />
        </label>

        <div style={styles.buttonContainer}>
          <button type="button" style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }} onClick={handleClearForm}>
            {t("Clean")}
          </button>
          <button type="submit" style={styles.button}>
            {t("Add")}
          </button>
        </div>
      </form>
    );
};