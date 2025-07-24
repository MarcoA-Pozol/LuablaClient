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
            const data = await fetchDeckFlashcards(deckId, languageToLearn);
            setFlashcardsList(data);
        };
        fetchData();
    }, []);

    return (
        <div>
            Here is where you can practice your words from your deck:
            <ul>
                {flashcardsList.map((item, idx) => (
                    <li key={idx}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
}