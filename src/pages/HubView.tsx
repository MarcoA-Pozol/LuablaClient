import { TopNavBarApp } from "../components/General/TopNavBarApp";
import { useAuth } from "../App";

export const HubView = () => {
    const { authUser } = useAuth();

    return (
        <>
            <TopNavBarApp authUser={authUser}/>
            This is the hub
        </>
    );
}