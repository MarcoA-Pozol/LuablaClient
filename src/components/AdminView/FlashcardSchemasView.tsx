import { useEffect, useState } from "react";
import axios from "axios";

export const FlashcardSchemasView = () => {
    const [areFlashcardModelsFetched, setAreFlashcardModelsFetched] = useState<boolean>(false);
    const [flashcardModels, setFlashcardModels] = useState();

    useEffect(() => {
        const fetchFlashcardSchemas = async () => {
            const response = await axios.get("http://localhost:8600/api/admin/getFlashcardSchemas", {withCredentials:true});
            const data = response.data
            console.log(data);
            
            setFlashcardModels(data);
            setAreFlashcardModelsFetched(true);
        } 

        fetchFlashcardSchemas();
    }, []);

    return (
        <div>  
            <h2>Flashcard schemas</h2>
            {areFlashcardModelsFetched === false ? "loading" : <pre>{JSON.stringify(flashcardModels, null, 2)}</pre>}
        </div>
    );
}