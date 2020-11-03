import { render } from '@testing-library/react';
import React from 'react';
import { FeedsProvider } from './FeedsProvider';
import { useFeeds } from './useFeeds';
import { Feed as FeedType } from '~types';

const renderTestComponent = (mockState = {}) => {
  const returnVal: any = {};

  const TestComponent = () => {
    const [state] = useFeeds();
    Object.assign(returnVal, state);
    return null;
  };

  render(
    <FeedsProvider initialState={mockState}>
      <TestComponent />
    </FeedsProvider>
  );

  return returnVal;
};

describe('useFeeds', () => {
  it('returns the current state', async () => {
    const testFeed: FeedType = {
      compareOffchain: 'https://www.tradingview.com/symbols/ETHUSD/?exchange=COINBASE',
      contractAddress: '0x00c7A37B03690fb9f41b5C5AF8131735C7275446',
      contractType: 'flux-aggregator',
      contractVersion: 3,
      decimalPlaces: 3,
      formatDecimalPlaces: 0,
      healthPrice: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum',
      heartbeat: 10800,
      history: true,
      listing: true,
      multiply: '100000000',
      name: 'ETH / USD',
      pair: ['ETH', 'USD'],
      path: 'eth-usd',
      proxyAddress: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
      sponsored: ['Synthetix'],
      threshold: 0.5,
      valuePrefix: '$',
    };

    const mockState = {
      data: [testFeed],
    };

    const state = renderTestComponent(mockState);
    expect(state.data).not.toEqual(testFeed);
  });
});
