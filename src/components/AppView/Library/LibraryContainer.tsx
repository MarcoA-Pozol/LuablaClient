interface LibraryContainerProps {
    languageToStudy: string;
}

export const LibraryContainer= ({languageToStudy}:LibraryContainerProps) => {

    return (
        <>
            <h2>Find out more decks, cards or articles: {languageToStudy}</h2>
        </>
    );
}