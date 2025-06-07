import type { ReactNode } from "react";

interface AppContentContainerProps {
    children: ReactNode;
}
export const AppContentContainer = ({children}:AppContentContainerProps) => {
    return (
        <div style={{backgroundColor:"#f9f9f9",color:"#333",margin:0,display:"flex",flexDirection:"column", minHeight:"100vh",padding:"20px"}}>
            {children}
        </div>
    )
}