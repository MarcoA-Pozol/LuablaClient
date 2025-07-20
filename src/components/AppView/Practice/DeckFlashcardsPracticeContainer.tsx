import { useEffect, useState } from "react";
import { fetchDeckFlashcards } from "../../../functions/fetchDeckFlashcards";

interface DeckFlashcardsPracticeContainerProps {
    deckId:number;
    language:string;
}

export const DeckFlashcardsPracticeContainer = ({deckId, language}:DeckFlashcardsPracticeContainerProps) => {
    const [flashcardsList, setFlashcardsList] = useState<object[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchDeckFlashcards(deckId, language);
            setFlashcardsList(data);
        };
        fetchData();
    }, [deckId]);

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