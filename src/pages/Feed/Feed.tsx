import { Container, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ScrollToTop, HomeButton } from '~components';
import { useFeed, fetchFeedsStart, fetchLatestAnswerStart, fetchLatestAnswerStop } from '~store';
import { formatDateDifference, formatPrettyDate, formatPrice } from '~utils';

const Wrapper = styled(Container)`
  padding-top: ${({ theme }) => `${theme.spacing(6)}px`};
`;

export const Feed = () => {
  const { id } = useParams<{ id: string }>();
  const [feed, dispatch] = useFeed(id);

  useEffect(() => {
    if (!feed?.contractAddress) {
      return dispatch(fetchFeedsStart());
    }
    dispatch(fetchLatestAnswerStart(contractAddress));

    // unsubscribe when we dismount
    return () => {
      dispatch(fetchLatestAnswerStop(contractAddress));
    };
  }, [feed?.contractAddress]);

  if (!feed) {
    // @TODO show something more useful
    return null;
  }

  const { contractAddress, heartbeat, threshold } = feed;

  return (
    <Wrapper maxWidth="xl">
      <ScrollToTop />
      <HomeButton />

      <Wrapper maxWidth="xl" disableGutters>
        <Typography>{feed.name} aggregation</Typography>
        <Typography>Latest and trusted answer: {formatPrice(feed) || null}</Typography>
        <Typography>
          Last updated {formatDateDifference(feed)} on {formatPrettyDate(feed)}
        </Typography>
        <Typography>Heartbeat: {heartbeat}</Typography>
        <Typography>Deviation threshold: {threshold}%</Typography>
      </Wrapper>
    </Wrapper>
  );
};
