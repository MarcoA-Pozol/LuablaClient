import { useEffect, useState, type SetStateAction } from "react";
import { fetchDeckFlashcards } from "../../../functions/fetchDeckFlashcards";
import { useLanguages } from "../../../hooks/useLanguages";
import type { Flashcard } from "../../../schemas/Flashcard";
import "../../../styles/AppView/deckPracticeContainer.css";

interface DeckPracticeContainerProps {
  deckId: number;
  setDisplayedContainer:React.Dispatch<SetStateAction<string>>;
}

export const DeckPracticeContainer = ({ deckId, setDisplayedContainer }: DeckPracticeContainerProps) => {
  const { languageToLearn } = useLanguages();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flashcardsQueue, setFlashcardsQueue] = useState<Flashcard[]>([]);
  const [failedFlashcards, setFailedFlashcards] = useState<Flashcard[]>([]);
  const [isMeaningRevealed, setIsMeaningRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Derived state for current card
  const currentCard = flashcardsQueue[currentIndex];

  // Fetch flashcards on component mount
  useEffect(() => {
    const loadFlashcards = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDeckFlashcards(deckId, languageToLearn);
        setFlashcardsQueue(data);
      } catch (error) {
        console.error("Failed to fetch flashcards:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFlashcards();
  }, [deckId, languageToLearn]);

  const handleReveal = () => {
    setIsMeaningRevealed(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (!currentCard) return;
    
    if (!isCorrect) {
      setFailedFlashcards(prev => [...prev, currentCard]);
    }

    // Move to next card
    if (currentIndex + 1 < flashcardsQueue.length) {
      setCurrentIndex(prev => prev + 1);
    } 
    // Process failed cards at end
    else if (failedFlashcards.length > 0) {
      setFlashcardsQueue(failedFlashcards);
      setFailedFlashcards([]);
      setCurrentIndex(0);
    } 
    // Practice complete management
    else {
      alert("Congratulations!");
      setDisplayedContainer("learning");
    }
    
    setIsMeaningRevealed(false);
  };

  if (isLoading) return <div>Loading flashcards...</div>;
  if (!currentCard) return <div>No cards available</div>;

  return (
    <div className="practice-container">
      <h2>Practice Session</h2>
      
      <div className="flashcard">
        {/* Word Display */}
        <div className="word-display">
          {languageToLearn === "ZH" ? currentCard.hanzi : languageToLearn === "JP" ? currentCard.kana : languageToLearn === "KO" ? currentCard.hangul : languageToLearn === "RU" ? currentCard.cyrillic : currentCard.word}
        </div>
        
        {/* Meaning Reveal */}
        {!isMeaningRevealed ? (
          <button onClick={handleReveal} className="reveal-button">
            Show Meaning
          </button>
        ) : (
          <div className="meaning-section">
            {languageToLearn === "ZH" && currentCard.pinyin !== "" && <p><strong>Pinyin:</strong> {currentCard.pinyin}</p>}
            {languageToLearn === "JP" && currentCard.kanji !== "" && <p><strong>Kanji:</strong> {currentCard.kanji}</p>}
            {languageToLearn === "JP" && currentCard.romaji !== "" && <p><strong>Romaji:</strong> {currentCard.romaji}</p>}
            {languageToLearn === "KO" && currentCard.romaji !== "" && <p><strong>Romaji:</strong> {currentCard.romaji}</p>}
            {languageToLearn === "RU" && currentCard.transliteration !== "" && <p><strong>Transliteration:</strong> {currentCard.transliteration}</p>}
            <p><strong>Meaning:</strong> {currentCard.meaning}</p>
            {currentCard.example_phrase && (
              <p><strong>Example:</strong> {currentCard.example_phrase}</p>
            )}
          </div>
        )}
        
        {/* Answer Buttons (only visible after reveal) */}
        {isMeaningRevealed && (
          <div className="answer-buttons">
            <button 
              onClick={() => handleAnswer(false)} 
              className="incorrect-button"
            >
              ✗ Incorrect
            </button>
            <button 
              onClick={() => handleAnswer(true)} 
              className="correct-button"
            >
              ✓ Correct
            </button>
          </div>
        )}
      </div>
      
      <div className="progress">
        Card {currentIndex + 1} of {flashcardsQueue.length}
        {failedFlashcards.length > 0 && (
          <span> | Retry cards: {failedFlashcards.length}</span>
        )}
      </div>
    </div>
  );
};