import { useSocialData } from "../../hooks/useSocialData";
import { useState, type SetStateAction, useEffect } from "react";
import { useNotificationsPopUpWindowStyles } from "../../styles/SocialView/notificationsPopUpWindow";
import { format } from "date-fns";
import { fetchAllNotifications } from "../../functions/fetchAllNotifications";
import { NotificationsFilter } from "./NotificationsFilter";
import type { NotificationSchema } from "../../schemas/Notification";
import { toggleNotificationReadStatus } from "../../functions/toggleNotificationReadStatus";

interface NotificationsPopUpWindowProps {
    showNotificationsPopUpWindow:boolean;
    setShowNotificationsPopUpWindow:React.Dispatch<SetStateAction<boolean>>
}

export const NotificationsPopUpWindow = ({showNotificationsPopUpWindow, setShowNotificationsPopUpWindow}:NotificationsPopUpWindowProps) => {
    const styles = useNotificationsPopUpWindowStyles(showNotificationsPopUpWindow);
    const { notificationsList, notificationsCount, setNotificationsList, setNotificationsCount, newNotificationsCount } = useSocialData();
    const [filteredNotifications, setFilteredNotifications] = useState<NotificationSchema[]>(notificationsList);
    const { fetchNotifications } = useSocialData();
    

    useEffect(() => {
        setFilteredNotifications(notificationsList);
    }, [notificationsList])

    return (
        <div style={styles.overlay}>
            <div style={styles.notificationsContainer}>
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>Notifications</h2>
                    {newNotificationsCount > 0 ? (
                        <span style={styles.notificationBadge}>{newNotificationsCount}</span>
                    ) : 0}
                </div>
                
                <NotificationsFilter setFilteredNotifications={setFilteredNotifications} notificationsList={notificationsList}/>
                
                <div style={styles.notificationsList}>
                    {notificationsCount > 0 ? (
                        (filteredNotifications).map((notification, index) => (
                            <div key={index} style={styles.notificationItem}>
                                <div style={styles.notificationHeader}>
                                    <h3 style={styles.title}>{notification.title}</h3>
                                    <span style={styles.timestamp}>{notification.category_label}</span>
                                    <span style={styles.timestamp}>{format(new Date(notification.created_at), "MMM dd, yyyy hh:mm a")}</span>
                                </div>
                                <p style={styles.description}>{notification.description}</p>
                                <div style={styles.notificationDivider}></div>
                                <button onClick={async() => {await toggleNotificationReadStatus(notification.id); fetchNotifications();}} style={{color:"white", backgroundColor:notification.read_status === "Unread" ? "blue" : "darkgray"}}>{notification.read_status === "Unread" ? "Mark as read" : "Mark as unread"}</button>
                            </div>
                        ))
                    ) : (
                        <div style={styles.emptyState}>
                            <p style={styles.emptyText}>Nothing new to be aware about.</p>
                        </div>
                    )}
                    
                    <button style={styles.hideWindowButton} onClick={() => {fetchAllNotifications(setNotificationsCount, setNotificationsList);}}>Show all</button>
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