import { PickLanguageForm } from "../components/AuthView/PickLanguageForm";
import { TopNavBarApp } from "../components/AppView/TopNavBarApp";
import { ModulesMenu } from "../components/ModulesView/ModulesMenu";
import { useAuth } from "../App";
import { useState } from "react";

export const ModulesView = () => {
    const styles = {
        title: {
            textAlign: "center" as const,
            gap: '20px',
            padding: '20px'
        },
    }

    const { authUser } = useAuth();
    const [deployedModule, setDeployedModule] = useState<string | null>(null);

    return (
        <>
            { authUser.has_picked_language ? (
                <div>
                    <TopNavBarApp authUser={authUser}/>
                    <ModulesMenu setDeployedModule={setDeployedModule} />
                </div>
            ): (
                <div>
                    <PickLanguageForm/>
                </div>
            )}
        </>
    );
}