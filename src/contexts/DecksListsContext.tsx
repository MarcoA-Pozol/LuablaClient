import { createContext, useState, useEffect } from "react";
import { fetchUserDecks, fetchLibraryDecks } from "../requests/decks";
import type { Deck } from "../schemas/Deck";
import type { ReactNode, SetStateAction } from "react";
import { useLanguages } from "../hooks/useLanguages";

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
    const {languageToLearn} = useLanguages();
    const [userDecksList, setUserDecksList] = useState<Deck[]>([]);
    const [ownedDecksList, setOwnedDecksList] = useState<Deck[]>([]);
    const [libraryDecksList, setLibraryDecksList] = useState<Deck[]>([]);

    useEffect(() => {
        fetchUserDecks(languageToLearn, setOwnedDecksList, setUserDecksList);
        fetchLibraryDecks(languageToLearn, setLibraryDecksList);
    }, [languageToLearn]);

    return (
        <DecksListsContext.Provider value={{ userDecksList, setUserDecksList, ownedDecksList, setOwnedDecksList, libraryDecksList, setLibraryDecksList }}>
            {children}
        </DecksListsContext.Provider>
    );
}

export default DecksListsProvider;