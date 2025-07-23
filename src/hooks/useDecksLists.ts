// useDecks.ts
import { useContext } from 'react';
import { DecksListsContext } from '../contexts/DecksListsContext';

export const useDecksLists = () => {
  const context = useContext(DecksListsContext);
  if (!context) throw new Error('useDecks must be used within a DeckListsContext provider');
  return context;
};
