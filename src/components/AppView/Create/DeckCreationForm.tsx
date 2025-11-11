import type { SetStateAction } from "react";
import type React from "react";
import { cefrLevelsList, jlptLevelsList, hskLevelsList, topikLevelsList } from "../../../datasets/AppView";
import { handleObjectCreation, clearFormFields } from "../../../functions/handleObjectCreation";
import { fetchUserDecks } from "../../../functions/fetchDecks";
import { useDecksLists } from "../../../hooks/useDecksLists";
import { useLanguages } from "../../../hooks/useLanguages";
import { createNotification } from "../../../functions/createNotification";
import { useDeckCreationFormStyles } from "../../../styles/AppView/deckCreationForm";
import { useSocialData } from "../../../hooks/useSocialData";
import { useTranslation } from "react-i18next";
import { useBaseApiUrl } from "../../../hooks/useBaseApiUrl";

interface DeckCreationFormProps {
  showCreateForm: boolean;
  setShowCreateForm: React.Dispatch<SetStateAction<boolean>>;
}

export const DeckCreationForm = ({showCreateForm, setShowCreateForm}: DeckCreationFormProps) => {
  const styles = useDeckCreationFormStyles();
  const { t } = useTranslation();
  const { languageToLearn } = useLanguages();
  const levelList = languageToLearn === "JP"
                  ? jlptLevelsList
                  : languageToLearn === "ZH"
                  ? hskLevelsList
                  : languageToLearn === "KO"
                  ? topikLevelsList
                  : cefrLevelsList;
  const {setUserDecksList, setOwnedDecksList} = useDecksLists();
  const { fetchNotifications } = useSocialData();

  const handleDeckCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    handleObjectCreation(event, useBaseApiUrl("/api/decks/deck"), {}, { "Content-Type": "multipart/form-data" }, "deck");
    clearFormFields(form, languageToLearn); 
    await createNotification("Deck created!", `You have created this deck (${data.get("title")}, for ${languageToLearn} language.)`, "CREATED_DECK"); 
    await fetchNotifications(); 
    const timeoutId = setTimeout(() => {
      fetchUserDecks(languageToLearn, setOwnedDecksList, setUserDecksList);
    }, 1000); 

    return () => clearTimeout(timeoutId); 
  };

  return (
    <>
      {showCreateForm && (
        <div style={styles.overlay}>
          <form
            onSubmit={handleDeckCreation}
            style={styles.floatingForm}
            method="POST"
            encType="multipart/form-data"
          >
            <h3 style={styles.heading}>📚 {t("Create New Deck")}</h3>

            <input type="hidden" name="language" value={languageToLearn} />

            <label style={styles.label}>
              🏷️ {t("Title")}:
              <input
                type="text"
                name="title"
                style={styles.input}
                required
                placeholder={t("Ex: Words for Beginners")}
              />
            </label>

            <label style={styles.label}>
              📝 {t("Description")}:
              <textarea
                name="description"
                style={styles.textarea}
                required
                placeholder={t("Describe this deck...")}
              />
            </label>

            <label style={styles.label}>
              🎯 {languageToLearn === "JP"
                ? t("JLPT Level")
                : languageToLearn === "ZH"
                ? t("HSK Level")
                : languageToLearn === "KO"
                ? t("TOPIK Level")
                : t("CEFR Level")}
              <select
                name={
                  languageToLearn === "JP"
                    ? "jlptLevel"
                    : languageToLearn === "ZH"
                    ? "hskLevel"
                    : languageToLearn === "KO"
                    ? "topikLevel"
                    : "cefrLevel"
                }
                style={styles.select}
                required
              >
                {levelList.map((level, idx) => (
                  <option key={idx} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>

            <label style={styles.label}>
              🌍 {t("Shareable Deck")}:
              <input type="checkbox" name="isShareable" />
            </label>

            <label style={styles.label}>
              🖼️ {t("Background Image")}:
              <input type="file" name="image" style={styles.input} />
            </label>

            <div style={styles.formButtons}>
              <button
                type="button"
                style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }}
                onClick={() => setShowCreateForm(false)}
              >
                {t("Cancel")}
              </button>
              <button type="submit" style={{ ...styles.button, backgroundColor: "royalblue", color: "white" }}>
                {t("Create")}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
