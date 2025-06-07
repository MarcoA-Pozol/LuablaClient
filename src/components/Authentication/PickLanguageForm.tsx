import axios from "axios";
import { useState } from "react";
import "../../styles/AuthView/pickLanguageForm.css";
import { useTranslation } from "react-i18next";
// Images
import EnglishFlagIMG from "../../assets/AuthView/english_flag.png";
import FrenchFlagIMG from "../../assets/AuthView/french_flag.png";
import JapaneseFlagIMG from "../../assets/AuthView/japanese_flag.png";
import ChineseFlagIMG from "../../assets/AuthView/chinese_flag.png";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";

const languages = [
  {
    languageVal: "EN",
    name: "EN",
    image: EnglishFlagIMG,
    description: "The global language of business, science, and the internet — spoken by over 1.5 billion people worldwide.",
  },
  {
    languageVal: "FR",
    name: "FR",
    image: FrenchFlagIMG,
    description: "The language of love, diplomacy, and culture — spoken on five continents and official in 29 countries.",
  },
//   {
//     languageVal: "IT",
//     name: "IT",
//     image: ItalianFlagIMG,
//     description: "Dive into the world of art, fashion, and culinary excellence — Italian brings the beauty of history to life.",
//   },
  {
    languageVal: "JP",
    name: "JP",
    image: JapaneseFlagIMG,
    description: "Master the language of anime, innovation, and tradition — spoken by over 125 million and key to unlocking Japan’s unique culture.",
  },
//   {
//     languageVal: "DE",
//     name: "DE",
//     image: JapaneseFlagIMG,
//     description: "Germany is Europe’s economic powerhouse — learn German to access opportunities in science, engineering, and global business.",
//   },
  {
    languageVal: "ZH",
    name: "ZH",
    image: ChineseFlagIMG,
    description: "Mandarin Chinese is the most spoken native language in the world — essential for connecting with over a billion people.",
  },
//   {
//     languageVal: "ES",
//     name: "ES",
//     image: JapaneseFlagIMG,
//     description: "With over 500 million speakers, Spanish opens doors to vibrant cultures across Latin America, Spain, and the U.S.",
//   },
//   {
//     languageVal: "KO",
//     name: "KO",
//     image: JapaneseFlagIMG,
//     description: "Join the Korean wave! Learn Korean to explore K-pop, K-dramas, and a high-tech society with deep traditions.",
//   },
//   {
//     languageVal: "PT",
//     name: "PT",
//     image: JapaneseFlagIMG,
//     description: "From Brazil to Portugal, Portuguese connects you to diverse cultures, music, and booming global markets.",
//   },
//   {
//     languageVal: "RU",
//     name: "RU",
//     image: JapaneseFlagIMG,
//     description: "Spoken across Russia and Eastern Europe, Russian is a gateway to rich literature, science, and global affairs.",
//   },
];


export const PickLanguageForm = () => {
    const [pickedLanguage, setPickedLanguage] = useState<string | null>(null);
    const [languageDescription, setLanguageDescription] = useState<string>("These are the most popular ones, but you can choose from many more options");
    const { t } = useTranslation();

    // Derive disabled state from pickedLanguage
    const isButtonDisabled = !pickedLanguage;

    const handleSetPickedLanguage = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!pickedLanguage) return; 

        try {
            const response = await axios.put(useBaseApiUrl("/app/setLanguagePicked"), {
                'pickedLanguage': pickedLanguage
            }, {
                withCredentials: true
            });

            if (response.status !== 200) {
                alert(`Failed during selecting a language: ${response.data.error}`);
                return;
            }
            
            localStorage.setItem("languageToLearn", pickedLanguage || "EN");
            window.location.reload();
        } catch (error) {
            alert(`Selecting a language failed: ${error}`);
        }
    }

    return (
        <div className="languages-selection-container">
            <h2>{t("Choose a Language")}</h2>
            <p>{languageDescription}</p>

            <form id="language-form" onSubmit={handleSetPickedLanguage}>
                <div className="language-options">
                    {languages.map(lang => (
                        <div
                            key={lang.name}
                            className={`language-card ${pickedLanguage === lang.name ? 'active' : ''}`}
                            onClick={() => {
                                setPickedLanguage(lang.languageVal);
                                setLanguageDescription(lang.description);
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
                    {t("Continue")}
                </button>
            </form>
        </div>
    );
}