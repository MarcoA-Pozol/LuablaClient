import { DeckSelectionForm } from "./DeckSelectionForm";
import { FlashcardCreationForm } from "./FlashcardCreationForm";

export const CreationContainer = () => {

    return (
        <div style={{display:"inline-flex"}}>
            <FlashcardCreationForm/>
            <DeckSelectionForm/>
        </div>
    );
}