import { render, waitFor, act } from '@testing-library/react';
import React, { useContext, Dispatch } from 'react';
import { fetchFeedsSuccess, Action } from './Actions';
import { FeedsProvider, store } from './FeedsProvider';

let dispatch: Dispatch<Action>;

const renderTestComponent = () => {
  const returnVal: any = {};

  const TestComponent = () => {
    const [state, newDispatch] = useContext(store);
    dispatch = newDispatch;
    Object.assign(returnVal, state);
    return null;
  };

  render(
    <FeedsProvider>
      <TestComponent />
    </FeedsProvider>
  );

  return returnVal;
};

describe('FeedsProvider', () => {
  it('has initial state', () => {
    const state = renderTestComponent();

    expect(state.loading).toEqual(false);
    expect(state.error).toEqual(null);
    expect(state.data).toEqual([]);
  });

  it('can dispatch actions', async () => {
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

    const state = renderTestComponent();

    act(() => {
      dispatch(fetchFeedsSuccess(testFeeds));
    });

    await waitFor(() => expect(state.data).toEqual(testFeeds));
  });
});
