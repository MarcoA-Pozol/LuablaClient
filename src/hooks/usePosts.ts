import { useContext } from "react";
import { PostsContext } from "../contexts/PostsContext";

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (!context) throw new Error("usePost must be used within a PostsContext provider");
    return context;
}