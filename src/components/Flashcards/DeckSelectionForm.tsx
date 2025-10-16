import { useState, type SetStateAction } from "react";
import { DeckCreationForm } from "./DeckCreationForm";
import "../../styles/AppView/deckSelectionForm.css";
import { useDecksLists } from "../../hooks/useDecksLists";
import { useDeckSelectionFormStyles } from "../../styles/AppView/deckSelectionForm";
import { useTranslation } from "react-i18next";
import { useDefaultDeckImagePath } from "../../hooks/useBaseMediaUrl";
import { useLanguages } from "../../hooks/useLanguages";

interface DeckSelectionFormProps {
  selectedDeck:any;
  setSelectedDeck:React.Dispatch<SetStateAction<any>>;
}
export const DeckSelectionForm = ({selectedDeck, setSelectedDeck}:DeckSelectionFormProps) => {
  const { t } = useTranslation();
  const {userDecksList} = useDecksLists();
  const decks = userDecksList;
  const [showCreateForm, setShowCreateForm] = useState(false);
  const styles = useDeckSelectionFormStyles();
  const {languageToLearn} = useLanguages();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>{t("Choose a Deck")}</h2>

      {decks.length < 1 ? (
        <div style={styles.noDecksContainer}>
          <p style={styles.text}>{t("You don't have any decks yet")}.</p>
          <button style={styles.button} onClick={() => setShowCreateForm(true)}>+ {t("Create New Deck")}</button>
        </div>
      ) : (
        <>
          <div style={styles.decksList}>
            {decks.map((deck) => (
              <div onClick={() => {setSelectedDeck(deck.id)}} key={deck.id} style={styles.deckItem} className={selectedDeck === deck.id ? "selected-deck" : ""}>
                <img src={deck.image ? (`http://localhost:8600${deck.image}`) : (useDefaultDeckImagePath(languageToLearn))} alt={deck.title} style={styles.deckImage} />
                <span style={styles.deckName}>{deck.title}</span>
              </div>
            ))}
          </div>

          <div style={styles.createMore}>
            <button style={styles.button} onClick={() => setShowCreateForm(true)}>+ {t("Create Another Deck")}</button>
          </div>
        </>
      )}

      <DeckCreationForm showCreateForm={showCreateForm} setShowCreateForm={setShowCreateForm}/>
    </div>
  );
};