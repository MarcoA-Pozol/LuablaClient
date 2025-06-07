import { createContext, useState, useEffect, type SetStateAction, type ReactNode } from "react";
import axios from "axios";
import type { NotificationSchema } from "../schemas/Notification";
import { useBaseApiUrl } from "../hooks/useBaseApiUrl";

type SocialDataContextType = {
    notificationsList:NotificationSchema[];
    setNotificationsList:React.Dispatch<SetStateAction<NotificationSchema[]>>;
    notificationsCount:number;
    setNotificationsCount:React.Dispatch<SetStateAction<number>>;
    newNotificationsCount:number;
    setNewNotificationsCount:React.Dispatch<SetStateAction<number>>;
    fetchNotifications:() => void;
}

export const SocialDataContext = createContext<SocialDataContextType|undefined>(undefined);

interface SocialDataProviderProps {
    children:ReactNode;
}

const SocialDataProvider = ({children}:SocialDataProviderProps) => {
    const [notificationsList, setNotificationsList] = useState<NotificationSchema[]>([]);
    const [notificationsCount, setNotificationsCount] = useState<number>(0);
    const [newNotificationsCount, setNewNotificationsCount] = useState<number>(0);

    async function fetchNotifications() {
        const response = await axios.get(useBaseApiUrl("/social/notifications"), {
            withCredentials:true,
            headers:{
                "Content-Type":"application/json"
            }
        });

        if (response.status === 200) {
            setNotificationsList(response.data.notifications);
            setNotificationsCount(response.data.notifications_count);
            setNewNotificationsCount(response.data.new_notifications_count);
            console.log(response.data);
        } else if (response.status === 404) {
            setNotificationsList([]);
            setNotificationsCount(0);
        } else {
            setNotificationsList([]);
            setNotificationsCount(0);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, [])

    return (
        <SocialDataContext.Provider value={{ notificationsList, setNotificationsList, notificationsCount, setNotificationsCount, newNotificationsCount, setNewNotificationsCount, fetchNotifications}}>
            {children}
        </SocialDataContext.Provider>
    );
}

export default SocialDataProvider;
