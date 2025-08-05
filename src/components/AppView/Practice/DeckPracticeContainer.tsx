import { useEffect, useState, type SetStateAction } from "react";
import { fetchDeckFlashcards } from "../../../functions/fetchDeckFlashcards";
import { useLanguages } from "../../../hooks/useLanguages";
import type { Flashcard } from "../../../schemas/Flashcard";
import "../../../styles/AppView/deckPracticeContainer.css";
import { shuffleArray } from "../../../utils/shuffleArray";

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
        setFlashcardsQueue(shuffleArray(data));
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

    const failedCard = currentCard; // Capture possible failedCard before currentCard state changes

    if (!isCorrect) { // Push failedCard to the list in case of wrong answer
      setFailedFlashcards(prev => [...prev, failedCard]);
    }

    const isLastCard = currentIndex + 1 >= flashcardsQueue.length;

    if (!isLastCard) {
      setCurrentIndex(prev => prev + 1);
    } else if (failedFlashcards.length > 0 || !isCorrect) {
      // Include the current failed card if it's the last one
      const updatedFailed = !isCorrect ? [...failedFlashcards, failedCard] : failedFlashcards;
      setFlashcardsQueue(shuffleArray(updatedFailed));
      setFailedFlashcards([]);
      setCurrentIndex(0);
    } else {
      alert("Congratulations!");
      setDisplayedContainer("learning");
    }

    setIsMeaningRevealed(false);
  };


  if (isLoading) return <div>Loading flashcards...</div>;
  if (!currentCard) return <div>No cards available</div>;

  return (
    <div className="practice-container">
      
      <div className="flashcard">
        <h3 className="word-display">{languageToLearn === "ZH" ? currentCard.hanzi : languageToLearn === "JP" ? currentCard.kana : languageToLearn === "KO" ? currentCard.hangul : languageToLearn === "RU" ? currentCard.cyrillic : currentCard.word}</h3>
        
        {/* Meaning Reveal */}
        {!isMeaningRevealed ? (
          <button onClick={handleReveal} className="reveal-button">
            Reveal
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
        {currentIndex + 1} of {flashcardsQueue.length}
        {failedFlashcards.length > 0 && (
          <span> | Retry cards: {failedFlashcards.length}</span>
        )}
      </div>
    </div>
  );
};