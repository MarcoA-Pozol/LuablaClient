import type { SetStateAction } from "react";
import type { Deck } from "../schemas/Deck";

export const removeFromLibraryDecks = (deckId:number, setLibraryDecksList:React.Dispatch<SetStateAction<Deck[]>>, libraryDecksList:Deck[]) => {
    setLibraryDecksList(libraryDecksList.filter(libraryDeck => libraryDeck.id !== deckId));
}
