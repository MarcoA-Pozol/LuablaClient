import type { SetStateAction } from "react";
import { LearningDecksContainer } from "./LearningDecksContainer.tsx";

interface LearningContainerProps {
    authUser: string;
    languageToStudy: string;
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID: React.Dispatch<SetStateAction<number>>;
}

export const LearningContainer= ({authUser, languageToStudy, setDisplayedContainer, setDeckToPracticeID}:LearningContainerProps) => {

    return (
        <>
            <LearningDecksContainer authUser={authUser} languageToStudy={languageToStudy} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>
        </>
    );
}