import { Container, Paper, Typography, Hidden } from '@material-ui/core';
import React, { useEffect, useMemo } from 'react';
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

const TableHeader = styled.div`
  padding: ${({ theme }) => `${theme.spacing(2)}px`};
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  & > p {
    font-size: 1.3rem;
  }

  & > p:first-child {
    flex: 1 0 auto;
  }
`;

const Current = styled(Typography)`
  width: 200px;
`;

const Sponsored = styled(Typography)`
  width: 100px;
`;

export const FeedTable = ({ 'data-testid': testId }: Testable) => {
  const [{ data }, dispatch] = useFeeds();

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchFeedsStart());
    }
  }, [data]);

  // useFeeds (useContext) triggers the consumer again, so prevent re-rendering unless we need to
  return useMemo(
    () => (
      <Wrapper data-testid={testId} maxWidth="xl">
        <Table elevation={2} variant="outlined" data-testid="feeds-table-wrapper">
          <TableHeader>
            <Typography>Currency Pair</Typography>
            <Current>Last Updated</Current>
            <Current>Price</Current>
            <Hidden smDown>
              <Sponsored>Sponsors</Sponsored>
            </Hidden>
          </TableHeader>
          {data.map(({ path }) => (
            <FeedRow id={path} key={path} data-testid={`feeds-table:${path}`} />
          ))}
        </Table>
      </Wrapper>
    ),
    [data]
  );
};
