import { createContext, useState, useEffect, type SetStateAction, type ReactNode } from "react";
import { fetchNotificationsList } from "../functions/fetchNotificationsList";

type SocialDataContextType = {
    notificationsList:object[];
    setNotificationsList:React.Dispatch<SetStateAction<object[]>>;
    notificationsCount:number;
    setNotificationsCount:React.Dispatch<SetStateAction<number>>;
}

export const SocialDataContext = createContext<SocialDataContextType|undefined>(undefined);

interface SocialDataProviderProps {
    children:ReactNode;
}

const SocialDataProvider = ({children}:SocialDataProviderProps) => {
    const [notificationsList, setNotificationsList] = useState<object[]>([]);
    const [notificationsCount, setNotificationsCount] = useState<number>(0);

    useEffect(() => {
        fetchNotificationsList(setNotificationsCount, setNotificationsList, notificationsList);
    }, [])

    return (
        <SocialDataContext.Provider value={{ notificationsList, setNotificationsList, notificationsCount, setNotificationsCount }}>
            {children}
        </SocialDataContext.Provider>
    );
}

export default SocialDataProvider;
