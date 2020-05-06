import React, { useState, useRef } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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
  );
};

export default App;
