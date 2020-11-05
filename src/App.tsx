/// <reference types="styled-components/cssprop" />
import {
  CssBaseline,
  StylesProvider,
  ThemeProvider as MaterialUIThemeProvider,
} from '@material-ui/core';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';

import { Feeds, Feed } from './pages';
import { FeedsProvider } from './store';
import { theme } from './theme';

export const App = () => {
  return (
    <MaterialUIThemeProvider theme={theme}>
      <StyledComponentsThemeProvider theme={theme}>
        <CssBaseline />

        <StylesProvider injectFirst>
          <FeedsProvider>
            <Router>
              <Switch>
                <Route path="/" component={Feeds} exact />
                <Route path="/:id" component={Feed} exact />
              </Switch>
            </Router>
          </FeedsProvider>
        </StylesProvider>
      </StyledComponentsThemeProvider>
    </MaterialUIThemeProvider>
  );
};
