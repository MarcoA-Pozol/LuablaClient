import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";

interface CreationContainerProps {
    languageToStudy: string;
    userDecksList:any[];
}

export const CreationContainer = ({languageToStudy, userDecksList}:CreationContainerProps) => {

    return (
        <div style={{display:"inline-flex"}}>
            <FlashcardCreationForm languageToStudy={languageToStudy}/>
            <DeckSelectionForm languageToStudy={languageToStudy} userDecksList={userDecksList}/>
        </div>
    );
}