import { Feed } from '~types';

export enum ActionTypes {
  FETCH_FEEDS_SUCCESS = 'FETCH_FEEDS_SUCCESS',
  FETCH_FEEDS_FAILED = 'FETCH_FEEDS_FAILED',
  FETCH_FEEDS_START = 'FETCH_FEEDS_START',
}

export type FetchFeedsStart = { type: ActionTypes.FETCH_FEEDS_START };
export type FetchFeedsSuccess = { type: ActionTypes.FETCH_FEEDS_SUCCESS; payload: Array<Feed> };
export type FetchFeedsFailed = { type: ActionTypes.FETCH_FEEDS_FAILED; payload: any };
export type Action = FetchFeedsStart | FetchFeedsSuccess | FetchFeedsFailed;

export const fetchFeedsStart = (): FetchFeedsStart => ({ type: ActionTypes.FETCH_FEEDS_START });

export const fetchFeedsFailed = (error: any) => ({
  type: ActionTypes.FETCH_FEEDS_FAILED,
  payload: error,
});

export const fetchFeedsSuccess = (data: Array<Feed>) => ({
  type: ActionTypes.FETCH_FEEDS_SUCCESS,
  payload: data,
});
