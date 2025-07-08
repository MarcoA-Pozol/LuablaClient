import type { SetStateAction } from "react";
import type React from "react";
import { cefrLevelsList, jlptLevelsList, hskLevelsList, topikLevelsList } from "../../../datasets/AppView";
import axios from "axios";

interface DeckCreationFormProps {
  languageToStudy: string;
  screenWidth: number;
  responsiveValue: <T>(small: T, large: T, width: number) => T;
  showCreateForm: boolean;
  setShowCreateForm: React.Dispatch<SetStateAction<boolean>>;
}

export const DeckCreationForm = ({
  languageToStudy,
  screenWidth,
  responsiveValue,
  showCreateForm,
  setShowCreateForm,
}: DeckCreationFormProps) => {
  const levelList =
    languageToStudy === "JP"
      ? jlptLevelsList
      : languageToStudy === "ZH"
      ? hskLevelsList
      : languageToStudy === "KO"
      ? topikLevelsList
      : cefrLevelsList;

  const handleDeckCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const response = await axios.post("http://localhost:8600/api/decks/deck", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const responseData = response.data;

      if (response.status !== 201) {
        alert(`Error while trying to create a deck: ${responseData.error}`);
      }

      alert("Deck created!");
    } catch (error) {
      alert(`Creating deck failed: ${error}`);
    }
  };

  // Styles
  const styles: { [key: string]: React.CSSProperties } = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    floatingForm: {
      backgroundColor: "white",
      padding: responsiveValue("16px", "16px", screenWidth),
      borderRadius: "10px",
      height: "75vh",
      width: responsiveValue("90%", "40%", screenWidth),
      boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    },
    heading: {
      textAlign: "center",
      fontSize: responsiveValue("20px", "22px", screenWidth),
      color: "royalblue",
      marginTop: "5px",
      marginBottom: "10px",
    },
    label: {
      display: "block",
      marginBottom: "12px",
      color: "#333",
      fontWeight: "bold",
    },
    input: {
      width: "95%",
      padding: "8px",
      marginTop: "4px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    textarea: {
      width: "95%",
      padding: "8px",
      marginTop: "4px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      resize: "vertical",
      minHeight: "60px",
    },
    select: {
      width: "99%",
      padding: "8px",
      marginTop: "4px",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    formButtons: {
      display: "flex",
      justifyContent: "space-between",
      marginTop: "20px",
    },
    button: {
      padding: "10px 16px",
      borderRadius: "6px",
      border: "none",
      fontWeight: "bold",
      cursor: "pointer",
    },
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

            <input type="hidden" name="language" value={languageToStudy} />

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
              🎯 {languageToStudy === "JP"
                ? "JLPT Level"
                : languageToStudy === "ZH"
                ? "HSK Level"
                : languageToStudy === "KO"
                ? "TOPIK Level"
                : "CEFR Level"}
              <select
                name={
                  languageToStudy === "JP"
                    ? "jlptLevel"
                    : languageToStudy === "ZH"
                    ? "hskLevel"
                    : languageToStudy === "KO"
                    ? "topikLevel"
                    : "cefrLevel"
                }
                style={styles.select}
                required
              >
                <option disabled selected>
                  Select
                </option>
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
