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
import { useLanguages } from "../hooks/useLanguages";
import { fetchNotificationsList } from "../functions/fetchNotificationsList";
import { useSocialData } from "../hooks/useSocialData";

export const AppView = () => {
    const { authUser } = useAuth();
    const { languageToLearn } = useLanguages();
    const [displayedContainer, setDisplayedContainer] = useState<string>("learning");
    const { setNotificationsCount, setNotificationsList } = useSocialData();
    const { setUserDecksList, setLibraryDecksList, setOwnedDecksList} = useDecksLists();
    const [deckToPracticeID, setDeckToPracticeID] = useState<number>(0);

    useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
    }, [displayedContainer, deckToPracticeID]);

    useEffect(() => {
        fetchNotificationsList(setNotificationsCount, setNotificationsList);
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