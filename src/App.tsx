import { CssBaseline, ThemeProvider, createMuiTheme, Typography } from '@material-ui/core';
import React from 'react';

export const App = () => {
  const theme = createMuiTheme({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <div className="App">
        <header className="App-header">
          <Typography variant="h1">hello world.</Typography>
        </header>
      </div>
    </ThemeProvider>
  );
};
