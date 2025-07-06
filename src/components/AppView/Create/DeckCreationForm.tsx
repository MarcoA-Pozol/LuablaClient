import type { SetStateAction } from "react";
import type React from "react";
import { cefrLevelsList, jlptLevelsList, hskLevelsList, topikLevelsList } from "../../../datasets/AppView";
import axios from "axios";

interface DeckCreationFormProps {
    languageToStudy: string;
    screenWidth: number,
    responsiveValue: any,
    showCreateForm: boolean;
    setShowCreateForm: React.Dispatch<SetStateAction<boolean>>;
}
export const DeckCreationForm = ({languageToStudy, screenWidth, responsiveValue, showCreateForm, setShowCreateForm}:DeckCreationFormProps) => {
    const levelList =
    languageToStudy === "JP"
        ? jlptLevelsList
        : languageToStudy === "ZH"
        ? hskLevelsList: 
        languageToStudy === "KO"
        ? topikLevelsList
        : cefrLevelsList;

    const handleDeckCreation = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        try {
        const response = await axios.post("http://localhost:8600/api/app/deck", formData, {withCredentials:true, headers:{"Content-Type": "multipart/form-data"}});
        const responseData = response.data;

        if (response.status !== 201) {
            alert(`Error while trying to create a deck: ${responseData.error}`);
        } 

        alert("Deck created!");
        } catch (error) {
        alert(`Creating deck failed: ${error}`);
        }

        setShowCreateForm(false);
    };

    // Styles
    const styles: { [key: string]: React.CSSProperties } = {
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
    }
    

    return (
        <>
            {showCreateForm && (
            <div style={styles.overlay}>
                <form onSubmit={(event) => handleDeckCreation(event)} style={styles.floatingForm} method="POST" encType="multipart/form-data">
                    <h3 style={styles.heading}>Create New Deck</h3>

                    <input type="hidden" name="language" value={languageToStudy}/>

                    <label style={styles.label}>
                    Title:
                    <input type="text" name="title" style={styles.input} required={true} placeholder="Example: ''Words for Beginners''"/>
                    </label>

                    <label style={styles.label}>
                    Description:
                    <textarea name="description" style={styles.textarea} required={true} placeholder="Example: ''These words are ideal if you are starting with learning this language from scratch.''"/>
                    </label>

                    <label style={styles.label}>
                    {languageToStudy === "JP" ? ("JLPT Level") : languageToStudy === "ZH" ? ("HSK Level") : languageToStudy === "KO" ? ("TOPIK Level") : ("CEFR Level")}
                    <select name={languageToStudy === "JP" ? ("jlptLevel") : languageToStudy === "ZH" ? ("hskLevel") : languageToStudy === "KO" ? ("topikLevel") : ("cefrLevel")} required={true}>
                        <option disabled={true}>Select</option>
                        { levelList.map((level, index) => (
                        <option key={index} value={level}>
                            { level }
                        </option>
                        ))}
                    </select>
                    </label>

                    <label style={styles.label}>
                    Shareable Deck:
                    <input type="checkbox" name="isShareable" required={false}/>
                    </label>

                    <label style={styles.label}>
                    Background Image:
                    <input type="file" name="image" style={styles.input} required={false}/>
                    </label>

                    <div style={styles.formButtons}>
                    <button style={{ ...styles.button, backgroundColor: "#ccc", color: "#333" }} onClick={() => setShowCreateForm(false)}>Cancel</button>
                    <button type="submit" style={styles.button}>Create</button>
                    </div>
                </form>
            </div>
        )}
        </>
    );
}