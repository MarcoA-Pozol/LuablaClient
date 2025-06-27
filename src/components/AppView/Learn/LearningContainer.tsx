interface LearningContainerProps {
    languageToStudy: string;
}

export const LearningContainer= ({languageToStudy}:LearningContainerProps) => {

    return (
        <>
            <h2>Here you can learn new words: {languageToStudy}</h2>
        </>
    );
}