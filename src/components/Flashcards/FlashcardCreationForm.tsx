import React, { useState, useRef } from "react";
import { handleObjectCreation, clearFormFields } from "../../functions/handleObjectCreation";
import { fetchUserDecks } from "../../functions/fetchDecks";
import { useDecksLists } from "../../hooks/useDecksLists";
import { useLanguages } from "../../hooks/useLanguages";
import { useTranslation } from "react-i18next";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { fetchWordSentences } from "../../functions/handleFetchWordSentences";
import { flashcardCreationFormStyle } from "../../styles/AppView/flashcardCreationForm";

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
    const styles = flashcardCreationFormStyle

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

    const includeSentences = async () => {
        const response = await fetchWordSentences(languageToLearn, "Dog");
        let items;
        let failedToFetchSentencesDefault = "Not example phrases were provided";

        if (response?.data?.items) {
          items = response.data.items;

          if (typeof items === "string") {
            try {
              items = JSON.parse(items);
            } catch (e) {
              items = [failedToFetchSentencesDefault];
            }
          }

        } else {
          items = [failedToFetchSentencesDefault];
        }

        setSentencesList(items);
    }

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

        <button onClick={includeSentences}>{t("Generate Example Phrases")}</button>

        {/* If there are sentences in sentences list, show this container */}
        {sentencesList && (
          <label style={styles.label}>
            💬
            <textarea
              name="sentences"
              style={styles.textarea}
              placeholder={t("Sentences")}
            />
          </label>
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