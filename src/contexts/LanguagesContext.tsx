import { createContext, useState, type ReactNode, type SetStateAction } from "react";

type LanguagesContextType = {
    languageToStudy:string;
    setLanguageToStudy:React.Dispatch<SetStateAction<string>>;
    interfaceLanguage:string;
    setInterfaceLanguage:React.Dispatch<SetStateAction<string>>;
}

export const LanguagesContext = createContext<LanguagesContextType|undefined>(undefined);

interface LanguagesProviderProps {
    children:ReactNode;
}

export const LanguagesProvider = ({children}:LanguagesProviderProps) => {
    const [languageToStudy, setLanguageToStudy] = useState<string>("EN");
    const [interfaceLanguage, setInterfaceLanguage] = useState<string>("EN");

    return (
        <LanguagesContext.Provider value={{ languageToStudy, setLanguageToStudy, interfaceLanguage, setInterfaceLanguage }}>
            {children}
        </LanguagesContext.Provider>
    );
}