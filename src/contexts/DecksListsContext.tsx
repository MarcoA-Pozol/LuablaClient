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

const DecksListsProvider = ({ children }: DecksListsProviderProps) => {
    const languageToStudy = "EN"; // Set this to get local stored language first, if not available, then use "EN" by default
    const [userDecksList, setUserDecksList] = useState<Deck[]>([]);
    const [ownedDecksList, setOwnedDecksList] = useState<Deck[]>([]);
    const [libraryDecksList, setLibraryDecksList] = useState<Deck[]>([]);

    useEffect(() => {
        fetchUserDecks(setOwnedDecksList, setUserDecksList);
        fetchLibraryDecks(setLibraryDecksList);
    }, [languageToStudy]);

    return (
        <DecksListsContext.Provider value={{ userDecksList, setUserDecksList, ownedDecksList, setOwnedDecksList, libraryDecksList, setLibraryDecksList }}>
            {children}
        </DecksListsContext.Provider>
    );
}

export default DecksListsProvider;