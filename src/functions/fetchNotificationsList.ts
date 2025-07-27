import axios from "axios";
import type { SetStateAction } from "react";
import type React from "react";

export async function fetchNotificationsList(setNotificationsCount:React.Dispatch<SetStateAction<number>>, setNotificationsList:React.Dispatch<SetStateAction<object[]>>, notificationsList:object[]) {
    const response = await axios.get("http://localhost:8600/api/social/notifications", {headers:{
        "Content-Type":"application/json"
    }, withCredentials:true});
    if (response.status === 200) {
        setNotificationsList(response.data.notifications);
        setNotificationsCount(notificationsList.length);
    } else if (response.status === 404) {
        setNotificationsList([]);
        setNotificationsCount(0);
    } else {
        alert("Error during fetching notifications list");
    }
}