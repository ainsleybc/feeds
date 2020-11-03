import { Typography, Container } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

import { Logo, FeedList } from '../components';

const Hero = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  min-height: 600px;
  width: 100%;
  padding: ${({ theme }) => theme.spacing(4, 0)};
  color: #fff;
`;

const LogoContainer = styled.div`
  display: inline-flex;
  align-items: center;

  p {
    margin-left: ${({ theme }) => `${theme.spacing(2)}px`};
  }
`;

const H1 = styled.h1`
  display: block;
  max-width: 800px;
  margin: ${({ theme }) => theme.spacing(6, 'auto')};
  font-size: 3rem;
  font-weight: normal;
  text-align: center;
`;

const Text = styled.p`
  margin: 0 auto;
  max-width: 800px;
  margin-top: ${({ theme }) => `${theme.spacing(2)}px`};
  font-size: 1.1rem;
`;

export const Feeds = () => {
  return (
    <Container maxWidth={false} disableGutters={true}>
      <Hero>
        <Container maxWidth="xl">
          <header>
            <LogoContainer>
              <Logo height="100%" width="40px" />
              <Typography variant="h6" component="p">
                Chainlink
              </Typography>
            </LogoContainer>

            <H1 data-testid="heading">Decentralized Oracle Networks for Price Reference Data</H1>

            <Text>
              The Chainlink Network provides the largest collection of secure and decentralized
              on-chain price reference data available. Composed of security reviewed, sybil
              resistant and fully independent nodes which are run by leading blockchain devops and
              security teams. Creating a shared global resource which is sponsored by a growing list
              of top DeFi Dapps.
            </Text>

            <Text>
              Please feel free to look into the details of each Decentralized Oracle Network listed
              below. You can easily use these oracle networks to quickly and securely launch, add
              more capabilities to and/or just greatly improve the security of your smart contracts.
              We can quickly create and deploy a new price feed on mainnet. Reach out to us here
              with the price feeds you need to power your smart contract application.
            </Text>
          </header>
        </Container>
      </Hero>

      <FeedList data-testid="feed-list" />
    </Container>
  );
};
