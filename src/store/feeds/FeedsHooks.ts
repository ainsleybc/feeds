import { useContext, Dispatch } from 'react';
import { Action } from './FeedsActions';
import { store } from './FeedsProvider';
import { Feed } from '~types';

export const useFeeds = () => {
  const context = useContext(store);
  if (!context) {
    throw new Error('useFeeds must be used within a FeedsProvider');
  }
  return context;
};

export const useFeed = (address: string): [Feed | undefined, Dispatch<Action>] => {
  const [{ data }, dispatch] = useContext(store);
  if (!data) {
    throw new Error('useFeeds must be used within a FeedsProvider');
  }
  const feed = data.find(({ contractAddress }) => contractAddress === address);

  return [feed, dispatch];
};
