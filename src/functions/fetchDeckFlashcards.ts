import axios from "axios"
import { useBaseApiUrl } from "../hooks/useBaseApiUrl";

export const fetchDeckFlashcards = async (deckId:number, language:string) => {
    try {
        const response = await axios.get(useBaseApiUrl(`/flashcards/flashcard?id=${deckId}&language=${language}`), {withCredentials:true, headers:{'Content-Type':'application/json'}})
        const data = response.data;
        return data.flashcards;
    } catch (error) {
        return `Unexpected error: ${error}`;
    }
}