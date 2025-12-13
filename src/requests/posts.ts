import axios from "axios";
import type React from "react";
import type { SetStateAction } from "react";
import type { Post } from "../schemas/Post";
import { useBaseApiUrl } from "../hooks/useBaseApiUrl";

export const getPostsByLanguage = async (language:string, setPosts:React.Dispatch<SetStateAction<Post[]>>) => {
    try {
        const response = await axios.get(useBaseApiUrl("/hub/posts/all"), {
            params: {language:language},
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });
        setPosts(typeof response.data.items === "string" ? JSON.parse(response.data.items) : response.data.items);
    } catch (error: any) {
        setPosts([]);
    }
};