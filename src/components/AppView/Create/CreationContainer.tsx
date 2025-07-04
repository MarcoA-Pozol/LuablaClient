import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";

interface CreationContainerProps {
    languageToStudy: string;
    userDecksList:any[];
}

export const CreationContainer = ({languageToStudy, userDecksList}:CreationContainerProps) => {

    return (
        <div style={{paddingTop: "10px", display: "flex", justifyContent: "center", flexWrap: "wrap", width: "100%", gap: "50px",}}>
            <FlashcardCreationForm languageToStudy={languageToStudy}/>
            <DeckSelectionForm languageToStudy={languageToStudy} userDecksList={userDecksList}/>
        </div>
    );
}