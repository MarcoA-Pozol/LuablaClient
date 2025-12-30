import { TopNavBarApp } from "../components/General/TopNavBarApp";
import { useAuth } from "../App";
import { HubBottomNav } from "../components/Hub/HubBottomNav";
import { useState, useEffect } from "react";
import { PickLanguageForm } from "../components/Authentication/PickLanguageForm";
import { PostsContainer } from "../components/Hub/PostsContainer";
import { getPostsByLanguage } from "../requests/posts";
import { useSocialData } from "../hooks/useSocialData";
import { useLanguages } from "../hooks/useLanguages";
import { usePosts } from "../hooks/usePosts";

export const HubView = () => {
    const { authUser } = useAuth();
    const [displayedContainer, setDisplayedContainer] = useState<string>("posts");
    const {fetchNotifications} =useSocialData();
    const {languageToLearn} = useLanguages();
    const {setPostsList, setPostsPaginationMessage, setPostsPage} = usePosts();

    useEffect(() => {
        window.scrollTo({top:0, behavior: "smooth"});
    }, [displayedContainer]);

    useEffect(() => {
        fetchNotifications();
    }, [])

    useEffect(() => {
        getPostsByLanguage(languageToLearn, setPostsList, setPostsPaginationMessage, setPostsPage);
    }, [languageToLearn])

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp authUser={authUser}/>
                    <div style={styles.contentContainer}>
                        {displayedContainer === "posts" && (<PostsContainer/>)}
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