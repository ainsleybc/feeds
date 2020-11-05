import { render, waitFor, act } from '@testing-library/react';
import React, { useContext, Dispatch } from 'react';
import { of } from 'rxjs';
import { fetchFeedsStart, fetchLatestAnswerStart, Action } from './actions';
import { FeedsProvider, store } from './Provider';
import { get, latestAnswer } from '~services';

jest.mock('~services', () => ({
  get: jest.fn(),
  latestAnswer: jest.fn(),
}));

let dispatch: Dispatch<Action>;

const renderTestComponent = (mockState = {}) => {
  const returnVal: any = {};

  const TestComponent = () => {
    const [state, newDispatch] = useContext(store);
    dispatch = newDispatch;
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

describe('fetching Feeds', () => {
  it('updates state when feeds succesfully fetched', async () => {
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

    const state = renderTestComponent();

    act(() => {
      dispatch(fetchFeedsStart());
    });

    expect(get).toHaveBeenCalled();
    await waitFor(() => expect(state.data).toEqual(testFeeds));
  });

  it('updates state when fetching feeds failed', async () => {
    (get as jest.Mock).mockImplementation(() => ({
      subscribe: (_: any, error: any) => {
        error('something went wrong');
      },
    }));

    const state = renderTestComponent();

    act(() => {
      dispatch(fetchFeedsStart());
    });

    await waitFor(() => expect(state.error).toEqual('something went wrong'));
  });
});

describe('fetching latest answer', () => {
  it('updates the correct feed with the latest price & updated date', async () => {
    const testFeed = {
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

    (latestAnswer as jest.Mock).mockImplementation(() =>
      of({ updatedAt: '2020-11-04T20:23:50.000Z', price: '68786787688' })
    );

    const state = renderTestComponent(mockState);

    act(() => {
      dispatch(fetchLatestAnswerStart(testFeed.contractAddress));
    });

    await waitFor(() => expect(state.data[0].price).toEqual('68786787688'));
    await waitFor(() => expect(state.data[0].lastUpdated).toEqual('2020-11-04T20:23:50.000Z'));
  });
});
