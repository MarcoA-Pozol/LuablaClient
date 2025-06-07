import { useSocialData } from "../../hooks/useSocialData";
import { useState, type SetStateAction, useEffect } from "react";
import { useNotificationsPopUpWindowStyles } from "../../styles/SocialView/notificationsPopUpWindow";
import { fetchAllNotifications } from "../../functions/fetchAllNotifications";
import { NotificationsFilter } from "./NotificationsFilter";
import type { NotificationSchema } from "../../schemas/Notification";
import { toggleNotificationReadStatus } from "../../functions/toggleNotificationReadStatus";
import { useTranslation } from "react-i18next";
import { timeAgo } from "../../functions/timeAgo";

interface NotificationsPopUpWindowProps {
    showNotificationsPopUpWindow:boolean;
    setShowNotificationsPopUpWindow:React.Dispatch<SetStateAction<boolean>>
}

export const NotificationsPopUpWindow = ({showNotificationsPopUpWindow, setShowNotificationsPopUpWindow}:NotificationsPopUpWindowProps) => {
    const styles = useNotificationsPopUpWindowStyles(showNotificationsPopUpWindow);
    const { notificationsList, notificationsCount, setNotificationsList, setNotificationsCount, newNotificationsCount } = useSocialData();
    const [filteredNotifications, setFilteredNotifications] = useState<NotificationSchema[]>(notificationsList);
    const { fetchNotifications } = useSocialData();
    const { t } = useTranslation();

    useEffect(() => {
        setFilteredNotifications(notificationsList);
    }, [notificationsList])

    return (
        <div style={styles.overlay}>
            <div style={styles.notificationsContainer}>
                <div style={styles.header}>
                    <h2 style={styles.headerTitle}>{t("Notifications")}</h2>
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
                                    <span style={styles.timestamp}>{t(notification.category_label)}</span>
                                    <span style={styles.timestamp}>{timeAgo(notification.created_at)}</span>
                                </div>
                                <p style={styles.description}>{notification.description}</p>
                                <div style={styles.notificationDivider}></div>
                                <button onClick={async() => {await toggleNotificationReadStatus(notification.id); fetchNotifications();}} style={notification.read_status === "Unread" ? styles.statusButton : styles.statusButtonUnread}>{notification.read_status === "Unread" ? t("Mark as read") : t("Mark as unread")}</button>
                            </div>
                        ))
                    ) : (
                        <div style={styles.emptyState}>
                            <p style={styles.emptyText}>{t("The are no news")}</p>
                        </div>
                    )}
                    
                    <button style={styles.hideWindowButton} onClick={() => {fetchAllNotifications(setNotificationsCount, setNotificationsList);}}>{t("Show all")}</button>
                </div>

                <button 
                    style={styles.hideWindowButton} 
                    onClick={() => {setShowNotificationsPopUpWindow(false);}}
                >
                    {t("Close")}
                </button>
            </div>
        </div>
    );
};