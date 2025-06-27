import { LearningContainer } from "../components/AppView/Learn/LearningContainer";
import { LibraryContainer } from "../components/AppView/Library/LibraryContainer";
import { CreationContainer } from "../components/AppView/Create/CreationContainer";
import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";
import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { AppContentContainer } from "../components/AppView/AppContentContainer";
import { BottomOptionsBar } from "../components/AppView/BottomOptionsBar";
import { useAuth } from "../App";
import { useState } from "react";

export const AppView = () => {
    const { authUser } = useAuth();
    const [displayedContainer, setDisplayedContainer] = useState<string>("learning");
    const [languageToStudy, setLanguageToStudy] = useState<string>(localStorage.getItem("languageToStudy") || "EN");
    
    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp  authUser={authUser} setLanguageToStudy={setLanguageToStudy} languageToStudy={languageToStudy}/>
                    <AppContentContainer>
                        {displayedContainer === "learning" && (<LearningContainer languageToStudy={languageToStudy}/>)}
                        {displayedContainer === "library" && (<LibraryContainer languageToStudy={languageToStudy}/>)}
                        {displayedContainer === "creation" && (<CreationContainer languageToStudy={languageToStudy}/>)}
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