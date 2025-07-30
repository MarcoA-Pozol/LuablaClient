import axios from "axios";
import type { SetStateAction } from "react";
import type React from "react";

export async function fetchNotificationsList(setNotificationsCount:React.Dispatch<SetStateAction<number>>, setNotificationsList:React.Dispatch<SetStateAction<object[]>>) {
    const response = await axios.get("http://localhost:8600/api/social/notifications", {
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
    }
}