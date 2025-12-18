import axios from "axios";
import { useBaseApiUrl } from "../hooks/useBaseApiUrl";

export const fetchWordSentences = async (language:string, userNativeLanguage:string, word:string) => {

    try {
        const response = await axios.post(useBaseApiUrl("/flashcards/completeWordWithAI"), 
            {language:language, native_language:userNativeLanguage, word:word},
            { 
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        return response;
    } catch (error: any) {
        if (error.response) {
            return null;
        } else {
            return null;
        }
    }
}

