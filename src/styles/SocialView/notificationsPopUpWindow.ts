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
            backgroundColor: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(8px)",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: showNotificationsPopUpWindow ? "fadeIn 0.3s ease-out" : "none",
        },
        notificationsContainer: {
            display: showNotificationsPopUpWindow ? "flex" : "none",
            flexDirection: "column",
            background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
            padding: responsiveCssValue("20px", "28px"),
            borderRadius: "20px",
            height: "75vh",
            width: responsiveCssValue("92%", "42%"),
            boxShadow: `
                0 25px 50px -12px rgba(0, 0, 0, 0.35),
                0 0 0 1px rgba(255, 255, 255, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.9)
            `,
            border: "1px solid rgba(255, 255, 255, 0.4)",
            animation: showNotificationsPopUpWindow ? "slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)" : "none",
            transform: showNotificationsPopUpWindow ? "translateY(0)" : "translateY(30px)",
            opacity: showNotificationsPopUpWindow ? 1 : 0,
            transition: "all 0.3s ease-out",
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            paddingBottom: "16px",
            borderBottom: "2px solid #e2e8f0",
            position: "relative",
        },
        headerTitle: {
            background: "linear-gradient(90deg, #1e293b, #475569)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: responsiveCssValue("1.4rem", "1.75rem"),
            fontWeight: 700,
            margin: 0,
            letterSpacing: "-0.5px",
            position: "relative",
            paddingLeft: "12px",
        },
        notificationBadge: {
            background: "linear-gradient(135deg, #ef4444, #dc2626)",
            color: "white",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.85rem",
            fontWeight: 800,
            boxShadow: "0 4px 12px rgba(239, 68, 68, 0.3)",
            animation: "pulse 2s infinite",
        },
        notificationsList: {            
            overflowY: "auto",
            flex: 1,
            paddingRight: "12px",
            scrollbarWidth: "thin",
            scrollbarColor: "#cbd5e1 #f1f5f9",
        },
        notificationItem: {
            marginBottom: "16px",
            padding: "18px",
            borderRadius: "16px",
            background: "white",
            border: "1px solid #e2e8f0",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.06)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
        },
        notificationHeader: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "8px",
            flexWrap: "wrap",
            gap: "8px",
        },
        title: {
            fontSize: "1rem",
            color: "#1e293b",
            fontWeight: 700,
            margin: 0,
            maxWidth: "70%",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: 1.4,
        },
        timestamp: {
            fontSize: "0.8rem",
            color: "#64748b",
            fontWeight: 500,
            background: "#f8fafc",
            padding: "4px 10px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            border: "1px solid #e2e8f0",
        },
        description: {
            fontSize: "0.9rem",
            color: "#475569",
            lineHeight: 1.5,
            margin: 0,
            padding: "8px 0",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
        },
        notificationDivider: {
            height: "1px",
            background: "linear-gradient(90deg, transparent, #e2e8f0, transparent)",
            margin: "12px 0",
        },
        emptyState: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            flexDirection: "column",
            gap: "16px",
        },
        emptyText: {
            color: "#94a3b8",
            fontSize: "1.1rem",
            fontWeight: 500,
            textAlign: "center",
        },
        hideWindowButton: {
            background: "linear-gradient(135deg, #ffffff, #f8fafc)",
            color: "#3b82f6",
            borderRadius: "12px",
            border: "2px solid #e2e8f0",
            padding: "12px 24px",
            fontSize: "0.95rem",
            fontWeight: 600,
            cursor: "pointer",
            marginTop: "20px",
            alignSelf: "flex-end",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            position: "relative",
            overflow: "hidden",
        },
        statusButton: {
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
            width: "100%",
            marginTop: "12px",
        },
        statusButtonUnread: {
            background: "linear-gradient(135deg, #374b69ff, #394b72ff)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            padding: "10px 20px",
            fontSize: "0.9rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 12px rgba(59, 130, 246, 0.25)",
            width: "100%",
            marginTop: "12px",
        }
    }
}

// Añade estas keyframes al componente principal o a un archivo CSS global
// Puedes agregar esto en un <style> tag o en tu archivo CSS global:

// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }

// @keyframes slideUp {
//   from {
//     opacity: 0;
//     transform: translateY(30px) scale(0.98);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0) scale(1);
//   }
// }

// @keyframes pulse {
//   0%, 100% {
//     transform: scale(1);
//     box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
//   }
//   50% {
//     transform: scale(1.05);
//     box-shadow: 0 6px 18px rgba(239, 68, 68, 0.4);
//   }
// }