// useDecks.ts
import { useContext } from 'react';
import { DecksListsContext } from '../contexts/DecksListsContext';

export const useDecksLists = () => {
  const context = useContext(DecksListsContext);
  if (!context) throw new Error("useDecksLists must be used within a DeckListsContext provider");
  return context;
};
