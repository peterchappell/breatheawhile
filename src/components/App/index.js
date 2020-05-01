import React, { useState, useRef } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import { SoundOptionsProvider } from 'context/SoundOptionsContext';
import AppHeader from 'components/AppHeader';
import AppMain from 'components/AppMain';
import AppNav from 'components/AppNav';
import AppOptions from 'components/AppOptions';

import breathingPatterns from 'utils/breathingPatterns';

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
  const [timeUnitInSeconds, setTimeUnitInSeconds] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState(breathingPatterns[0]);
  const popoverAnchorRef = useRef();

  const classes = useStyles();

  const toggleShowInstructions = () => {
    setShowInstructions(!showInstructions);
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

  const handlePatternSelect = (event, value) => {
    setSelectedPattern(value);
    closeAllDrawers();
  };

  return (
    <section className={classes.appContainer}>
      <AppHeader />
      <Container maxWidth="md" component="main">
        <SoundOptionsProvider>
          <AppMain
            timeUnitInSeconds={timeUnitInSeconds}
            showInstructions={showInstructions}
            pattern={selectedPattern}
          />
          <AppOptions
            navValue = {navValue}
            closeAllDrawers = {closeAllDrawers}
            popoverAnchorRef = {popoverAnchorRef}
            showInstructions = {showInstructions}
            toggleShowInstructions = {toggleShowInstructions}
            selectedPattern = {selectedPattern}
            handlePatternSelect = {handlePatternSelect}
            timeUnitInSeconds = {timeUnitInSeconds}
            setTimeUnitInSeconds = {setTimeUnitInSeconds}
          />
        </SoundOptionsProvider>
      </Container>
      <AppNav
        navValue = {navValue}
        handleNavChange = {handleNavChange}
        popoverAnchorRef = {popoverAnchorRef}
      />
    </section>
  );
};

export default App;
