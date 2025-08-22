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
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Flashcard.Schemas</h2>
            {isLoading ? (
                <p style={{ color: "#666666" }}>Loading...</p>
            ) : (
                Object.entries(flashcardModels).map(([schema, columns]:[any, any], idx:number) => (
                    <div key={idx} style={{ marginBottom: "20px", padding: "12px", border: "1px solid #ccc", borderRadius: "6px", backgroundColor: "#26115fff"}}>
                        <h3 style={{ margin: "0 0 10px 0", color: "#2a5d9f" }}>{schema}</h3>
                        
                        <table>
                            <thead>
                                <tr style={{backgroundColor:"rebeccapurple"}}>
                                    <td style={{border:"2px dotted white"}}>Name</td>
                                    <td style={{border:"2px dotted white"}}>Type</td>
                                    <td style={{border:"2px dotted white"}}>Null</td>
                                    <td style={{border:"2px dotted white"}}>Default</td>
                                    <td style={{border:"2px dotted white"}}>Related</td>
                                </tr>
                            </thead>

                            <tbody>
                                {columns.map((column:any, colIdx:any) => (
                                    <tr key={colIdx}>
                                        <td>{column.name}</td>
                                        <td>{column.type}</td>
                                        <td>{String(column.null)}</td>
                                        <td>{String(column.default)}</td>
                                        <td>{column.related_model}</td>
                                    </tr>
                                ))}
                            </tbody>

                            {/* <tr>
                                <td>{schema[1][0].name}</td>
                                <td>{schema[1][0].type}</td>
                                <td>{String(schema[1][0].null)}</td>
                                <td>{String(schema[1][0].default) === "<class 'django.db.models.fields.NOT_PROVIDED'>" ? "Not provided" : String(schema[1][0].default)}</td>
                                <td>{String(schema[1][0].related_model) === "null" ? "None" : schema[1][0].related_model}</td>
                            </tr> */}
                        </table>
                    </div>
                ))
            )}
        </div>
    );
}