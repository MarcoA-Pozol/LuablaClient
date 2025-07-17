import axios from "axios"

export const handleAcquireDeck = async (deckId:number, language:string, temporaryMessage:any) => {
    const response = await axios.patch("http://localhost:8600/api/decks/acquireDeck", {"deckId":deckId, "language":language}, {withCredentials:true, headers:{"Content-Type":"application/json"}});  

    if (response.status === 200) {
        temporaryMessage.display("Added deck to study.", "purple");
    } else {
        temporaryMessage.display(`Unexpected error: ${response.data.error}`, "red");
    }
}