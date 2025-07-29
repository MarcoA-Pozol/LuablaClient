import { useSocialData } from "../../hooks/useSocialData";
import { type SetStateAction } from "react";
import { useNotificationsPopUpWindowStyles } from "../../styles/SocialView/notificationsPopUpWindow";

type NotificationSchema = {
    title: string;
    description: string;
    created_at: string;
};

interface NotificationsPopUpWindowProps {
    showNotificationsPopUpWindow:boolean;
    setShowNotificationsPopUpWindow:React.Dispatch<SetStateAction<boolean>>
}

export const NotificationsPopUpWindow = ({showNotificationsPopUpWindow, setShowNotificationsPopUpWindow}:NotificationsPopUpWindowProps) => {
    const styles = useNotificationsPopUpWindowStyles(showNotificationsPopUpWindow);
    const { notificationsList, notificationsCount } = useSocialData();

    return (
        <div style={styles.overlay}>
            <div style={styles.notificationsContainer}>
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>Notifications</h2>
                    {notificationsCount > 0 && (
                        <span style={styles.notificationBadge}>{notificationsCount}</span>
                    )}
                </div>
                
                <div style={styles.notificationsList}>
                    {notificationsCount > 0 ? (
                        (notificationsList as NotificationSchema[]).map((notification, index) => (
                            <div key={index} style={styles.notificationItem}>
                                <div style={styles.notificationHeader}>
                                    <h3 style={styles.title}>{notification.title}</h3>
                                    <span style={styles.timestamp}>{notification.created_at}</span>
                                </div>
                                <p style={styles.description}>{notification.description}</p>
                                <div style={styles.notificationDivider}></div>
                            </div>
                        ))
                    ) : (
                        <div style={styles.emptyState}>
                            <p style={styles.emptyText}>You're all caught up!</p>
                        </div>
                    )}
                </div>

                <button 
                    style={styles.hideWindowButton} 
                    onClick={() => {setShowNotificationsPopUpWindow(false);}}
                >
                    Close
                </button>
            </div>
        </div>
    );
};