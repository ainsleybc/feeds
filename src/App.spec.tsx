import { render } from '@testing-library/react';
import React from 'react';
import { App } from './App';

describe('App', () => {
  it('it is a hello world app', () => {
    const { getByText } = render(<App />);
    expect(getByText('hello world.')).toBeTruthy();
  });
});
