import { useContext } from "react";
import { LanguagesContext } from "../contexts/LanguagesContext";

export const useLanguages = () => {
    const context = useContext(LanguagesContext);
    if (!context) throw new Error("useLanguages must be used withing LanguagesContext provider")
    return context;
}