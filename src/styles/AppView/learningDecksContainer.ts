import React from "react";

export const useLearningDecksContainerStyles = (): {[key:string]:React.CSSProperties} => {
    return {
        decksContainer: {
            paddingTop: "20px",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            width: "100%",
            gap: "50px",
        },
    }
}