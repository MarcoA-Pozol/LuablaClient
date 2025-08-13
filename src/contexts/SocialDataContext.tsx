import { createContext, useState, useEffect, type SetStateAction, type ReactNode } from "react";
import { fetchNotificationsList } from "../functions/fetchNotificationsList";
import type { NotificationSchema } from "../schemas/Notification";

type SocialDataContextType = {
    notificationsList:NotificationSchema[];
    setNotificationsList:React.Dispatch<SetStateAction<NotificationSchema[]>>;
    notificationsCount:number;
    setNotificationsCount:React.Dispatch<SetStateAction<number>>;
    newNotificationsCount:number;
    setNewNotificationsCount:React.Dispatch<SetStateAction<number>>;
}

export const SocialDataContext = createContext<SocialDataContextType|undefined>(undefined);

interface SocialDataProviderProps {
    children:ReactNode;
}

const SocialDataProvider = ({children}:SocialDataProviderProps) => {
    const [notificationsList, setNotificationsList] = useState<NotificationSchema[]>([]);
    const [notificationsCount, setNotificationsCount] = useState<number>(0);
    const [newNotificationsCount, setNewNotificationsCount] = useState<number>(0);

    useEffect(() => {
        fetchNotificationsList(setNotificationsCount, setNotificationsList, setNewNotificationsCount);
    }, [])

    return (
        <SocialDataContext.Provider value={{ notificationsList, setNotificationsList, notificationsCount, setNotificationsCount, newNotificationsCount, setNewNotificationsCount}}>
            {children}
        </SocialDataContext.Provider>
    );
}

export default SocialDataProvider;
