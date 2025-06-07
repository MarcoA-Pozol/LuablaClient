import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AdminView/flashcardSchemasView.css";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";

export const FlashcardSchemasView = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [flashcardModels, setFlashcardModels] = useState<any>([]);

    useEffect(() => {
        const fetchFlashcardSchemas = async () => {
            try {
                const response = await axios.get(useBaseApiUrl("/admin/getFlashcardSchemas"), {withCredentials:true});
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
        <>
            <div className="flashcard-container">
                <h2 className="flashcard-title">Flashcard.Schemas</h2>
                {isLoading ? (
                    <p style={{ color: "#666666" }}>Loading...</p>
                ) : (
                    <div className="schemas-container">{
                        Object.entries(flashcardModels).map(([schema, columns]:[any, any], idx:number) => (
                            <div key={idx} className="schema-card">
                                <h3 className="schema-name">{schema}</h3>
                                
                                <table className="schema-table">
                                    <thead>
                                        <tr>
                                            <td>Name</td>
                                            <td>Type</td>
                                            <td>Null</td>
                                            <td>Default</td>
                                            <td>Related</td>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {columns.map((column:any, colIdx:any) => (
                                            <tr key={colIdx}>
                                                <td>{column.name}</td>
                                                <td>{column.type}</td>
                                                <td>{String(column.null)}</td>
                                                <td style={{color:String(column.default) === "<class 'django.db.models.fields.NOT_PROVIDED'>" ? "red" : "white"}}>{String(column.default) === "<class 'django.db.models.fields.NOT_PROVIDED'>" ? "Null" : String(column.default)}</td>
                                                <td style={{color:column.related_model === null ? "red" : "white"}}>{column.related_model === null ? "Null" : column.related_model }</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}