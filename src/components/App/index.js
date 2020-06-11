import React, { useState, useRef } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { OptionsProvider } from 'context/OptionsContext';
import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppNav from 'components/AppNav';
import AppOptions from 'components/AppOptions';
import ServiceWorkerManager from 'components/ServiceWorkerManager';
import InfoPanel from "components/InfoPanel";

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
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const popoverAnchorRef = useRef();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#0277bd',
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

  const openInfo = () => {
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    setIsInfoOpen(false);
  };

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
        <AppHeader infoButtonHandler={openInfo} />
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
        <InfoPanel
          isOpen={isInfoOpen}
          closeHandler={closeInfo}
        />
        <ServiceWorkerManager />
      </section>
    </ThemeProvider>
  );
};

export default App;
