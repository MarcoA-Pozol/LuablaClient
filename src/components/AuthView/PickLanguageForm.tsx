import axios from "axios";
import { useState } from "react";
import "../../styles/AuthView/pickLanguageForm.css";
// Images
import EnglishFlagIMG from "../../assets/AuthView/english_flag.png";
import FrenchFlagIMG from "../../assets/AuthView/french_flag.png";
import ItalianFlagIMG from "../../assets/AuthView/italian_flag.png";
import JapaneseFlagIMG from "../../assets/AuthView/japanese_flag.png";


const languages = [
    { name: "English", image: EnglishFlagIMG },
    { name: "French", image: FrenchFlagIMG },
    { name: "Italian", image: ItalianFlagIMG },
    { name: "Japanese", image: JapaneseFlagIMG },
    // { name: "German", image: SignInFormIMG },
    // { name: "Chinese", image: SignInFormIMG },
    // { name: "Spanish", image: SignInFormIMG },
    // { name: "Korean", image: SignInFormIMG },
    // { name: "Portuguese", image: SignInFormIMG },
    // { name: "Russian", image: SignInFormIMG },
];

export const PickLanguageForm = () => {
    const [pickedLanguage, setPickedLanguage] = useState<string | null>(null);
    
    // Derive disabled state from pickedLanguage
    const isButtonDisabled = !pickedLanguage;

    const handleSetPickedLanguage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!pickedLanguage) return;

        try {
            const response = await axios.put("http://localhost:8600/api/app/setLanguagePicked", {
                'pickedLanguage': pickedLanguage
            }, {
                withCredentials: true
            });

            if (response.status !== 200) {
                alert(`Failed during selecting a language: ${response.data.error}`);
                return;
            }
            
            window.location.reload();
        } catch (error) {
            alert(`Selecting a language failed: ${error}`);
        }
    }

    return (
        <div className="languages-selection-container">
            <h2>Choose a Language</h2>
            <p>These are the most popular ones, but you can choose others later</p>

            <form id="language-form" onSubmit={handleSetPickedLanguage}>
                <div className="language-options">
                    {languages.map(lang => (
                        <div
                            key={lang.name}
                            className={`language-card ${pickedLanguage === lang.name ? 'active' : ''}`}
                            onClick={() => {
                                setPickedLanguage(lang.name);
                            }} 
                        >
                            <img src={lang.image} alt={lang.name}/>
                            <h3>{lang.name}</h3>
                        </div>
                    ))}
                </div>
                
                <button 
                    className="submit-button" 
                    type="submit" 
                    disabled={isButtonDisabled}
                >
                    Continue
                </button>
            </form>
        </div>
    );
}