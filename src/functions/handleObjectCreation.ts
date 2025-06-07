import type React from "react"
import axios from "axios";

export const handleObjectCreation = async (event:React.FormEvent<HTMLFormElement>, requestURL:string, queryParams:object={}, requestHeaders:object={"Content-Type":"multipart/form-data"}, objectToCreateName:string="object") => {
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
          return responseData;
        } else {
          alert(`Object created: ${objectToCreateName}`);
          return responseData;
        }

    } catch (error) {
        alert(`Creating ${objectToCreateName} failed: ${error}`);
    }
}

export const clearFormFields = (form: HTMLFormElement, language:string) => {
    Array.from(form.elements).forEach((element) => {
      const field = element as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      if (field.name) {
        if (field instanceof HTMLInputElement) {
          if (field.type === "checkbox" || field.type === "radio") {
            field.checked = false;
          } else if (field.type !== "file") {
            field.value = "";
          }
        } else if (field instanceof HTMLTextAreaElement) {
          field.value = "";
        } else if (field instanceof HTMLSelectElement) {
          if (language === "ZH") {
            field.value = "HSK1"
          } else if (language === "JP") {
            field.value = "N5"
          } else if (language === "KO") {
            field.value = "TOPIK-I-1"
          } else {
            field.value = "A1"
          }
        }
      }
    });
  };