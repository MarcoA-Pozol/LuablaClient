import { createContext, useState, useEffect } from "react";
import type { Post } from "../schemas/Post";
import type { ReactNode, SetStateAction } from "react";
import { useLanguages } from "../hooks/useLanguages";
import { getPostsByLanguage } from "../requests/posts";

type PostsContextType = {
    postsList: Post[];
    setPostsList: React.Dispatch<SetStateAction<Post[]>>;
    postsPaginationMessage: boolean;
    setPostsPaginationMessage: React.Dispatch<SetStateAction<boolean>>;
    postsPage: number;
    setPostsPage: React.Dispatch<SetStateAction<number>>;
};

interface PostsProviderProps {
    children: ReactNode;
};

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

const PostsProvider = ({children}:PostsProviderProps) => {
    const {languageToLearn} = useLanguages();
    const [postsList, setPostsList] = useState<Post[]>([]);
    const [postsPaginationMessage, setPostsPaginationMessage] = useState<boolean>(true);
    const [postsPage, setPostsPage] = useState<number>(0);

    useEffect(() => {
        getPostsByLanguage(languageToLearn, setPostsList, setPostsPaginationMessage, setPostsPage);
    }, [languageToLearn]);

    return (
        <PostsContext.Provider value={{postsList, setPostsList, postsPaginationMessage, setPostsPaginationMessage, postsPage, setPostsPage}}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;