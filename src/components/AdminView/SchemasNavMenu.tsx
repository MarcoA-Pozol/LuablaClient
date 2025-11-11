import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/AdminView/schemasNavMenu.css";
import { useBaseApiUrl } from "../../hooks/useBaseApiUrl";

export const SchemasNavMenu = () => {
    const [dbSchemas, setDbSchemas] = useState<object[]>([]);

    useEffect(() => {
        const fetchDbSchemas = async () => {
            const response = await axios.get(useBaseApiUrl("/admin/getDbSchemasList"), {withCredentials:true});
            const data = response.data;
            setDbSchemas(data.schemas);
        }
        fetchDbSchemas();
    }, []);

    return(
        <nav className="menu-container">
            <h2>Db schemas list</h2>
            <h3>Schema 1</h3>
            <h3>Schema 2</h3>
            <h3>Schema 3</h3>
            <h3>Schema 4</h3>
            <h3>Schema 5</h3>
            {
                dbSchemas.map((schema:any) => (
                    <p className="schema-info" key={schema}>{schema}</p>
                ))
            }
        </nav>
    );
}