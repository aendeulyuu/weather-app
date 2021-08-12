import { Route, HashRouter as Router, Switch } from 'react-router-dom';
import {
  StylesProvider,
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from '@material-ui/core/styles';

import App from './App';
import { CssBaseline } from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

const theme = unstable_createMuiStrictModeTheme({
  typography: {
    fontFamily: 'Ubuntu',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          scrollBehavior: 'smooth',
        },
        '*::-webkit-scrollbar': {
          borderRadius: '5px',
          width: '7px',
          backgroundColor: '#F5F5F5',
          height: '7px',
        },
        '*::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: '5px',
          backgroundColor: '#F5F5F5',
        },
        '*::-webkit-scrollbar-thumb': {
          borderRadius: '5px',
          boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          backgroundColor: '#555',
        },
        body: {
          backgroundImage:
            'url(https://aendeulyuu.github.io/weather-app/assets/weather-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
        },
      },
    },
  },
});

const Routing = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/:country" component={App} />
        <Route exact path="/:country/:city" component={App} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Routing />
      </StylesProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
