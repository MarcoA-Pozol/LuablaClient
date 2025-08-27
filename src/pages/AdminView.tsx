import { FlashcardSchemasView } from "../components/AdminView/FlashcardSchemasView";
import { SchemasNavMenu } from "../components/AdminView/SchemasNavMenu";

export const AdminView = () => {

    return (
        <div>
            <SchemasNavMenu/>
            <FlashcardSchemasView/>
        </div>
    );
}