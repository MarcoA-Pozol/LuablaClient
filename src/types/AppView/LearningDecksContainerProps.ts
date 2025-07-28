import type { SetStateAction } from "react";

export interface LearningDecksContainerProps {
    setDisplayedContainer:React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID:React.Dispatch<SetStateAction<number>>;
}