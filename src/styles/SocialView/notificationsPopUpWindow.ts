import { useResponsiveCssValue } from "../../hooks/useResponsiveCssValue";

export const useNotificationsPopUpWindowStyles = (showNotificationsPopUpWindow:boolean): {[key:string]: React.CSSProperties} => {
    const responsiveCssValue = useResponsiveCssValue();

    return {
        overlay: {
            display: showNotificationsPopUpWindow ? "flex" : "none",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.7)",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
        },
        notificationsContainer: {
            display: showNotificationsPopUpWindow ? "flex" : "none",
            flexDirection: "column",
            backgroundColor: "white",
            padding: responsiveCssValue("16px", "20px"),
            borderRadius: "12px",
            height: "75vh",
            width: responsiveCssValue("90%", "40%"),
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            paddingBottom: "12px",
            borderBottom: "2px solid #f0f0f0"
        },
        headerTitle: {
            color: "black",
            fontSize: "1.5rem",
            fontWeight: 600,
            margin: 0,
        },
        notificationBadge: {
            backgroundColor: "royalblue",
            color: "white",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.8rem",
            fontWeight: "bold"
        },
        notificationsList: {            
            overflowY: "auto",
            flex: 1,
            paddingRight: "8px",
        },
        notificationItem: {
            marginBottom: "12px",
            padding: "8px",
            borderRadius: "8px",
            transition: "background-color 0.2s ease"
        },
        notificationHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "4px"
        },
        title: {
            fontSize: "0.95rem",
            color: "black",
            fontWeight: 600,
            margin: 0,
            maxWidth: "70%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        timestamp: {
            fontSize: "0.75rem",
            color: "#666",
            fontWeight: 400
        },
        description: {
            fontSize: "0.85rem",
            color: "#333",
            lineHeight: 1.4,
            margin: 0,
            padding: "4px 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        notificationDivider: {
            height: "1px",
            backgroundColor: "#eee",
            marginTop: "8px"
        },
        emptyState: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%"
        },
        emptyText: {
            color: "#666",
            fontSize: "1rem"
        },
        hideWindowButton: {
            backgroundColor: "white",
            color: "royalblue",
            borderRadius: "6px",
            border: "1px solid royalblue",
            padding: "8px 16px",
            fontSize: "0.9rem",
            fontWeight: 500,
            cursor: "pointer",
            marginTop: "16px",
            alignSelf: "flex-end",
            transition: "all 0.2s ease"
        }
    }
}