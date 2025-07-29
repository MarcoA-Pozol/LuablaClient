import { useSocialData } from "../../hooks/useSocialData";
import { type SetStateAction } from "react";
import { useNotificationsPopUpWindowStyles } from "../../styles/SocialView/notificationsPopUpWindow";

type NotificationSchema = {
    title: string;
    description: string;
};

interface NotificationsPopUpWindowProps {
    showNotificationsPopUpWindow:boolean;
    setShowNotificationsPopUpWindow:React.Dispatch<SetStateAction<boolean>>
}

export const NotificationsPopUpWindow = ({showNotificationsPopUpWindow, setShowNotificationsPopUpWindow}:NotificationsPopUpWindowProps) => {
    const styles = useNotificationsPopUpWindowStyles(showNotificationsPopUpWindow);
    const { notificationsList, notificationsCount } = useSocialData();

    return (
        <div style={styles.notificationsContainer}>
            {notificationsCount > 0 ? (
                (notificationsList as NotificationSchema[]).map((notification) => (
                    <div>
                        <h2 style={styles.title}>{notification.title}</h2>
                        <p style={styles.description}>{notification.description}</p>
                    </div>
                ))
            ) : (
                <p>There are no notifications</p>
            )}

            <button onClick={() => {setShowNotificationsPopUpWindow(false);}}>Close</button>
        </div>
    );
}