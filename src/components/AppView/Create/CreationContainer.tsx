import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";

interface CreationContainerProps {
    languageToStudy: string;
    userDecksList:any[];
    refreshDecks:()=>void;
}

export const CreationContainer = ({languageToStudy, userDecksList, refreshDecks}:CreationContainerProps) => {

    return (
        <div style={{paddingTop: "10px", display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", gap: "50px",}}>
            <FlashcardCreationForm languageToStudy={languageToStudy} refreshDecks={refreshDecks}/>
            <DeckSelectionForm languageToStudy={languageToStudy} userDecksList={userDecksList} refreshDecks={refreshDecks}/>
        </div>
    );
}