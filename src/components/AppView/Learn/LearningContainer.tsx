import { GetUserDecks } from "./GetUserDecks";

interface LearningContainerProps {
    languageToStudy: string;
}

export const LearningContainer= ({languageToStudy}:LearningContainerProps) => {

    return (
        <>
            <GetUserDecks languageToStudy={languageToStudy}/>
            <h2>Here you can learn new words: {languageToStudy}</h2>
        </>
    );
}