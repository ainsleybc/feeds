import { useContext } from 'react';
import { store } from './FeedsProvider';

export const useFeeds = () => {
  const context = useContext(store);
  if (!context) {
    throw new Error('useFeeds must be used within a FeedsProvider');
  }
  return context;
};
