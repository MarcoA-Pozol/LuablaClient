import type { SetStateAction } from "react";
import { LearningDecksContainer } from "./LearningDecksContainer.tsx";

interface LearningContainerProps {
    authUser: string;
    userDecksList:any[];
    ownedDecksList:any[];
    languageToStudy: string;
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID: React.Dispatch<SetStateAction<number>>;
}

export const LearningContainer= ({authUser, userDecksList, ownedDecksList, languageToStudy, setDisplayedContainer, setDeckToPracticeID}:LearningContainerProps) => {

    return (
        <>
            <LearningDecksContainer authUser={authUser} userDecksList={userDecksList} ownedDecksList={ownedDecksList} languageToStudy={languageToStudy} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>
        </>
    );
}