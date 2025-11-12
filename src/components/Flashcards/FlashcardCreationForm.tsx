import React, { useState, useRef } from "react";
import { handleObjectCreation, clearFormFields } from "../../functions/handleObjectCreation";
import { fetchUserDecks } from "../../functions/fetchDecks";
import { useDecksLists } from "../../hooks/useDecksLists";
import { useLanguages } from "../../hooks/useLanguages";
import { useTranslation } from "react-i18next";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { includeSentences } from "../../functions/FlashcardView/wordSentences";
import { useFlashcardCreationFormStyles } from "../../styles/AppView/flashcardCreationForm";
import { useAuth } from "../../App";

interface FlashcardCreationFormProps {
  selectedDeck:any;
}
export const FlashcardCreationForm = ({selectedDeck}:FlashcardCreationFormProps) => {
    const { languageToLearn } = useLanguages();
    const flashcardTypeName = languageToLearn === "EN" ? "English" : languageToLearn === "ES" ? "Spanish" : languageToLearn === "JP" ? "Japanese" : languageToLearn === "ZH" ? "Chinese" : languageToLearn === "KO" ? "Korean" : languageToLearn === "PT" ? "Portuguese" : languageToLearn === "DE" ? "German" : languageToLearn === "IT" ? "Italian" : languageToLearn === "FR" ? "French" : languageToLearn === "RU" ? "Russian" : "Unknown";
    const formRef = useRef<HTMLFormElement | null>(null);
    const { setUserDecksList, setOwnedDecksList } = useDecksLists();
    const [ sentencesList, setSentencesList ] = useState<string[]>([]);
    const { t } = useTranslation();
    const styles = useFlashcardCreationFormStyles()
    const { authUser }= useAuth();
    const userNativeLanguage = authUser.native_language;

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

        <button type="button" onClick={() => includeSentences(formRef, setSentencesList, languageToLearn, userNativeLanguage)}>{t("Generate Example Phrases")}</button>

 {/* Editable sentence inputs */}
{sentencesList.length > 0 && (
  <div style={{ marginTop: "10px", width: "100%" }}>
    <h4 style={{ marginBottom: "8px" }}>{t("Example Sentences")}</h4>
    {sentencesList.slice(0, 3).map((sentence, index) => (
      <label key={index} style={{ display: "block", marginBottom: "8px" }}>
        {t("Sentence")} {index + 1}:
        <input
          type="text"
          name={`sentence_${index + 1}`}
          value={sentence}
          onChange={(e) => {
            const updated = [...sentencesList];
            updated[index] = e.target.value;
            setSentencesList(updated);
          }}
          style={{
            width: "100%",
            padding: "6px",
            marginTop: "4px",
            borderRadius: "6px",
            border: "1px solid #87cefa",
            backgroundColor: "#f9fcff",
            color: "#022879ff",
            fontWeight: "bold"
          }}
          placeholder={t("Edit this sentence")}
        />
      </label>
    ))}

    {/* Hidden input to include sentences as a list in POST submission */}
    <input
      type="hidden"
      name="sentences"
      value={JSON.stringify(sentencesList)}
    />
  </div>
)}

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