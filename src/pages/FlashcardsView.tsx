import { LearningContainer } from "../components/Flashcards/LearningContainer";
import { LibraryContainer } from "../components/Flashcards/LibraryContainer";
import { CreationContainer } from "../components/Flashcards/CreationContainer";
import { PickLanguageForm } from "../components/Authentication/PickLanguageForm";
import { TopNavBarApp } from "../components/General/TopNavBarApp";
import { FlashcardsContentContainer } from "../components/Flashcards/FlashcardsContentContainer";
import { DeckPracticeContainer } from "../components/Flashcards/DeckPracticeContainer";
import { BottomOptionsBar } from "../components/Flashcards/BottomOptionsBar";
import { useAuth } from "../App";
import { useEffect, useState } from "react";
import { fetchUserDecks, fetchLibraryDecks } from "../requests/decks";
import { useDecksLists } from "../hooks/useDecksLists";
import { useLanguages } from "../hooks/useLanguages";
import { useSocialData } from "../hooks/useSocialData";
import { RandomFlashcardsPractice } from "../components/Flashcards/RandomFlashcardsPractice";

export const FlashcardsView = () => {
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
                    <FlashcardsContentContainer>
                        {displayedContainer === "learning" && (<LearningContainer setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>)}
                        {displayedContainer === "practice" && (<LearningContainer setDisplayedContainer={setDisplayedContainer} setDeckToPracticeID={setDeckToPracticeID}/>)}
                        {displayedContainer === "library" && (<LibraryContainer/>)}
                        {displayedContainer === "creation" && (<CreationContainer/>)}
                        {displayedContainer === "practice" && (<DeckPracticeContainer deckId={deckToPracticeID} setDisplayedContainer={setDisplayedContainer}/>)}
                        {displayedContainer === "randomFlashcardsPractice" && <RandomFlashcardsPractice/>}
                    </FlashcardsContentContainer>
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