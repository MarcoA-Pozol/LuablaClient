import { useState } from "react";
import axios from "axios";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";

export const GetCardsData = () => {
    const [data, setData] = useState<string>("");

    const handleClick = async () => {
        try {
            const response = await axios.get(useBaseApiUrl("/auth/protectedCardsList"), {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setData(JSON.stringify(response.data));
            console.log(response.data);
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
            <button onClick={handleClick}>Fetch Data</button>
            {data && <p>{data}</p>}
        </div>
    );
}