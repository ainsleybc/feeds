import { render } from '@testing-library/react';
import React, { useContext } from 'react';
import { FeedsProvider, store } from './FeedsProvider';

jest.mock('~services', () => ({
  get: jest.fn(),
}));

const renderTestComponent = () => {
  const returnVal: any = {};

  const TestComponent = () => {
    const [state] = useContext(store);
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
});
