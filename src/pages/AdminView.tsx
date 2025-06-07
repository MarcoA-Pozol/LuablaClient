import { FlashcardSchemasView } from "../components/Admin/FlashcardSchemasView";
import { SchemasNavMenu } from "../components/Admin/SchemasNavMenu";

export const AdminView = () => {

    return (
        <div>
            <SchemasNavMenu/>
            <FlashcardSchemasView/>
        </div>
    );
}