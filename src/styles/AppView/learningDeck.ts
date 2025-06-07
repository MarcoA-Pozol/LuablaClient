import React from "react";
import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useLearningDeckStyles = (isDeckHovered:boolean): {[key:string]:React.CSSProperties} => {
    const responsiveValue = useResponsiveCssValue();

    return {
        deck: {
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            transform: isDeckHovered ? "translateY(-10px)" : "none",
            boxShadow: isDeckHovered 
            ? "5px 6px 6px 4px rgba(66, 64, 64, 0.6)" 
            : "3px 4px 2px 3px rgb(66, 64, 64)",
            paddingBlock: "10px",
            paddingInline: "10px",
            justifyContent: "center",
            justifyItems: "center",
            textAlign: "center",
            alignItems: "center",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            marginBottom: "50px",
            width: responsiveValue("70vw", "25vw")
        },
        title: {
            width: "100%",
            fontSize: "1.2em",
            color: "#333333",
            marginTop: 0,
            marginBottom: 0,
            paddingInline: "5px",
            textAlign: "center",
            alignContent: "center",
            whiteSpace: "nowrap",
            overflowX: "hidden"
        },
        image: {
            width: "220px",
            height: "130px",
            marginTop: "10px",
            marginBottom: "10px",
            borderRadius: "10px",
            boxShadow: "1px 1px 1px 2px rgb(93, 93, 94)",
            objectFit: "cover"
        },
        description: {
            minHeight: "70px",
            maxHeight: "70px",
            fontSize: "0.9em",
            color: "#404650",
            lineHeight: 1.2,
            marginTop: 0,
            marginBottom: "5px",
            paddingBlock: "10px",
            paddingInline: "20px",
            borderBottom: "1px solid rgb(43, 44, 44)",
            overflowY: "scroll"
        },
        tags: {
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            marginBottom: "10px"
        },
        author: {
            borderRadius: "5px",
            paddingInline: "5px",
            paddingBlock: "2px",
            border: "none",
            fontSize: "0.8em",
            color: "white",
            backgroundColor: "rgb(95, 30, 179)"
        },
        level: {
            borderRadius: "5px",
            paddingInline: "5px",
            paddingBlock: "2px",
            border: "none",
            fontSize: "0.8em",
            color: "white",
            backgroundColor: "rgb(224, 72, 45)"
        },
        cardsQuantity: {
            borderRadius: "5px",
            paddingInline: "5px",
            paddingBlock: "2px",
            border: "none",
            fontSize: "0.8em",
            color: "white",
            backgroundColor: "rgb(18, 138, 68)"
        },
        addCardsButton: {
            width: "100%",
            color: "#999",
            border: "none",
            padding: "10px 20px",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease"
        },
        studyButton: {
            width: "100%",
            paddingBlock: "5px",
            paddingInline: "120px",
            textAlign: "center",
            alignContent: "center",
            backgroundColor: "rgb(35, 10, 90)",
            color: "white",
            cursor: "pointer",
            fontSize: "1.2rem",
            borderRadius: "5px",
            border: "none"
        }
    }
}