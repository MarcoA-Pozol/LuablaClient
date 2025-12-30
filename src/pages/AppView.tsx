import { LearningContainer } from "../components/AppView/Learn/LearningContainer";
import { LibraryContainer } from "../components/AppView/Library/LibraryContainer";
import { CreationContainer } from "../components/AppView/Create/CreationContainer";
import { PickLanguageForm } from "../components/Authentication/PickLanguageForm";
import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { AppContentContainer } from "../components/AppView/AppContentContainer";
import { DeckPracticeContainer } from "../components/AppView/Practice/DeckPracticeContainer";
import { BottomOptionsBar } from "../components/AppView/BottomOptionsBar";
import { useAuth } from "../App";
import { useEffect, useState } from "react";
import { fetchUserDecks, fetchLibraryDecks } from "../requests/decks";
import { useDecksLists } from "../hooks/useDecksLists";
import { useLanguages } from "../hooks/useLanguages";
import { useSocialData } from "../hooks/useSocialData";
import { RandomFlashcardsPractice } from "../components/AppView/Practice/RandomFlashcardsPractice";

export const AppView = () => {
    const { authUser } = useAuth();
    const { languageToLearn } = useLanguages();
    const [displayedContainer, setDisplayedContainer] = useState<string>("learning");
    const { setUserDecksList, setLibraryDecksList, setOwnedDecksList} = useDecksLists();
    const [deckToPracticeID, setDeckToPracticeID] = useState<number>(0);
    const { fetchNotifications } = useSocialData();

    useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
    }, [displayedContainer, deckToPracticeID]);

    useEffect(() => {
        fetchNotifications();
    }, [])

    useEffect(() => {
        fetchLibraryDecks(languageToLearn, setLibraryDecksList);
        fetchUserDecks(languageToLearn, setOwnedDecksList, setUserDecksList);
    }, [languageToLearn])

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp authUser={authUser}/>
                    <AppContentContainer>
                        {displayedContainer === "learning" && (<LearningContainer setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>)}
                        {displayedContainer === "library" && (<LibraryContainer/>)}
                        {displayedContainer === "creation" && (<CreationContainer/>)}
                        {displayedContainer === "practice" && (<DeckPracticeContainer deckId={deckToPracticeID} setDisplayedContainer={setDisplayedContainer}/>)}
                        {displayedContainer === "randomFlashcardsPractice" && <RandomFlashcardsPractice/>}
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