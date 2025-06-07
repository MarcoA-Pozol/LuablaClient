import type React from "react";
import type { SetStateAction } from "react";

export interface LearningDeckProps {
    index:string|number;
    deckId:number;
    title:string;
    description:string;
    image:string;
    author:string;
    level:string;
    cardsQuantity:string;
    setDisplayedContainer: React.Dispatch<SetStateAction<string>>;
    setDeckToPracticeID: React.Dispatch<SetStateAction<number>>;
}