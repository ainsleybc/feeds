/// <reference types="styled-components/cssprop" />
import {
  CssBaseline,
  StylesProvider,
  ThemeProvider as MaterialUIThemeProvider,
} from '@material-ui/core';
import React from 'react';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { Feeds } from './pages';
import { FeedsProvider } from './store';
import { theme } from './theme';

export const App = () => {
  return (
    <MaterialUIThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        <CssBaseline />

        <StylesProvider injectFirst>
          <FeedsProvider>
            <Feeds />
          </FeedsProvider>
        </StylesProvider>
      </StyledComponentsThemeProvider>
    </MaterialUIThemeProvider>
  );
};
