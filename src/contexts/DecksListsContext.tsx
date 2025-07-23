import { createContext, useState, useEffect } from "react";
import { fetchUserDecks, fetchLibraryDecks } from "../functions/fetchDecks";
import type { Deck } from "../schemas/Deck";
import type { ReactNode, SetStateAction } from "react";

type DecksListsContextType = {
    userDecksList: Deck[];
    setUserDecksList: React.Dispatch<SetStateAction<Deck[]>>;
    ownedDecksList: Deck[];
    setOwnedDecksList: React.Dispatch<SetStateAction<Deck[]>>;
    libraryDecksList: Deck[];
    setLibraryDecksList: React.Dispatch<SetStateAction<Deck[]>>;
};

export const DecksListsContext = createContext<DecksListsContextType | undefined>(undefined);

interface DecksListsProviderProps {
    children: ReactNode;
}

export const DecksListsProvider = ({ children }: DecksListsProviderProps) => {
    const languageToStudy = "FR";
    const [userDecksList, setUserDecksList] = useState<Deck[]>([]);
    const [ownedDecksList, setOwnedDecksList] = useState<Deck[]>([]);
    const [libraryDecksList, setLibraryDecksList] = useState<Deck[]>([]);

    useEffect(() => {
        async function fetchUserOwnedDecks() {
            fetchUserDecks(languageToStudy, setOwnedDecksList, setUserDecksList);
        }
        fetchUserOwnedDecks();
    }, [languageToStudy]);

    useEffect(() => {
        fetchLibraryDecks(languageToStudy, setLibraryDecksList);
    }, [languageToStudy]);

    return (
        <DecksListsContext.Provider value={{ userDecksList, setUserDecksList, ownedDecksList, setOwnedDecksList, libraryDecksList, setLibraryDecksList }}>
            {children}
        </DecksListsContext.Provider>
    );
}