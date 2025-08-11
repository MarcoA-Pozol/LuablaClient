import { useState, useEffect } from "react";
import { Flashcard } from "../../../schemas/Flashcard";
import axios from "axios";

export const RandomWordsPractice = () => {
    const [flashcardsList, setFlashcardsList] = useState<Flashcard[]|[]>([]);   



    useEffect(asyn() => {
        co
    }, []) // On component mount 

    return (
      <div>
        {flashcardsList.map(flashcard => (
            <h2>{flashcard.word}</h2>
            <h3>{flashcard.example_phrase}</h3>
        ))}
      </div>
    );
}