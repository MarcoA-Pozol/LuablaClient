import React, { useState, useRef } from "react";
import { handleObjectCreation, clearFormFields } from "../../functions/handleObjectCreation";
import { fetchUserDecks } from "../../requests/decks";
import { useDecksLists } from "../../hooks/useDecksLists";
import { useLanguages } from "../../hooks/useLanguages";
import { useTranslation } from "react-i18next";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";
import { includeSentences } from "../../functions/FlashcardView/wordSentences";
import "../../styles/AppView/flashcardCreationForm.css";
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
    const [ wordTranslation, setWordTranslation ] = useState<string>('');
    const { t } = useTranslation();
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
      <form ref={formRef} onSubmit={handleFlashcardCreation} className="flashcard-form" method="POST" encType="multipart/form-data">
        <h2 className="flashcard-heading">{t(flashcardTypeName)} {t("Flashcard")}</h2>

        {languageToLearn !== "JP" && languageToLearn !== "ZH" && languageToLearn !== "KO" && languageToLearn !== "RU" && (
          <label className="flashcard-label">
            🏷️
            <input
              name="word"
              type="text"
              className="flashcard-input"
              placeholder={t("Word")}
            />
          </label>
        )}


        {/* Conditional fields */}
        {languageToLearn === "ZH" && (
          <>
            <label className="flashcard-label">
              汉
              <input
                name="hanzi"
                type="text"
                className="flashcard-input"
                placeholder={t("Hanzi")}
              />
            </label>
            <label className="flashcard-label">
              📣
              <input
                name="pinyin"
                type="text"
                className="flashcard-input"
                placeholder={t("Pinyin")}
              />
            </label>
          </>
        )}

        {languageToLearn === "JP" && (
          <label className="flashcard-label">
            🉐
            <input
              name="kana"
              type="text"
              className="flashcard-input"
              placeholder={t("Kana")}
            />
          </label>
        )}

        {languageToLearn === "KO" && (
          <label className="flashcard-label">
            한
            <input
              name="hangul"
              type="text"
              className="flashcard-input"
              placeholder={t("Hangul")}
            />
          </label>
        )}

        {(languageToLearn === "JP" || languageToLearn === "KO") && (
          <label className="flashcard-label">
            🔤
            <input
              name="romaji"
              type="text"
              className="flashcard-input"
              placeholder={t("Romaji")}
            />
          </label>
        )}

        {languageToLearn === "JP" && (
          <label className="flashcard-label">
            漢
            <input
              name="kanji"
              type="text"
              className="flashcard-input"
              placeholder={t("Kanji (optional)")}
            />
          </label>
        )}

        {languageToLearn === "RU" && (
          <>
            <label className="flashcard-label">
              🪆
              <input
                name="cyrillic"
                type="text"
                className="flashcard-input"
                placeholder={t("Cyrillic")}
                />
            </label>

            <label className="flashcard-label">
              🔤
              <input
                name="transliteration"
                type="text"
                className="flashcard-input"
                placeholder={t("Transliteration")}
                />
            </label>
          </>
        )}


        <label className="flashcard-label">
          💡
          <input
            name="meaning"
            type="text"
            className="flashcard-input"
            placeholder={t("Meaning")}
            value={wordTranslation}
            onChange={(e) => setWordTranslation(e.target.value)}
          />
        </label>

{sentencesList.length > 0 && (
  <div style={{ marginTop: "10px", width: "100%" }}>
    <h4 style={{ marginBottom: "8px" }}>{t("Example Sentences")}</h4>
    {sentencesList.slice(0, 3).map((sentence, index) => (
        <textarea
          name={`sentence_${index + 1}`}
          value={sentence}
          onChange={(e) => {
            const updated = [...sentencesList];
            updated[index] = e.target.value;
            setSentencesList(updated);
          }}
          className="example-card"
          placeholder={t("Edit this sentence")}
        />
    ))}

    <input
      type="hidden"
      name="sentences"
      value={JSON.stringify(sentencesList)}
    />
  </div>
)}

        <button type="button" className="btn-ai-autocompletion" onClick={() => includeSentences(formRef, setSentencesList, setWordTranslation, languageToLearn, userNativeLanguage)}>{t("✨ Complete with AI 🤖")}</button>
        
        <div className="buttonRow">
          <button type="button" className="btn-ghost" onClick={handleClearForm}>
            {t("Clean")}
          </button>
          <button type="submit" className="btn-primary">
            {t("Add")}
          </button>
        </div>
      </form>
    );
};