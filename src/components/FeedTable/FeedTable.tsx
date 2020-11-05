import { Container, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { FeedRow } from './FeedRow';
import { useFeeds, fetchFeedsStart } from '~store';
import { Testable } from '~types';

const Wrapper = styled(Container)`
  max-width: 1920px;

  @media (max-width: 600px) {
    padding: 0;
  }
`;

const Table = styled(Paper)`
  min-height: 800px;
  overflow: hidden;

  @media (max-width: 600px) {
    border-radius: 0;
  }
`;

export const FeedTable = ({ 'data-testid': testId }: Testable) => {
  const [{ data }, dispatch] = useFeeds();

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchFeedsStart());
    }
  }, [data]);

  return (
    <Wrapper data-testid={testId} maxWidth="xl">
      <Table elevation={2} variant="outlined" data-testid="feeds-list-wrapper">
        {data.map(({ path }) => (
          <FeedRow id={path} key={path} />
        ))}
      </Table>
    </Wrapper>
  );
};
