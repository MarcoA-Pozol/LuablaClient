import { useState, useEffect } from "react";
import { type Flashcard } from "../../schemas/Flashcard";
import axios from "axios";
import { useLanguages } from "../../hooks/useLanguages";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";

export const RandomFlashcardsPractice = () => {
    const [flashcardsList, setFlashcardsList] = useState<Flashcard[]|[]>([]);   
    const {languageToLearn} = useLanguages();

    useEffect(() => {
      const fetchRandomFlashcardsList = async(language:string) => {
        const response = await axios.get(useBaseApiUrl("/flashcards/randomList"), {data:{language:language, quantity:5}, withCredentials:true});
        const data = response.data;
        console.log(data);
        setFlashcardsList(data.flashcards)
      }
      fetchRandomFlashcardsList(languageToLearn);
    }, []);

    return (
      <div>
        {flashcardsList.map(flashcard => (
          <div>
            <h2>{languageToLearn === "ZH" ? flashcard.hanzi : languageToLearn === "JP" ? flashcard.kana : languageToLearn === "KO" ? flashcard.hangul : languageToLearn === "RU" ? flashcard.cyrillic : flashcard.word}</h2>
            <h3>{flashcard.meaning}</h3>
          </div>
        ))}
      </div>
    );
}