import { ThemeProvider as MaterialUIThemeProvider } from '@material-ui/core';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { theme } from '../src/theme';
import { FeedsProvider } from '~store';

const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult => {
  return render(
    <Router>
      <MaterialUIThemeProvider theme={theme}>
        <StyledComponentsThemeProvider theme={theme}>
          <FeedsProvider>{ui}</FeedsProvider>
        </StyledComponentsThemeProvider>
      </MaterialUIThemeProvider>
    </Router>,
    options
  );
};

const flushPromises = () => new Promise(setImmediate);

// eslint-disable-next-line import/export
export * from '@testing-library/react';
// eslint-disable-next-line import/export
export { customRender as render, flushPromises };
