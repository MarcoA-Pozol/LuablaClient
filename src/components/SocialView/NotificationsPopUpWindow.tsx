import { useSocialData } from "../../hooks/useSocialData";
import { type SetStateAction } from "react";

type NotificationSchema = {
    title: string;
    description: string;
};

interface NotificationsPopUpWindowProps {
    showNotificationsPopUpWindow:boolean;
    setShowNotificationsPopUpWindow:React.Dispatch<SetStateAction<boolean>>
}

export const NotificationsPopUpWindow = ({showNotificationsPopUpWindow, setShowNotificationsPopUpWindow}:NotificationsPopUpWindowProps) => {
    const { notificationsList, notificationsCount } = useSocialData();

    return (
        <div style={{ display: showNotificationsPopUpWindow ? "block" : "none" }}>
            {notificationsCount > 0 ? (
                (notificationsList as NotificationSchema[]).map((notification) => (
                    <div>
                        <h2>{notification.title}</h2>
                        <p>{notification.description}</p>
                    </div>
                ))
            ) : (
                <p>There are no notifications</p>
            )}

            <button onClick={() => {setShowNotificationsPopUpWindow(false);}}>Close</button>
        </div>
    );
}