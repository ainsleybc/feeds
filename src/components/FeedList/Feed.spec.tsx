import React from 'react';

import { Feed } from './Feed';
import { useFeed } from '~store';
import { render } from '~test-utils';
import { Feed as FeedType } from '~types';

jest.mock('~store/feeds/FeedsHooks', () => ({
  useFeed: jest.fn(),
}));

describe('Feed', () => {
  it('displays the correct data', () => {
    const testData: FeedType = {
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
      price: '123456908790870',
      lastUpdated: '2020-11-04T20:23:50.000Z',
    };

    (useFeed as jest.Mock).mockReturnValue([testData, jest.fn()]);

    const { getByTestId } = render(<Feed address={testData.contractAddress} />);

    expect(getByTestId('feed-name')).toHaveTextContent('ETH / USD');
    expect(getByTestId('feed-price')).toHaveTextContent('$ 1234569.087');
  });
});
