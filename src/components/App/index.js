import React, { useState, useRef, useEffect } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import { useHistory, useLocation } from 'react-router-dom';

import theme from 'utils/muiTheme';
import { OptionsProvider } from 'context/OptionsContext';
import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppNav from 'components/AppNav';
import AppOptions from 'components/AppOptions';
import PrivacyManager from 'components/PrivacyManager';
import ServiceWorkerManager from 'components/ServiceWorkerManager';
import InfoPanel from 'components/InfoPanel';
import { sendPageView } from 'utils/googleAnalytics';

const useStyles = makeStyles(() => ({
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
    textAlign: 'center',
  },
}));

const cookieKey = 'breatheawhile';

const setCookie = () => {
  const cookieDate = new Date();
  cookieDate.setFullYear(cookieDate.getFullYear() + 2);
  document.cookie = `${cookieKey}=true; expires=${cookieDate.toUTCString()};`;
}

const checkCookie = () => {
  let alreadyHasCookie = false;
  if (document.cookie.split(';').some(item => item.trim().startsWith(`${cookieKey}=`))) {
    alreadyHasCookie = true;
    setCookie();
  }
  return alreadyHasCookie;
}

const App = () => {
  const [navValue, setNavValue] = useState();
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [hasCookie, setHasCookie] = useState(checkCookie());
  const history = useHistory();
  const location = useLocation();
  const popoverAnchorRef = useRef();

  const classes = useStyles();

  const openInfo = () => {
    history.push('info');
    sendPageView('/info', 'info');
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    history.push('');
    sendPageView();
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
      sendPageView(`/${newNavValue}`, newNavValue);
    } else {
      newNavValue = '';
      sendPageView();
    }
    setNavValue(newNavValue);
    history.push(newNavValue);
  };

  const acceptPrivacyPolicy = () => {
    setCookie();
    setHasCookie(true);
  };

  useEffect(() => {
    const pathName = location.pathname.slice(1);
    if (pathName === 'info') {
      setIsInfoOpen(true);
      setNavValue('');
    } else {
      setIsInfoOpen(false);
      setNavValue(pathName);
    }
  }, [location.pathname]);

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
        { !hasCookie ? (
          <PrivacyManager continueHandler={acceptPrivacyPolicy} />
        ) : (
          <ServiceWorkerManager />
        )}
      </section>
    </ThemeProvider>
  );
};

export default App;
