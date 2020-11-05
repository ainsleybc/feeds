import { Feed, LatestAnswer } from '~types';

export enum ActionTypes {
  FETCH_FEEDS_SUCCESS = 'FETCH_FEEDS_SUCCESS',
  FETCH_FEEDS_FAILED = 'FETCH_FEEDS_FAILED',
  FETCH_FEEDS_START = 'FETCH_FEEDS_START',
  FETCH_LATEST_ANSWER_START = 'FETCH_LATEST_ANSWER_START',
  FETCH_LATEST_ANSWER_STOP = 'FETCH_LATEST_ANSWER_STOP',
  FETCH_LATEST_ANSWER_SUCCESS = 'FETCH_LATEST_ANSWER_SUCCESS',
  FETCH_LATEST_ANSWER_FAILED = 'FETCH_LATEST_ANSWER_FAILED',
}

export type FetchFeedsStart = { type: ActionTypes.FETCH_FEEDS_START };
export type FetchFeedsSuccess = { type: ActionTypes.FETCH_FEEDS_SUCCESS; payload: Array<Feed> };
export type FetchFeedsFailed = { type: ActionTypes.FETCH_FEEDS_FAILED; payload: any };
export type FetchLatestAnswerStart = {
  type: ActionTypes.FETCH_LATEST_ANSWER_START;
  payload: string;
};
export type FetchLatestAnswerStop = { type: ActionTypes.FETCH_LATEST_ANSWER_STOP; payload: string };
export type FetchLatestAnswerSuccess = {
  type: ActionTypes.FETCH_LATEST_ANSWER_SUCCESS;
  payload: { address: string; answer: LatestAnswer };
};
export type FetchLatestAnswerFailed = {
  type: ActionTypes.FETCH_LATEST_ANSWER_FAILED;
  payload: any;
};

export type Action =
  | FetchFeedsStart
  | FetchFeedsSuccess
  | FetchFeedsFailed
  | FetchLatestAnswerStart
  | FetchLatestAnswerStop
  | FetchLatestAnswerSuccess
  | FetchLatestAnswerFailed;

export const fetchFeedsStart = (): FetchFeedsStart => ({
  type: ActionTypes.FETCH_FEEDS_START,
});

export const fetchFeedsFailed = (error: any): FetchFeedsFailed => ({
  type: ActionTypes.FETCH_FEEDS_FAILED,
  payload: error,
});

export const fetchFeedsSuccess = (feeds: Array<Feed>): FetchFeedsSuccess => ({
  type: ActionTypes.FETCH_FEEDS_SUCCESS,
  payload: feeds,
});

export const fetchLatestAnswerStart = (address: string): FetchLatestAnswerStart => ({
  type: ActionTypes.FETCH_LATEST_ANSWER_START,
  payload: address,
});

export const fetchLatestAnswerStop = (address: string): FetchLatestAnswerStop => ({
  type: ActionTypes.FETCH_LATEST_ANSWER_STOP,
  payload: address,
});

export const fetchLatestAnswerSuccess = (
  address: string,
  answer: LatestAnswer
): FetchLatestAnswerSuccess => ({
  type: ActionTypes.FETCH_LATEST_ANSWER_SUCCESS,
  payload: {
    address,
    answer,
  },
});

export const fetchLatestAnswerFailed = (error: any): FetchLatestAnswerFailed => ({
  type: ActionTypes.FETCH_LATEST_ANSWER_FAILED,
  payload: error,
});
