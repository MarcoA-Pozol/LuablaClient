import { TopNavBarApp } from "../components/General/TopNavBarApp";
import { useAuth } from "../App";
import { HubBottomNav } from "../components/Hub/HubBottomNav";
import { useState } from "react";
import { PickLanguageForm } from "../components/Authentication/PickLanguageForm";
import { PostsContainer } from "../components/Hub/PostsContainer";
import { TopicsContainer } from "../components/Hub/TopicsContainer";
import { QuestionsContainer } from "../components/Hub/QuestionsContainer";


export const HubView = () => {
    const { authUser } = useAuth();
    const [displayedContainer, setDisplayedContainer] = useState<string>("posts");

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp authUser={authUser}/>
                    <div style={styles.contentContainer}>
                        {displayedContainer === "posts" && (<PostsContainer/>)}
                        {displayedContainer === "topics" && (<TopicsContainer/>)}
                        {displayedContainer === "questions" && (<QuestionsContainer/>)}
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


const styles: { [key: string]: React.CSSProperties } = {
    contentContainer: {
        backgroundColor: "rgba(29, 17, 67, 1)",
        color: "#333",
        margin: 0,
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        width: "100%",
        gap: "50px",
        minHeight:"100vh"
    },
};