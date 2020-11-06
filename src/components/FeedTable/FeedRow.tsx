import { Avatar, Typography, Hidden } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useFeed, fetchLatestAnswerStart, fetchLatestAnswerStop } from '~store';
import { Testable } from '~types';
import { formatPrice, formatDateDifference } from '~utils';

const Row = styled.div`
  height: 75px;
  border: 1px solid ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => `${theme.spacing(2)}px`};

  & > a {
    display: flex;
    height: 100%;
    align-items: center;
  }
`;

const CurrencyIcons = styled(AvatarGroup)`
  margin-right: ${({ theme }) => `${theme.spacing(2)}px`};

  & > div {
    border: none;
  }
`;

const Name = styled(Typography)`
  min-width: 150px;
  font-size: 1.2rem;
  flex: 1 0 auto;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const Values = styled.div`
  margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
  display: flex;

  & > p {
    text-align: left;
    display: inline-block;
    width: 200px;
  }

  @media (max-width: 600px) {
    flex-direction: column-reverse;
  }
`;

const LastUpdated = styled(Typography)`
  font-size: 1rem;
  color: ${({ theme }) => theme.palette.grey[500]};
`;

const Price = styled(Typography)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
`;

const Sponsors = styled(AvatarGroup)`
  width: 100px;
  margin-left: ${({ theme }) => `${theme.spacing(2)}px`};

  & > div {
    width: 20px;
    height: 20px;
    border: none;
  }
`;

const generateSponsorUrl = (sponsor: string) => {
  return `https://smartcontract.imgix.net/feeds/sponsors/${sponsor.toLowerCase()}_tn.png?auto=format`;
};

export const FeedRow = ({ id, 'data-testid': testId }: Testable & { id: string }) => {
  const [feed, dispatch] = useFeed(id);

  if (!feed) {
    // @TODO show something better here
    return <p>Something went wrong</p>;
  }

  const {
    name,
    path,
    contractAddress,
    sponsored,
    pair: [firstCurrency, secondCurrency],
  } = feed;

  useEffect(() => {
    dispatch(fetchLatestAnswerStart(contractAddress));

    return () => {
      // unsubscribe when we dismount
      dispatch(fetchLatestAnswerStop(contractAddress));
    };
  }, [contractAddress]);

  // useFeed (useContext) triggers the consumer again, so prevent re-rendering unless we need to
  return useMemo(
    () => (
      <Row data-testid={testId}>
        <Link
          to={`/${path}`}
          css={`
            text-decoration: none;
          `}
        >
          <Hidden smDown>
            <CurrencyIcons max={2}>
              <Avatar alt={firstCurrency} />
              <Avatar alt={secondCurrency} />
            </CurrencyIcons>
          </Hidden>

          <Name data-testid="feed-name">{name}</Name>

          <Values>
            <LastUpdated data-testid="feed-last-updated">
              {formatDateDifference(feed) || null}
            </LastUpdated>

            <Price data-testid="feed-price">{formatPrice(feed) || null}</Price>
          </Values>

          <Hidden smDown>
            <Sponsors max={4} spacing={-3}>
              {sponsored.map((sponsor) => (
                <Avatar key={sponsor} alt={sponsor} src={generateSponsorUrl(sponsor)} />
              ))}
            </Sponsors>
          </Hidden>
        </Link>
      </Row>
    ),
    [feed]
  );
};
