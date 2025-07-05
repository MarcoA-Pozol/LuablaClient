import { useState, useEffect } from "react";

interface FlashcardCreationFormProps {
  languageToStudy: string;
}
export const FlashcardCreationForm = ({languageToStudy}:FlashcardCreationFormProps) => {
    const flashcardTypeName = languageToStudy === "EN" ? "English" : languageToStudy === "ES" ? "Spanish" : languageToStudy === "JP" ? "Japanese" : languageToStudy === "ZH" ? "Chinese" : languageToStudy === "KO" ? "Korean" : languageToStudy === "PT" ? "Portuguese" : languageToStudy === "DE" ? "German" : languageToStudy === "IT" ? "Italian" : languageToStudy === "FR" ? "French" : languageToStudy === "RU" ? "Russian" : "Unknown";


    const [formData, setFormData] = useState({
        word: "",
        meaning: "",
        examplePhrase: "",
        hanzi: "",
        pinyin: "",
        kanji: "",
        kana: "",
        romaji: "",
        hangul: ""
    });
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    
    useEffect(() => {
        const handleResize = () => setScreenWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        romaji: "",
        hangul: ""
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Flashcard Data:", formData);
    };

    // Style
    const styles: { [key: string]: React.CSSProperties } = {
      form: {
        backgroundColor: "white",
        padding: "20px",
        paddingBlock: screenWidth < 768 ? "5px" : "20px",
        borderRadius: "10px",
        maxWidth: "500px",
        border: "1px solid royalblue",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: screenWidth < 768 ? "280px" : "400px",
        display: "flex",
        flexDirection: "column"
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
        display: "flex",
        justifyContent: "space-between",
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


    return (
        <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>{flashcardTypeName} Flashcard</h2>

      {languageToStudy !== "JP" && languageToStudy !== "ZH" && languageToStudy !== "KO" && (
        <label style={styles.label}>
          🏷️
          <input
            name="word"
            value={formData.word}
            onChange={handleChange}
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
              value={formData.hanzi}
              onChange={handleChange}
              style={styles.input}
              placeholder="Hanzi"
            />
          </label>
          <label style={styles.label}>
            📣
            <input
              name="pinyin"
              value={formData.pinyin}
              onChange={handleChange}
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
            value={formData.kana}
            onChange={handleChange}
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
            value={formData.hangul}
            onChange={handleChange}
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
            value={formData.romaji}
            onChange={handleChange}
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
            value={formData.kanji}
            onChange={handleChange}
            style={styles.input}
            placeholder="Kanji (optional)"
          />
        </label>
    )}

      <label style={styles.label}>
        💡
        <input
          name="meaning"
          value={formData.meaning}
          onChange={handleChange}
          style={styles.input}
          placeholder="Meaning"
        />
      </label>

      <label style={styles.label}>
        💬
        <textarea
          name="examplePhrase"
          value={formData.examplePhrase}
          onChange={handleChange}
          style={styles.textarea}
          placeholder="Example phrase"
        />
      </label>

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