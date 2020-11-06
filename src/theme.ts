import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          WebkitFontSmoothing: 'auto',
        },
        body: {
          backgroundColor: '#fff',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#375bd2',
    },
  },
});
