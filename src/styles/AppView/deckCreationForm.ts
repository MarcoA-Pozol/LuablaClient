import type React from "react";
import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue"

export const useDeckCreationFormStyles = ():{[key:string]:React.CSSProperties} => {
    const responsiveCssValue = useResponsiveCssValue();

    return {
        overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
        },
        floatingForm: {
            backgroundColor: "white",
            padding: responsiveCssValue("16px", "16px"),
            borderRadius: "10px",
            height: "75vh",
            width: responsiveCssValue("90%", "40%"),
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        },
        heading: {
            textAlign: "center",
            fontSize: responsiveCssValue("20px", "22px"),
            color: "royalblue",
            marginTop: "5px",
            marginBottom: "10px",
        },
        label: {
            display: "block",
            marginBottom: "12px",
            color: "#333",
            fontWeight: "bold",
        },
        input: {
            width: "95%",
            padding: "8px",
            marginTop: "4px",
            borderRadius: "5px",
        border: "1px solid #ccc",
        },
        textarea: {
            width: "95%",
            padding: "8px",
            marginTop: "4px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "vertical",
            minHeight: "60px",
        },
        select: {
            width: "99%",
            padding: "8px",
            marginTop: "4px",
            borderRadius: "5px",
            border: "1px solid #ccc",
        },
        formButtons: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: "20px",
        },
        button: {
            padding: "10px 16px",
            borderRadius: "6px",
            border: "none",
            fontWeight: "bold",
            cursor: "pointer",
        },
    }
}