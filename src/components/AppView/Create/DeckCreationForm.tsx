import type { SetStateAction } from "react";
import type React from "react";
import { cefrLevelsList, jlptLevelsList, hskLevelsList, topikLevelsList } from "../../../datasets/AppView";
import { handleObjectCreation, clearFormFields } from "../../../functions/handleObjectCreation";
import { fetchUserDecks } from "../../../functions/fetchDecks";
import { useDecksLists } from "../../../hooks/useDecksLists";
import { useLanguages } from "../../../hooks/useLanguages";
import { createNotification } from "../../../functions/createNotification";
import { fetchNotificationsList } from "../../../functions/fetchNotificationsList";
import { useSocialData } from "../../../hooks/useSocialData";
import { useDeckCreationFormStyles } from "../../../styles/AppView/deckCreationForm";

interface DeckCreationFormProps {
  showCreateForm: boolean;
  setShowCreateForm: React.Dispatch<SetStateAction<boolean>>;
}

export const DeckCreationForm = ({showCreateForm, setShowCreateForm}: DeckCreationFormProps) => {
  const styles = useDeckCreationFormStyles();
  const { languageToLearn } = useLanguages();
  const levelList = languageToLearn === "JP"
                  ? jlptLevelsList
                  : languageToLearn === "ZH"
                  ? hskLevelsList
                  : languageToLearn === "KO"
                  ? topikLevelsList
                  : cefrLevelsList;
  const {setUserDecksList, setOwnedDecksList} = useDecksLists();
  const { setNotificationsCount, setNotificationsList, setNewNotificationsCount } = useSocialData();

  const handleDeckCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    handleObjectCreation(event, "http://localhost:8600/api/decks/deck", {}, { "Content-Type": "multipart/form-data" }, "deck");
    clearFormFields(form, languageToLearn); 
    await createNotification("Deck created!", `You have created this deck (${data.get("title")}, for ${languageToLearn} language.)`, "CREATED_DECK"); 
    await fetchNotificationsList(setNotificationsCount, setNotificationsList, setNewNotificationsCount); 
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
            <h3 style={styles.heading}>📚 Create New Deck</h3>

            <input type="hidden" name="language" value={languageToLearn} />

            <label style={styles.label}>
              🏷️ Title:
              <input
                type="text"
                name="title"
                style={styles.input}
                required
                placeholder="Ex: Words for Beginners"
              />
            </label>

            <label style={styles.label}>
              📝 Description:
              <textarea
                name="description"
                style={styles.textarea}
                required
                placeholder="Describe this deck..."
              />
            </label>

            <label style={styles.label}>
              🎯 {languageToLearn === "JP"
                ? "JLPT Level"
                : languageToLearn === "ZH"
                ? "HSK Level"
                : languageToLearn === "KO"
                ? "TOPIK Level"
                : "CEFR Level"}
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
              🌍 Shareable Deck:
              <input type="checkbox" name="isShareable" />
            </label>

            <label style={styles.label}>
              🖼️ Background Image:
              <input type="file" name="image" style={styles.input} />
            </label>

            <div style={styles.formButtons}>
              <button
                type="button"
                style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }}
                onClick={() => setShowCreateForm(false)}
              >
                Cancel
              </button>
              <button type="submit" style={{ ...styles.button, backgroundColor: "royalblue", color: "white" }}>
                Create
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
