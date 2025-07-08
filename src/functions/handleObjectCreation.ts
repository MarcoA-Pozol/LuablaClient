import type React from "react"
import axios from "axios";

export const handleObjectCreationWithQueryParams = async (event:React.FormEvent<HTMLFormElement>, requestURL:string, queryParams:object, requestHeaders:object={"Content-Type":"multipart/form-data"}, objectToCreateName:string="object") => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
        const response = await axios.post(requestURL, formData, {
            params: queryParams,
            withCredentials: true,
            headers: requestHeaders,
        })
        const responseData = response.data;

        if (response.status !== 201) {
            alert (`Error while trying to create a${objectToCreateName.startsWith("a") ? "n" : objectToCreateName.startsWith("e") ? "n" : objectToCreateName.startsWith("i") ? "n" : objectToCreateName.startsWith("o") ? "n" : objectToCreateName.startsWith("u") ? "n" : ""}: ${responseData.error}`);
        }

        alert(`Object created: ${objectToCreateName}`);
    } catch (error) {
        alert(`Creating ${objectToCreateName} failed: ${error}`);
    }

}