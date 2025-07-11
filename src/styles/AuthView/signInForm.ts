import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useSignInFormStyles = (): { [key: string]: React.CSSProperties } => {
    const responsiveCssValue = useResponsiveCssValue();
    
    return {
        header: {
            backgroundColor: responsiveCssValue("red", "rgb(36, 25, 97)"),
            color: "white",
            display: "inline-flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: responsiveCssValue("5px", "5px"),
            width: "100vw",
            flexWrap: "wrap",
        },
    };
};