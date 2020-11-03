import React from 'react';

import { Feeds } from './Feeds';
import { render, act, flushPromises } from '~test-utils';

describe('Feeds', () => {
  let getByTestId: (is: string) => HTMLElement;

  it('has a heading', async () => {
    await act(async () => {
      ({ getByTestId } = render(<Feeds />));
      await flushPromises();
    });

    expect(getByTestId('heading')).toHaveTextContent(
      'Decentralized Oracle Networks for Price Reference Data'
    );
  });

  it('renders a feeds list', async () => {
    await act(async () => {
      ({ getByTestId } = render(<Feeds />));
      await flushPromises();
    });

    expect(getByTestId('feed-list')).toBeVisible();
  });
});
