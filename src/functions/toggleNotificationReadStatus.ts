import axios from "axios"
import { useBaseApiUrl } from "../hooks/useBaseApiUrl"

export const toggleNotificationReadStatus = async (notificationId:number) => {
    const endpoint = useBaseApiUrl("/social/notifications/toggleReadStatus");

    const response = await axios.patch(endpoint, {notificationId:notificationId}, {withCredentials:true});

    if (response.status !== 200) {
        alert("Error during toggling notification's readStatus")
    }
}
