import { LearningContainer } from "../components/AppView/Learn/LearningContainer";
import { LibraryContainer } from "../components/AppView/Library/LibraryContainer";
import { CreationContainer } from "../components/AppView/Create/CreationContainer";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";
import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { AppContentContainer } from "../components/AppView/AppContentContainer";
import { DeckPracticeContainer } from "../components/AppView/Practice/DeckPracticeContainer";
import { BottomOptionsBar } from "../components/AppView/BottomOptionsBar";
import { useAuth } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

type Deck = {
    id: number;
    index:string|number;
    title:string;
    description:string;
    image:string;
    author:string;
    level:string;
    cardsQuantity:string|number;
    language:string;
    [key: string]: any;
};

export const AppView = () => {
    const { authUser } = useAuth();
    const [displayedContainer, setDisplayedContainer] = useState<string>("learning");
    const [languageToStudy, setLanguageToStudy] = useState<string>(localStorage.getItem("languageToStudy") || "EN");
    const [userDecksList, setUserDecksList] = useState<Deck[]>([]);
    const [ownedDecksList, setOwnedDecksList] = useState<Deck[]>([]);
    const [libraryDecksList, setLibraryDecksList] = useState<Deck[]>([]);
    const [deckToPracticeID, setDeckToPracticeID] = useState<number>(0);

    // Fetch user's decks
    const fetchUserDecks = async () => {
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

     const fetchLibraryDecks = async () => {
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

    useEffect(() => {
        fetchLibraryDecks();
    }, [languageToStudy, libraryDecksList])

    useEffect(() => {
        fetchUserDecks();
    }, [languageToStudy, libraryDecksList])

    const removeFromLibraryDecks = (deckId:number) => {
        setLibraryDecksList(libraryDecksList.filter(libraryDeck => libraryDeck.id !== deckId));
    }

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp  authUser={authUser} setLanguageToStudy={setLanguageToStudy} languageToStudy={languageToStudy}/>
                    <AppContentContainer>
                        {displayedContainer === "learning" && (<LearningContainer authUser={authUser} userDecksList={userDecksList} ownedDecksList={ownedDecksList} languageToStudy={languageToStudy}  setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>)}
                        {displayedContainer === "library" && (<LibraryContainer languageToStudy={languageToStudy} libraryDecksList={libraryDecksList} refreshLibraryDecksList={() => {removeFromLibraryDecks}}/>)}
                        {displayedContainer === "creation" && (<CreationContainer languageToStudy={languageToStudy} userDecksList={userDecksList} refreshDecks={fetchUserDecks}/>)}
                        {displayedContainer === "practiceDeckFlashcards" && (<DeckPracticeContainer deckId={deckToPracticeID}/>)}
                    </AppContentContainer>
                    <BottomOptionsBar setDisplayedContainer={setDisplayedContainer}/>
                </div>
            ): (
                <div>
                    <PickLanguageForm/>
                </div>
            )}
        </>
    );
}