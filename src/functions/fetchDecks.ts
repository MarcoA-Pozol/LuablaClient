import axios from "axios";
import type React from "react";
import type { SetStateAction } from "react";
import type { Deck } from "../schemas/Deck";

export const fetchLibraryDecks = async (languageToStudy:string, setLibraryDecksList:React.Dispatch<SetStateAction<Deck[]>>) => {
    try {
        const response = await axios.get("http://localhost:8600/api/decks/libraryDeck", {
            params: {language:languageToStudy},
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        setLibraryDecksList(typeof response.data.decks === "string"
        ? JSON.parse(response.data.decks)
        : response.data.decks);
    } catch (error: any) {
        if (error.response) {
            setLibraryDecksList([]);
        } else {
            setLibraryDecksList([]);
        }
    }
}

export const fetchUserDecks = async (languageToStudy:string, setOwnedDecksList:React.Dispatch<SetStateAction<Deck[]>>, setUserDecksList:React.Dispatch<SetStateAction<Deck[]>>) => {
    try {
        const response = await axios.get("http://localhost:8600/api/decks/deck", {
            params: {language:languageToStudy},
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });
        setOwnedDecksList(typeof response.data.ownedDecks === "string"
        ? JSON.parse(response.data.ownedDecks)
        : response.data.ownedDecks);
        setUserDecksList(typeof response.data.decks === "string"
        ? JSON.parse(response.data.decks)
        : response.data.decks);
    } catch (error: any) {
        if (error.response) {
            setUserDecksList([]);
        } else {
            setUserDecksList([]);
        }
    }
}

