import { useState } from "react";


export const FlashcardCreationForm = () => {
    const [language] = useState<string>("english");
    const [formData, setFormData] = useState({
        word: "",
        meaning: "",
        examplePhrase: "",
        hanzi: "",
        pinyin: "",
        kanji: "",
        kana: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleReset = () => {
        setFormData({
        word: "",
        meaning: "",
        examplePhrase: "",
        hanzi: "",
        pinyin: "",
        kanji: "",
        kana: "",
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Flashcard Data:", formData);
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Create a Flashcard</h2>

      <label style={styles.label}>
        Word:
        <input
          name="word"
          value={formData.word}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Meaning:
        <input
          name="meaning"
          value={formData.meaning}
          onChange={handleChange}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Example Phrase:
        <textarea
          name="examplePhrase"
          value={formData.examplePhrase}
          onChange={handleChange}
          style={styles.textarea}
        />
      </label>

      {/* Conditional fields */}
      {language === "chinese" && (
        <>
          <label style={styles.label}>
            Hanzi:
            <input
              name="hanzi"
              value={formData.hanzi}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Pinyin:
            <input
              name="pinyin"
              value={formData.pinyin}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </>
      )}

      {language === "japanese" && (
        <>
          <label style={styles.label}>
            Kanji:
            <input
              name="kanji"
              value={formData.kanji}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
          <label style={styles.label}>
            Kana:
            <input
              name="kana"
              value={formData.kana}
              onChange={handleChange}
              style={styles.input}
            />
          </label>
        </>
      )}

      <div style={styles.buttonContainer}>
        <button type="button" style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }} onClick={handleReset}>
          Clean
        </button>
        <button type="submit" style={styles.button}>
          Add
        </button>
      </div>
    </form>
    );
};

// -------------------
// Styles
// -------------------
const styles: { [key: string]: React.CSSProperties } = {
  form: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    maxWidth: "500px",
    margin: "30px auto",
    border: "1px solid royalblue",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  heading: {
    color: "royalblue",
    fontSize: "22px",
    textAlign: "center",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    color: "#333",
    marginBottom: "12px",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "4px",
  },
  textarea: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "4px",
    resize: "vertical",
    minHeight: "60px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  button: {
    padding: "10px 18px",
    backgroundColor: "royalblue",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    flex: 1,
    marginLeft: "10px",
  },
};
