import type { SetStateAction } from "react";
import { LearningDecksContainer } from "./LearningDecksContainer.tsx";

interface LearningContainerProps {
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID: React.Dispatch<SetStateAction<number>>;
}

export const LearningContainer= ({ setDisplayedContainer, setDeckToPracticeID}:LearningContainerProps) => {

    return (
        <>
            <LearningDecksContainer setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>
        </>
    );
}