import type React from "react";
import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue"

export const useProfileInfoSectionStyles = ():{[key:string]:React.CSSProperties} => {
    const responsiveCssValue = useResponsiveCssValue();

    return {
        container:{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignContent:"center",
            padding:"20px 20px",
            backgroundColor:"darkslateblue",
            color:"wheat",
            borderRadius:"10px"
        },
        image:{
            marginInline:"auto",
            width:"40px",
            borderRadius:"10px",
            height:"40px",
            objectFit:"cover"
        },
        username:{
            textAlign:"center",
            fontWeight:"bold",
            fontFamily:"monospace"
        }
    }
}