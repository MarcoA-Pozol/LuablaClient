import axios from "axios";
import type { SetStateAction } from "react";
import type React from "react";
import type { NotificationSchema } from "../schemas/Notification";

export async function fetchAllNotifications(setNotificationsCount:React.Dispatch<SetStateAction<number>>, setNotificationsList:React.Dispatch<SetStateAction<NotificationSchema[]>>) {
    const response = await axios.get("http://localhost:8600/api/social/notifications/all", {
        withCredentials:true,
        headers:{
            "Content-Type":"application/json"
        }
    });

    if (response.status === 200) {
        setNotificationsList(response.data.notifications);
        setNotificationsCount(response.data.notifications_count);
    } else if (response.status === 404) {
        setNotificationsList([]);
        setNotificationsCount(0);
    } else {
        setNotificationsList([]);
        setNotificationsCount(0);
    }
}