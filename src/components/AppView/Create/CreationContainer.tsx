import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";

interface CreationContainerProps {
    languageToStudy: string;
}

export const CreationContainer = ({languageToStudy}:CreationContainerProps) => {

    return (
        <div style={{display:"inline-flex"}}>
            <FlashcardCreationForm languageToStudy={languageToStudy}/>
            <DeckSelectionForm languageToStudy={languageToStudy}/>
        </div>
    );
}