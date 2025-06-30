import { useState } from "react";
import axios from "axios";

export const GetUserDecks = () => {
    const [data, setData] = useState<string>("");

    const handleClick = async () => {
        try {
            const response = await axios.get("http://localhost:8600/api/app/deck", {
                params: {language:"DE"},
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setData(JSON.stringify(response.data));
        } catch (error: any) {
            if (error.response) {
                console.error("Error response:", error.response.data);
                setData("Error: " + error.response.status);
            } else {
                console.error("Error:", error.message);
                setData("Error: " + error.message);
            }
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Fetch Decks</button>
            {data && <p>{data}</p>}
        </div>
    );
}