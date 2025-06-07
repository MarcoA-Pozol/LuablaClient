import { PickLanguageForm } from "../components/Authentication/PickLanguageForm";
import { TopNavBarApp } from "../components/General/TopNavBarApp";
import { ModulesMenu } from "../components/Modules/ModulesMenu";
import { useAuth } from "../App";

export const ModulesView = () => {
    const { authUser } = useAuth();

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp authUser={authUser}/>
                    <ModulesMenu/>
                </div>
            ): (
                <div>
                    <PickLanguageForm/>
                </div>
            )}
        </>
    );
}