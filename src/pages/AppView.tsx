import { LearningContainer } from "../components/AppView/Learn/LearningContainer";
import { LibraryContainer } from "../components/AppView/Library/LibraryContainer";
import { CreationContainer } from "../components/AppView/Create/CreationContainer";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";
import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { AppContentContainer } from "../components/AppView/AppContentContainer";
import { BottomOptionsBar } from "../components/AppView/BottomOptionsBar";
import { useAuth } from "../App";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const AppView = () => {
    const { authUser } = useAuth();
    const [displayedContainer, setDisplayedContainer] = useState<string>("learning");
    const [languageToStudy, setLanguageToStudy] = useState<string>(localStorage.getItem("languageToStudy") || "EN");
    const [userDecksList, setUserDecksList] = useState<any[]>([]);
    
    // Fetch user's decks
    useEffect(() => {

        const fetchUserDecks = async () => {
            try {
                const response = await axios.get("http://localhost:8600/api/app/deck", {
                    params: {language:languageToStudy},
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                setUserDecksList(typeof response.data.decks === "string"
                ? JSON.parse(response.data.decks)
                : response.data.decks);
            } catch (error: any) {
                if (error.response) {
                    setUserDecksList(["No decks were found"]);
                } else {
                    setUserDecksList(["Error with server"]);
                }
            }
        }

        fetchUserDecks();
    }, [languageToStudy])

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp  authUser={authUser} setLanguageToStudy={setLanguageToStudy} languageToStudy={languageToStudy}/>
                    <AppContentContainer>
                        {displayedContainer === "learning" && (<LearningContainer authUser={authUser} userDecksList={userDecksList} languageToStudy={languageToStudy}/>)}
                        {displayedContainer === "library" && (<LibraryContainer languageToStudy={languageToStudy}/>)}
                        {displayedContainer === "creation" && (<CreationContainer languageToStudy={languageToStudy} userDecksList={userDecksList}/>)}
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