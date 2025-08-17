import { useState, useEffect } from "react";
import { type Flashcard } from "../../../schemas/Flashcard";
import axios from "axios";
import { useLanguages } from "../../../hooks/useLanguages";

export const RandomFlashcardsPractice = () => {
    const [flashcardsList, setFlashcardsList] = useState<Flashcard[]|[]>([]);   
    const {languageToLearn} = useLanguages();

    useEffect(() => {
      const fetchRandomFlashcardsList = async(language:string) => {
        const response = await axios.get("http://localhost:8600/api/flashcards/randomList", {data:{language:language, quantity:5}, withCredentials:true});
        const data = response.data;
        setFlashcardsList(data.flashcards)
      }
      fetchRandomFlashcardsList(languageToLearn);
    }, []);

    return (
      <div>
        {flashcardsList.map(flashcard => (
          <div>
            <h2>{flashcard.word}</h2>
            <h3>{flashcard.meaning}</h3>
          </div>
        ))}
      </div>
    );
}