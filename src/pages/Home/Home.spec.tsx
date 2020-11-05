import React from 'react';

import { Home } from './Home';
import { get } from '~services';
import { render, act } from '~test-utils';

jest.mock('~services', () => ({
  get: jest.fn(),
}));

jest.mock('~store/feeds/hooks', () => ({
  useFeed: () => [null, jest.fn()],
  useFeeds: () => [{ data: [] }, jest.fn()],
}));

describe('Home', () => {
  let getByTestId: (is: string) => HTMLElement;

  beforeEach(() => {
    const testFeeds = [
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
    ];

    (get as jest.Mock).mockImplementation(() => ({
      subscribe: (success: any) => {
        success({ response: testFeeds });
      },
    }));
  });

  it('has a heading', () => {
    act(() => {
      ({ getByTestId } = render(<Home />));
    });

    expect(getByTestId('heading')).toHaveTextContent(
      'Decentralized Oracle Networks for Price Reference Data'
    );
  });

  it('renders a feeds list', () => {
    act(() => {
      ({ getByTestId } = render(<Home />));
    });

    expect(getByTestId('home:feed-table')).toBeVisible();
  });
});
