import type { Deck } from "../../schemas/Deck";
import type { SetStateAction } from "react";

export interface LibraryDeckProps {
    deckId:number;
    index:string|number;
    title:string;
    description:string;
    image:string;
    author:string;
    level:string;
    cardsQuantity:string;
    language:string;
    refreshLibraryDecksList:(deckId:number)=>void;
    setLibraryDecksList:React.Dispatch<SetStateAction<Deck[]>>;
    setOwnedDecksList:React.Dispatch<SetStateAction<Deck[]>>;
    setUserDecksList:React.Dispatch<SetStateAction<Deck[]>>;
    libraryDecksList:Deck[];
}