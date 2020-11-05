import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ScrollToTop, HomeButton } from '~components';
import { useFeed, fetchFeedsStart, fetchLatestAnswerStart, fetchLatestAnswerStop } from '~store';
import { formatDateDifference, formatPrice } from '~utils';

export const Feed = () => {
  const { address } = useParams<{ address: string }>();
  const [feed, dispatch] = useFeed(address);

  useEffect(() => {
    if (!feed) {
      dispatch(fetchFeedsStart());
    }
    dispatch(fetchLatestAnswerStart(address));

    // unsubscribe when we dismount
    return () => {
      dispatch(fetchLatestAnswerStop(address));
    };
  }, []);

  if (!feed) {
    // @TODO show something more useful
    return null;
  }

  const {
    heartbeat,
    threshold,
    pair: [firstCurrency, secondCurrency],
  } = feed;

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
