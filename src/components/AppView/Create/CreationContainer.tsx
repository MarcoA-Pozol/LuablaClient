import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";
import { useState } from "react";

interface CreationContainerProps {
    languageToStudy: string;
}

export const CreationContainer = ({languageToStudy}:CreationContainerProps) => {
    const [selectedDeck, setSelectedDeck] = useState<any>(null);
    

    return (
        <div style={{paddingTop: "10px", display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", gap: "50px",}}>
            <FlashcardCreationForm languageToStudy={languageToStudy} selectedDeck={selectedDeck}/>
            <DeckSelectionForm languageToStudy={languageToStudy}  selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}/>
        </div>
    );
}