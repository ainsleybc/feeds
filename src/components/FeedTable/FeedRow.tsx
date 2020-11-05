import { Avatar, Typography, Hidden } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useFeed, fetchLatestAnswerStart, fetchLatestAnswerStop } from '~store';
import { formatPrice, formatDateDifference } from '~utils';

const Row = styled.div`
  height: 75px;
  border: 1px solid ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => `${theme.spacing(2)}px`};

  & > a {
    display: flex;
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
  font-size: 1.2rem;
  flex: 1 0 auto;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const Price = styled(Typography)`
  width: 120px;
  text-align: center;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.palette.primary.main};
  font-weight: bold;
`;

const Sponsors = styled(AvatarGroup)`
  width: 90px;
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

export const FeedRow = ({ id }: { id: string }) => {
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

    // unsubscribe when we dismount
    return () => {
      dispatch(fetchLatestAnswerStop(contractAddress));
    };
  }, []);

  return (
    <Row>
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

        <Name variant="body1" data-testid="feed-name">
          {name}
        </Name>

        <Name variant="body1" data-testid="feed-last-updated">
          {formatDateDifference(feed) || null}
        </Name>

        <Price variant="body1" data-testid="feed-price">
          {formatPrice(feed) || null}
        </Price>

        <Hidden smDown>
          <Sponsors max={4} spacing={-3}>
            {sponsored.map((sponsor) => (
              <Avatar key={sponsor} alt={sponsor} src={generateSponsorUrl(sponsor)} />
            ))}
          </Sponsors>
        </Hidden>
      </Link>
    </Row>
  );
};
