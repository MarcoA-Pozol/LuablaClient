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
import { fetchUserDecks, fetchLibraryDecks } from "../functions/fetchDecks";
import { useDecksLists } from "../hooks/useDecksLists";

export const AppView = () => {
    const { authUser } = useAuth();
    const [displayedContainer, setDisplayedContainer] = useState<string>("learning");
    const [languageToStudy, setLanguageToStudy] = useState<string>(localStorage.getItem("languageToStudy") || "EN");
    const {userDecksList, setUserDecksList, setLibraryDecksList, setOwnedDecksList} = useDecksLists();
    const [deckToPracticeID, setDeckToPracticeID] = useState<number>(0);

    useEffect(() => {
        fetchLibraryDecks(languageToStudy, setLibraryDecksList);
        fetchUserDecks(languageToStudy, setOwnedDecksList, setUserDecksList);
    }, [languageToStudy])

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp  authUser={authUser} setLanguageToStudy={setLanguageToStudy} languageToStudy={languageToStudy}/>
                    <AppContentContainer>
                        {displayedContainer === "learning" && (<LearningContainer authUser={authUser} languageToStudy={languageToStudy}  setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>)}
                        {displayedContainer === "library" && (<LibraryContainer languageToStudy={languageToStudy}/>)}
                        {displayedContainer === "creation" && (<CreationContainer languageToStudy={languageToStudy}/>)}
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