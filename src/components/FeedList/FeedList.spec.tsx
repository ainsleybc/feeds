import React from 'react';

import { FeedList } from './FeedList';
import { useFeeds } from '~store';
import { render } from '~test-utils';
import { Feed } from '~types';

jest.mock('~store/feeds/FeedsHooks', () => ({
  useFeeds: jest.fn(),
  useFeed: () => [null, jest.fn()],
}));

describe('FeedList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders a row for each feed', () => {
    const testData: Array<Feed> = [
      {
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
      },
      {
        compareOffchain: 'https://www.tradingview.com/symbols/BTCUSD/?exchange=COINBASE',
        contractAddress: '0xF570deEffF684D964dc3E15E1F9414283E3f7419',
        contractType: 'flux-aggregator',
        contractVersion: 3,
        decimalPlaces: 3,
        formatDecimalPlaces: 0,
        healthPrice: 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin',
        heartbeat: 10800,
        history: true,
        listing: true,
        multiply: '100000000',
        name: 'BTC / USD',
        pair: ['BTC', 'USD'],
        path: 'btc-usd',
        proxyAddress: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c',
        sponsored: [
          'Synthetix',
          'Gamerhash',
          'Sandbank',
          'Plasm Network',
          'HXRO',
          'Bitrue',
          'PlotX',
        ],
        threshold: 1,
        valuePrefix: '$',
      },
    ];

    (useFeeds as jest.Mock).mockReturnValue([{ data: testData }]);

    const { getByTestId } = render(<FeedList />);
    const element = getByTestId('feeds-list-wrapper');

    expect(element.children.length).toEqual(2);
  });
});
