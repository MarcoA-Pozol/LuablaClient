import type React from "react";
import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue"

export const useDeckSelectionFormStyles = ():{[key:string]:React.CSSProperties} => {
    const responsiveCssValue = useResponsiveCssValue();

    return {
        container: {
            padding: "20px",
            paddingBlock: responsiveCssValue("0px", "20px"),
            border: "1px solid royalblue",
            borderRadius: "10px",
            width: "300px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            height: responsiveCssValue("180px", "340px"),
            position: responsiveCssValue("sticky", "sticky"),
            bottom: "60px",
            backgroundColor: "white"
        },
        heading: {
            color: "royalblue",
            fontSize: responsiveCssValue("1rem", "1.5rem"),
            marginBottom: responsiveCssValue("0", "20px"),
            textAlign: "center",
        },
        noDecksContainer: {
            
        },
        decksList: {
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            gap:responsiveCssValue("1px", "5px"),
            marginBottom:responsiveCssValue("0", "20px"),
            height:responsiveCssValue("90px", "200px"),
            overflowY: "scroll"
        },
        deckItem: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: responsiveCssValue("1px", "10px"),
            border: "1px solid #ccc",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s ease",
            width: "250px",
            margin: "0px auto"
        },
        deckImage: {
            width: responsiveCssValue("25px", "40px"),
            height: responsiveCssValue("25px", "40px"),
            borderRadius: "6px",
            objectFit: "cover",
        },
        deckName: {
            fontSize: responsiveCssValue("1rem", "1.2rem"),
            color: "#333",
            width: "100%",
            textAlign: "center"
        },
        text: {
            color: "red",
            marginBottom: "10px",
        },
        button: {
            backgroundColor: "royalblue",
            color: "white",
            border: "none",
            padding: responsiveCssValue("6px 10px", "10px 16px"),
            fontSize: "16px",
            borderRadius: "6px",
            cursor: "pointer",
            margin: "5px",
        },
        createMore: {
            textAlign: "center",
        }
    }
}