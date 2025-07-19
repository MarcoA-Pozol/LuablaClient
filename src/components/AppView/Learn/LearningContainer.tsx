import type { SetStateAction } from "react";
import { DecksToStudyContainer } from "./GetUserDecks";

interface LearningContainerProps {
    authUser: string;
    userDecksList:any[];
    ownedDecksList:any[];
    languageToStudy: string;
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeFlashcardsList: React.Dispatch<SetStateAction<object[]|any[]>>;
}

export const LearningContainer= ({authUser, userDecksList, ownedDecksList, languageToStudy, setDisplayedContainer, setDeckToPracticeFlashcardsList}:LearningContainerProps) => {

    return (
        <>
            <DecksToStudyContainer authUser={authUser} userDecksList={userDecksList} ownedDecksList={ownedDecksList} languageToStudy={languageToStudy} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeFlashcardsList={setDeckToPracticeFlashcardsList}/>
        </>
    );
}