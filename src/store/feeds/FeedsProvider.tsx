import React, { useReducer, createContext, Dispatch } from 'react';
import { AjaxResponse } from 'rxjs/ajax';
import { ActionTypes, Action, fetchFeedsSuccess, fetchFeedsFailed } from './Actions';
import { get } from '~services';
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
  const url = 'https://weiwatchers.com/feeds-mainnet.json';
  get({ url }).subscribe(
    ({ response }: AjaxResponse) => dispatch(fetchFeedsSuccess(response)),
    (err: AjaxResponse) => dispatch(fetchFeedsFailed(err))
  );
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
