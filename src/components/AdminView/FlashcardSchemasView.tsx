import { useEffect, useState } from "react";
import axios from "axios";

export const FlashcardSchemasView = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [flashcardModels, setFlashcardModels] = useState<any>([]);

    useEffect(() => {
        const fetchFlashcardSchemas = async () => {
            try {
                const response = await axios.get("http://localhost:8600/api/admin/getFlashcardSchemas", {withCredentials:true});
                const data = response.data;
                
                setFlashcardModels(data.schema);
            } catch (error) {
                console.error("Error fetching flashcard schemas:", error);
            } finally {
                setIsLoading(false)
            }
        } 
        
        fetchFlashcardSchemas();
    }, []);
    

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Flashcard schemas</h2>
            {isLoading ? (
                <p style={{ color: "#666666" }}>Loading...</p>
            ) : (
                Object.entries(flashcardModels).map((schema: any, idx: number) => (
                <div
                    key={idx}
                    style={{
                    marginBottom: "20px",
                    padding: "12px",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    backgroundColor: "#26115fff",
                    }}
                >
                    <h3 style={{ margin: "0 0 10px 0", color: "#2a5d9f" }}>{schema[0]}</h3>
                    <p>
                    <strong>Column name:</strong> {schema[1][0].name}
                    </p>
                    <p>
                    <strong>Column type:</strong> {schema[1][0].type}
                    </p>
                    <p>
                    <strong>Null is valid:</strong> {String(schema[1][0].null)}
                    </p>
                    <p>
                    <strong>Default value:</strong> {String(schema[1][0].default)}
                    </p>
                    <p>
                    <strong>Related model:</strong>{" "}
                    {schema[1][0].related_model ?? "—"}
                    </p>
                </div>
                ))
            )}
        </div>
    );
}