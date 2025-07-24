import { createContext, useState, useEffect, type SetStateAction, type ReactNode } from "react";
import axios from "axios";

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

export const SocialDataProvider = ({children}:SocialDataProviderProps) => {
    const [notificationsList, setNotificationsList] = useState<object[]>([]);
    const [notificationsCount, setNotificationsCount] = useState<number>(0);

    useEffect(() => {
        async function fetchNotificationsList() {
            const response = await axios.get("http://localhost:8600/api/social/notifications", {headers:{
                "Content-Type":"application/json"
            }, withCredentials:true});
            if (response.status === 200) {
                setNotificationsList(response.data.notifications);
                setNotificationsCount(notificationsList.length);
            } else {
                alert("Error during fetching notifications list");
            }
        }
        fetchNotificationsList();
    }, [])

    return (
        <SocialDataContext.Provider value={{ notificationsList, setNotificationsList, notificationsCount, setNotificationsCount }}>
            {children}
        </SocialDataContext.Provider>
    );
}
