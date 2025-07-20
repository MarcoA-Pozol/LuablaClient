import { useEffect, useState } from "react";
import { fetchDeckFlashcards } from "../../../functions/fetchDeckFlashcards";

interface DeckFlashcardsPracticeContainerProps {
    deckId:number;
    language:string;
}

export const DeckFlashcardsPracticeContainer = ({deckId, language}:DeckFlashcardsPracticeContainerProps) => {
    const [flashcardsList, setFlashcardsList] = useState<object[]>([]);

    useEffect(() => {
        setFlashcardsList(fetchDeckFlashcards(deckId, language));
        // You might want to do something with flashcards here
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