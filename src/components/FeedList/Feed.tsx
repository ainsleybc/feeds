import { Avatar, Typography } from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import React from 'react';
import styled from 'styled-components';

import { Feed as FeedType } from '~types';

const Row = styled.div`
  display: flex;
  height: 75px;
  border: 1px solid ${({ theme }) => theme.palette.grey[50]};
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing(2)}px`};
`;

const CurrencyIcons = styled(AvatarGroup)`
  & > div {
    border: none;
  }
`;

const Name = styled(Typography)`
  margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
  font-size: 1.2rem;
  flex: 1 0 auto;
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

export const Feed = ({ data }: { data: FeedType }) => {
  const [firstCurrency, secondCurrency] = data.pair;
  const { name, sponsored, valuePrefix } = data;

  // temp dummy variables
  const price = 3.8998908;

  return (
    <Row>
      <CurrencyIcons max={2}>
        <Avatar alt={firstCurrency} />
        <Avatar alt={secondCurrency} />
      </CurrencyIcons>

      <Name variant="body1" data-testid="feed-name">
        {name}
      </Name>

      <Price variant="body1" data-testid="feed-price">
        {`${valuePrefix} ${price}`}
      </Price>

      <Sponsors max={4} spacing={-3}>
        {sponsored.map((sponsor) => (
          <Avatar key={sponsor} alt={sponsor} src={generateSponsorUrl(sponsor)} />
        ))}
      </Sponsors>
    </Row>
  );
};
