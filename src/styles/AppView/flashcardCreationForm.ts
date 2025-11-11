import type React from "react";
import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue"

export const useFlashcardCreationFormStyles = ():{[key:string]:React.CSSProperties} => {
    const responsiveCssValue = useResponsiveCssValue();

    return {
        form: {
        backgroundColor: "white",
        padding: "20px",
        paddingBlock: responsiveCssValue("5px", "20px"),
        borderRadius: "10px",
        width: "300px",
        border: "1px solid royalblue",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        height: responsiveCssValue("280px", "340px"),
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        },
        heading: {
        color: "royalblue",
        fontSize: "22px",
        textAlign: "center",
        marginBottom: responsiveCssValue("0", "20px"),
        marginTop: responsiveCssValue("0", "20px"),
        },
        label: {
        display: "inline-flex",
        color: "#333",
        marginBottom: "12px",
        justifyContent: "center"
        },
        input: {
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        height: "10px",
        width: "200px"
        },
        textarea: {
        padding: "8px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        height: responsiveCssValue("10px", "60px"),
        width: "200px"
        },
        buttonContainer: {
        display: "inline-flex",
        justifyContent:"center",
        gap: "10px",
        width: "230px",
        margin: "0 auto"
        },
        button: {
        padding: "8px 0px",
        backgroundColor: "royalblue",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        fontWeight: "bold",
        flex: 1,
        },
    }
};