import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";
import { useState } from "react";

interface CreationContainerProps {
    languageToStudy: string;
    userDecksList:any[];
    refreshDecks:()=>void;
}

export const CreationContainer = ({languageToStudy, userDecksList, refreshDecks}:CreationContainerProps) => {
    const [selectedDeck, setSelectedDeck] = useState<any>(null);
    

    return (
        <div style={{paddingTop: "10px", display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", gap: "50px",}}>
            <FlashcardCreationForm languageToStudy={languageToStudy} refreshDecks={refreshDecks} selectedDeck={selectedDeck}/>
            <DeckSelectionForm languageToStudy={languageToStudy} userDecksList={userDecksList} refreshDecks={refreshDecks} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}/>
        </div>
    );
}