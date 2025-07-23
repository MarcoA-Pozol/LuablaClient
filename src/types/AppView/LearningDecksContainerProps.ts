import type { SetStateAction } from "react";

export interface LearningDecksContainerProps {
    authUser:any;
    userDecksList:any[];
    ownedDecksList:any[];
    languageToStudy:string;
    setDisplayedContainer:React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID:React.Dispatch<SetStateAction<number>>;
}