import { Container, Paper } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Feed } from './Feed';
import { useFeeds, fetchFeedsStart } from '~store';
import { Testable } from '~types';

const Wrapper = styled.div`
  position: relative;
  padding-top: ${({ theme }) => `${theme.spacing(2)}px`};

  &::before {
    content: ' ';
    height: 200px;
    width: 100%;
    background-color: ${({ theme }) => theme.palette.primary.main};
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
`;

export const FeedList = ({ 'data-testid': testId }: Testable) => {
  const [{ data }, dispatch] = useFeeds();

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchFeedsStart());
    }
  }, [data]);

  return (
    <Wrapper data-testid={testId}>
      <Container maxWidth="xl">
        <Paper
          elevation={2}
          variant="outlined"
          data-testid="feeds-list-wrapper"
          css={`
            min-height: 800px;
            overflow: hidden;
          `}
        >
          {data.map((feed) => (
            <Feed address={feed.contractAddress} key={feed.contractAddress} />
          ))}
        </Paper>
      </Container>
    </Wrapper>
  );
};
