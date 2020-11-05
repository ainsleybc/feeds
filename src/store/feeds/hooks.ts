import { useContext, Dispatch } from 'react';
import { Action } from './actions';
import { store, State } from './Provider';
import { Feed } from '~types';

export const useFeeds = (): [State, Dispatch<Action>] => {
  const context = useContext(store);
  if (!context) {
    throw new Error('useFeeds must be used within a FeedsProvider');
  }
  return context;
};

export const useFeed = (id: string): [Feed | undefined, Dispatch<Action>] => {
  const [{ data }, dispatch] = useContext(store);
  if (!data) {
    throw new Error('useFeeds must be used within a FeedsProvider');
  }
  const feed = data.find(({ path }) => path === id);

  return [feed, dispatch];
};
