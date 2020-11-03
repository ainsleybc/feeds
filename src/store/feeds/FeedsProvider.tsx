import React, { useReducer, createContext, Dispatch } from 'react';
import { ActionTypes, Action, fetchFeedsSuccess, fetchFeedsFailed } from './Actions';
import { Feed } from '~types';

export type State = { loading: boolean; error: null | any; data: Array<Feed> };
type Context = [state: State, dispatch: Dispatch<Action>];

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FEEDS_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case ActionTypes.FETCH_FEEDS_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_FEEDS_FAILED:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

async function fetchFeeds(dispatch: Dispatch<Action>) {
  try {
    // @TODO - dummy data, replace with proper api call
    const { default: data } = await import('../testData.json');
    dispatch(fetchFeedsSuccess(data));
  } catch (e) {
    dispatch(fetchFeedsFailed(e));
  }
}

const customDispatch = (dispatchFn: Dispatch<Action>) => (action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FEEDS_START:
      return fetchFeeds(dispatchFn);
    default:
      dispatchFn(action);
  }
};

type Props = {
  initialState?: State;
};

const emptyState: State = { data: [], error: null, loading: false };

export const store = createContext({} as Context);

export const FeedsProvider: React.ElementType = ({
  initialState = emptyState,
  ...props
}: Props) => {
  const [state, dispatch] = useReducer(reducer, Object.assign(emptyState, initialState));

  return <store.Provider value={[state, customDispatch(dispatch)]} {...props} />;
};
