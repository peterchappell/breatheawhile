import React, { useState, useRef } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { OptionsProvider } from 'context/OptionsContext';
import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppNav from 'components/AppNav';
import AppOptions from 'components/AppOptions';
import ServiceWorkerManager from 'components/ServiceWorkerManager';

const useStyles = makeStyles(() => ({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
}));

const App = () => {
  const [navValue, setNavValue] = useState();
  const popoverAnchorRef = useRef();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#01579b',
      },
      secondary: {
        main: '#c1185b',
      },
      darkBackground: {
        light: '#37474f',
        main: '#263238',
        dark: '#1d262b',
      }
    },
  });
  const classes = useStyles();

  const closeAllDrawers = () => {
    setNavValue('');
  };

  const handleNavChange = (event, newValue) => {
    if (newValue !== navValue) {
      setNavValue(newValue);
    } else {
      setNavValue('');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section className={classes.appContainer}>
        <AppHeader />
        <Container maxWidth="md" component="main">
          <OptionsProvider>
            <AppMain />
            <AppOptions
              navValue = {navValue}
              closeAllDrawers = {closeAllDrawers}
              popoverAnchorRef = {popoverAnchorRef}
            />
          </OptionsProvider>
        </Container>
        <AppNav
          navValue = {navValue}
          handleNavChange = {handleNavChange}
          popoverAnchorRef = {popoverAnchorRef}
        />
        <ServiceWorkerManager />
      </section>
    </ThemeProvider>
  );
};

export default App;
