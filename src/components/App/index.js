import React, { useState, useRef, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

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
  const useEffectOnMount = (mountFunction) => useEffect(mountFunction, []);
  const history = useHistory();
  const location = useLocation();
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
    history.push('info');
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    history.push('');
    setIsInfoOpen(false);
  };

  const closeAllDrawers = () => {
    setNavValue('');
    history.push('');
  };

  const handleNavChange = (event, newValue) => {
    let newNavValue;
    if (newValue !== navValue) {
      newNavValue = newValue;
    } else {
      newNavValue = '';
    }
    setNavValue(newNavValue);
    history.push(newNavValue);
  };

  useEffectOnMount(() => {
    const initialPathName = location.pathname.slice(1);
    if (initialPathName === 'info') {
      setIsInfoOpen(true);
    } else {
      setNavValue(initialPathName);
    }
  });

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
