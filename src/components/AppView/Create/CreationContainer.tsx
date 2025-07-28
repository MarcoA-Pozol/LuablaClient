import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";
import { useState } from "react";

interface CreationContainerProps {
    languageToLearn: string;
}

export const CreationContainer = ({languageToLearn}:CreationContainerProps) => {
    const [selectedDeck, setSelectedDeck] = useState<any>(null);
    

    return (
        <div style={{paddingTop: "10px", display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", gap: "50px",}}>
            <FlashcardCreationForm languageToStudy={languageToLearn} selectedDeck={selectedDeck}/>
            <DeckSelectionForm languageToStudy={languageToLearn}  selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}/>
        </div>
    );
}