import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthView/pickLanguageForm.css";

const languages = [
    { name: "English", image: "/flags/english.png" },
    { name: "Spanish", image: "/flags/spanish.png" },
    { name: "French", image: "/flags/french.png" },
    { name: "Italian", image: "/flags/italian.png" },
    { name: "German", image: "/flags/french.png" },
    { name: "Chinese", image: "/flags/french.png" },
    { name: "Japanese", image: "/flags/french.png" },
    { name: "Korean", image: "/flags/french.png" },
    { name: "Portuguese", image: "/flags/french.png" },
    { name: "Russian", image: "/flags/french.png" },
];

export const PickLanguageForm = () => {
    const [pickedLanguage, setPickedLanguage] = useState<string | null>(null);
    const navigate = useNavigate();
    
    const handleSetPickedLanguage = async (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!pickedLanguage) return;

        try {
            const response = await axios.put("http://localhost:8600/api/app/setLanguagePicked", {
                'pickedLanguage':pickedLanguage
            }, {
                withCredentials:true
            });

            if (response.status !== 200) {
                alert(`Failed during picking alanguage: ${response.data.error}`)
                return;
            }
            // Update this logic in case of success
            console.log(`Language was selected: ${pickedLanguage}`);
            navigate('/');
            

        } catch (error) {
            alert(`Picking a language failed: ${error}`);
            return;
        }
    }

    return (
        <>
            <form onSubmit={handleSetPickedLanguage}>
                <div className="language-list">
                    {languages.map(lang => (
                    <div
                        key={lang.name}
                        className={`language-option${pickedLanguage === lang.name ? " selected" : ""}`}
                        onClick={() => setPickedLanguage(lang.name)}
                        style={{ cursor: "pointer", display: "flex", alignItems: "center", margin: "8px 0" }}
                    >
                        <img src={lang.image} alt={lang.name} style={{ width: 32, height: 32, marginRight: 8 }} />
                        <span>{lang.name}</span>
                    </div>
                    ))}
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}