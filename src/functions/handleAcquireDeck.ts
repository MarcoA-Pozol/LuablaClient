import axios from "axios"
import { useBaseApiUrl } from "../hooks/useBaseApiUrl";

export const handleAcquireDeck = async (deckId:number, language:string, temporaryMessage:any) => {
    const response = await axios.patch(useBaseApiUrl("/decks/acquireDeck"), {"deckId":deckId, "language":language}, {withCredentials:true, headers:{"Content-Type":"application/json"}});  

    if (response.status === 200) {
        temporaryMessage.display("Obtained deck.", "purple");
    } else {
        temporaryMessage.display(`Unexpected error: ${response.data.error}`, "red");
    }
}