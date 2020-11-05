import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollToTop, HomeButton } from '~components';
import { useFeed, fetchFeedsStart, fetchLatestAnswerStart, fetchLatestAnswerStop } from '~store';
import { formatDateDifference, formatPrice } from '~utils';

export const Feed = () => {
  const { id } = useParams<{ id: string }>();
  const [feed, dispatch] = useFeed(id);

  useEffect(() => {
    if (!feed) {
      dispatch(fetchFeedsStart());
    }
  }, []);

  if (!feed) {
    // @TODO show something more useful
    return null;
  }

  const {
    contractAddress,
    heartbeat,
    threshold,
    pair: [firstCurrency, secondCurrency],
  } = feed;

  useEffect(() => {
    dispatch(fetchLatestAnswerStart(contractAddress));

    // unsubscribe when we dismount
    return () => {
      dispatch(fetchLatestAnswerStop(contractAddress));
    };
  }, [feed]);

  return (
    <>
      <ScrollToTop />
      <HomeButton />

      <div>{feed.name}</div>
      <div>{formatPrice(feed) || null}</div>
      <div>{formatDateDifference(feed) || null}</div>
      <div>{firstCurrency}</div>
      <div>{secondCurrency}</div>
      <div>{heartbeat}</div>
      <div>{threshold}</div>
    </>
  );
};
