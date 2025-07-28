import type { SetStateAction } from "react";
import { LearningDecksContainer } from "./LearningDecksContainer.tsx";

interface LearningContainerProps {
    authUser: string;
    languageToLearn: string;
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID: React.Dispatch<SetStateAction<number>>;
}

export const LearningContainer= ({authUser, languageToLearn, setDisplayedContainer, setDeckToPracticeID}:LearningContainerProps) => {

    return (
        <>
            <LearningDecksContainer authUser={authUser} languageToStudy={languageToLearn} setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>
        </>
    );
}