import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useNotificationsPopUpWindowStyles = (showNotificationsPopUpWindow:boolean): {[key:string]: React.CSSProperties} => {
    const responsiveCssValue = useResponsiveCssValue();

    return {
        notificationsContainer: {
            display: showNotificationsPopUpWindow ? "block" : "none",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: "3px 4px 2px 3px rgb(66, 64, 64)",
            paddingBlock: "10px",
            paddingInline: "10px",
            justifyContent: "center",
            justifyItems: "center",
            textAlign: "center",
            alignItems: "center",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            marginBottom: "50px",
            width:  responsiveCssValue("70vw", "25vw")
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
        }
    }
} 

