import axios from "axios";
import { useBaseApiUrl } from "../hooks/useBaseApiUrl";

export const fetchWordSentences = async (language:string, word:string) => {

    try {
        const response = await axios.get(useBaseApiUrl("/flashcards/getWordSentences"), {
            params: {language:language, word:word},
            withCredentials: true,
            headers: {
                "Content-Type": "application/json"
            }
        });

        return response;
    } catch (error: any) {
        if (error.response) {
            return null;
        } else {
            return null;
        }
    }
}

