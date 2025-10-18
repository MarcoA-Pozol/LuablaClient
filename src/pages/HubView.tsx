import { TopNavBarApp } from "../components/General/TopNavBarApp";
import { useAuth } from "../App";
import { HubBottomNav } from "../components/Hub/HubBottomNav";
import { useState } from "react";
import { PickLanguageForm } from "../components/Authentication/PickLanguageForm";
import { LibraryContainer } from "../components/Flashcards/LibraryContainer";
import { CreationContainer } from "../components/Flashcards/CreationContainer";

export const HubView = () => {
    const { authUser } = useAuth();
    const [displayedContainer, setDisplayedContainer] = useState<string>("forum");

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp authUser={authUser}/>
                    <div style={{backgroundColor:"#f9f9f9",color:"#333",margin:0,display:"flex",flexDirection:"column", minHeight:"100vh",padding:"20px"}}>
                        {displayedContainer === "generalDiscussions" && (<LibraryContainer/>)}
                        {displayedContainer === "topics" && (<CreationContainer/>)}
                    </div>
                    <HubBottomNav setDisplayedContainer={setDisplayedContainer}/>
                </div>
            ) : (
                <div>
                    <PickLanguageForm/>
                </div>
            )}
        </>
    );
}