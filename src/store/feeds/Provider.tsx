import React, { useReducer, createContext, Dispatch, ElementType } from 'react';
import { Subscription } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import {
  ActionTypes,
  Action,
  fetchFeedsSuccess,
  fetchFeedsFailed,
  fetchLatestAnswerSuccess,
  fetchLatestAnswerFailed,
} from './actions';
import { config } from '~config';
import { get, latestAnswer } from '~services';
import { Feed, LatestAnswer } from '~types';

export type State = { loading: boolean; error: null | any; data: Array<Feed> };
type Context = [state: State, dispatch: Dispatch<Action>];

const fetchFeeds = async (dispatch: Dispatch<Action>) => {
  const { weiWatchersUrl } = config;
  get({ url: weiWatchersUrl }).subscribe(
    ({ response }: AjaxResponse) => dispatch(fetchFeedsSuccess(response)),
    (err: AjaxResponse) => dispatch(fetchFeedsFailed(err))
  );
};

const subscribeLatestAnswer = (address: string, dispatch: Dispatch<Action>) => {
  return latestAnswer(address).subscribe(
    (data: LatestAnswer) => dispatch(fetchLatestAnswerSuccess(address, data)),
    (err: any) => dispatch(fetchLatestAnswerFailed(err))
  );
};

type UpdateFeed = (payload: { address: string; answer: LatestAnswer }, state: State) => State;
const updateFeed: UpdateFeed = ({ address, answer }, state: State) => {
  const index = state.data.findIndex(({ contractAddress }) => address === contractAddress);

  // We'll use the spread operator to avoid mapping through the whole list
  return {
    ...state,
    data: [
      ...state.data.slice(0, index),
      {
        ...state.data[index],
        price: answer.price,
        lastUpdated: answer.updatedAt,
      },
      ...state.data.slice(index + 1),
    ],
  };
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.FETCH_FEEDS_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload };
    case ActionTypes.FETCH_FEEDS_START:
      return { ...state, loading: true, error: null };
    case ActionTypes.FETCH_FEEDS_FAILED:
      return { ...state, loading: false, error: action.payload };
    case ActionTypes.FETCH_LATEST_ANSWER_SUCCESS:
      return updateFeed(action.payload, state);
    // @TODO do something with these events
    case ActionTypes.FETCH_LATEST_ANSWER_START:
    case ActionTypes.FETCH_LATEST_ANSWER_STOP:
    case ActionTypes.FETCH_LATEST_ANSWER_FAILED:
    default:
      return state;
  }
};

// Wrap dispatch in a custom function so we can perform our side effects neatly
const customDispatch = (dispatchFn: Dispatch<Action>) => {
  // Store subscribed events that can be cancelled later
  const subscriptions: Array<{ address: string; subscription: Subscription }> = [];

  return (action: Action) => {
    switch (action.type) {
      case ActionTypes.FETCH_FEEDS_START:
        return fetchFeeds(dispatchFn);
      case ActionTypes.FETCH_LATEST_ANSWER_START:
        const subscription = subscribeLatestAnswer(action.payload, dispatchFn);
        return subscriptions.push({
          address: action.payload,
          subscription,
        });
      case ActionTypes.FETCH_LATEST_ANSWER_STOP:
        return subscriptions
          .find(({ address }) => address === action.payload)
          ?.subscription.unsubscribe();
      default:
        return dispatchFn(action);
    }
  };
};

type Props = {
  initialState?: State;
};

const emptyState: State = { data: [], error: null, loading: false };

export const store = createContext({} as Context);

export const FeedsProvider: ElementType = ({ initialState = emptyState, ...props }: Props) => {
  const [state, dispatch] = useReducer(reducer, Object.assign(emptyState, initialState));

  return <store.Provider value={[state, customDispatch(dispatch)]} {...props} />;
};
