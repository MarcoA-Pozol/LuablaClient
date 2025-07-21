import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";
import { useState } from "react";
import type { Deck } from "../../../schemas/Deck";
import React, { type SetStateAction } from "react";

interface CreationContainerProps {
    languageToStudy: string;
    userDecksList:any[];
    setOwnedDecksList:React.Dispatch<SetStateAction<Deck[]>>;
    setUserDecksList:React.Dispatch<SetStateAction<Deck[]>>;
}

export const CreationContainer = ({languageToStudy, userDecksList, setOwnedDecksList, setUserDecksList}:CreationContainerProps) => {
    const [selectedDeck, setSelectedDeck] = useState<any>(null);
    

    return (
        <div style={{paddingTop: "10px", display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", gap: "50px",}}>
            <FlashcardCreationForm languageToStudy={languageToStudy} selectedDeck={selectedDeck} setOwnedDecksList={setOwnedDecksList} setUserDecksList={setUserDecksList}/>
            <DeckSelectionForm languageToStudy={languageToStudy} userDecksList={userDecksList} selectedDeck={selectedDeck} setSelectedDeck={setSelectedDeck} setOwnedDecksList={setOwnedDecksList} setUserDecksList={setUserDecksList}/>
        </div>
    );
}