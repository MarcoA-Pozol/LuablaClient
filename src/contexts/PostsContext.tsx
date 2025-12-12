import { createContext, useState, useEffect } from "react";
import type { Post } from "../schemas/Post";
import type { ReactNode, SetStateAction } from "react";
import { useLanguages } from "../hooks/useLanguages";
import { getPostsByLanguage } from "../requests/posts";

type PostsContextType = {
    postsList: Post[];
    setPostsList: React.Dispatch<SetStateAction<Post[]>>;
};

interface PostsProviderProps {
    children: ReactNode;
};

export const PostsContext = createContext<PostsContextType | undefined>(undefined);

const PostsProvider = ({children}:PostsProviderProps) => {
    const {languageToLearn} = useLanguages();
    const [postsList, setPostsList] = useState<Post[]>([]);

    useEffect(() => {
        getPostsByLanguage(languageToLearn, setPostsList);
    }, [languageToLearn]);

    return (
        <PostsContext.Provider value={{postsList, setPostsList}}>
            {children}
        </PostsContext.Provider>
    );
};

export default PostsProvider;