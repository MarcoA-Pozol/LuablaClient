import { useEffect, useState } from "react";
import { fetchDeckFlashcards } from "../../../functions/fetchDeckFlashcards";
import { useLanguages } from "../../../hooks/useLanguages";

interface DeckPracticeContainerProps {
    deckId:number;
}

export const DeckPracticeContainer = ({deckId}:DeckPracticeContainerProps) => {
    const [flashcardsList, setFlashcardsList] = useState<object[]>([]);
    const { languageToLearn } = useLanguages();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchDeckFlashcards(deckId, languageToLearn);
                setFlashcardsList(data);
            } catch {
                console.log("Impossible to fetch flashcards");
            }
        };
        fetchData();
    }, [languageToLearn, deckId]);

    return (
        <div>
            Here is where you can practice your words from your deck:
            <ul>
                {flashcardsList.map((flashcard, index) => (
                    <li key={index}>{JSON.stringify(flashcard)}</li>
                ))}
            </ul>
        </div>
    );
}