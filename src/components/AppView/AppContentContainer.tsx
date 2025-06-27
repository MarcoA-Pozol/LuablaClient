import type React from "react";
import type { ReactNode } from "react";

interface AppContentContainerProps {
    children: ReactNode;
    languageToStudy: string;
}
export const AppContentContainer = ({languageToStudy, children}:AppContentContainerProps) => {
    return (
        <div style={{backgroundColor:"#f9f9f9",color:"#333",margin:0,display:"flex",flexDirection:"column", minHeight:"100vh",padding:"20px"}}>
            {children}
        </div>
    )
}