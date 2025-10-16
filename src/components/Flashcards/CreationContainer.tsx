import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";
import { useState } from "react";

export const CreationContainer = () => {
    const [selectedDeck, setSelectedDeck] = useState<any>(null);
    
    return (
        <div style={{paddingTop: "10px", display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", gap: "50px",}}>
            <FlashcardCreationForm selectedDeck={selectedDeck}/>
            <DeckSelectionForm selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck}/>
        </div>
    );
}