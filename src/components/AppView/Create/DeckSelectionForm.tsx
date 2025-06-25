import React, { useState } from "react";
import ChineseFlag from "../../../assets/AppView/chinese_flag.png";
import EnglishFlag from "../../../assets/AppView/english_flag.png";
import FrenchFlag from "../../../assets/AppView/french_flag.png";

type Deck = {
  id: number;
  name: string;
  image: string;
};

const mockDecks: Deck[] = [
  { id: 1, name: "Spanish Basics", image: ChineseFlag },
  { id: 2, name: "French Verbs", image: EnglishFlag },
  { id: 3, name: "German Phrases", image: FrenchFlag },
];

export const DeckSelectionForm = () => {
  const decks = mockDecks;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [language, setLanguage] = useState("english"); // Change as needed

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    cefrLevel: "",
    hskLevel: "",
    isShareable: false,
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === "checkbox" ? true : value }));
  };

  const handleCreate = () => {
    console.log("Creating Deck:", formData);
    setShowCreateForm(false);
    setFormData({
      title: "",
      description: "",
      cefrLevel: "",
      hskLevel: "",
      isShareable: false,
      image: "",
    });
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
                <img src={deck.image} alt={deck.name} style={styles.deckImage} />
                <span style={styles.deckName}>{deck.name}</span>
              </div>
            ))}
          </div>

          <div style={styles.createMore}>
            <p style={styles.text}>Want to organize more cards?</p>
            <button style={styles.button} onClick={() => setShowCreateForm(true)}>+ Create Another Deck</button>
          </div>
        </>
      )}

      {/* Floating Create Deck Form */}
      {showCreateForm && (
        <div style={styles.overlay}>
          <div style={styles.floatingForm}>
            <h3 style={styles.heading}>Create New Deck</h3>

            <label style={styles.label}>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleChange} style={styles.input} />
            </label>

            <label style={styles.label}>
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} style={styles.textarea} />
            </label>

            {language === "chinese" || language === "japanese" ? (
              <label style={styles.label}>
                HSK Level:
                <input type="text" name="hskLevel" value={formData.hskLevel} onChange={handleChange} style={styles.input} />
              </label>
            ) : (
              <label style={styles.label}>
                CEFR Level:
                <input type="text" name="cefrLevel" value={formData.cefrLevel} onChange={handleChange} style={styles.input} />
              </label>
            )}

            <label style={styles.label}>
              Shareable:
              <input type="checkbox" name="isShareable" checked={formData.isShareable} onChange={handleChange} />
            </label>

            <label style={styles.label}>
              Image URL:
              <input type="text" name="image" value={formData.image} onChange={handleChange} style={styles.input} />
            </label>

            <div style={styles.formButtons}>
              <button style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }} onClick={() => setShowCreateForm(false)}>Cancel</button>
              <button style={styles.button} onClick={handleCreate}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------
// Styles
// -------------------
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "20px",
    backgroundColor: "white",
    border: "1px solid royalblue",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "30px auto",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "royalblue",
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: "center",
  },
  noDecksContainer: {
    textAlign: "center",
  },
  decksList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  deckItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px",
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
