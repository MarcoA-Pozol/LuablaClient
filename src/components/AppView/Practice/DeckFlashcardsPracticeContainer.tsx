interface DeckFlashcardsPracticeContainerProps {
    deckToPracticeFlashcardsList: object[];
}

export const DeckFlashcardsPracticeContainer = ({deckToPracticeFlashcardsList}:DeckFlashcardsPracticeContainerProps) => {

    return (
        <div>
            Here is where you can practice your words from your deck:
            <ul>
                {deckToPracticeFlashcardsList.map((item, idx) => (
                    <li key={idx}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
}