// @flow
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextPrompt from 'components/TextPrompt';
import VisualisationSimple from 'components/VisualisationSimple';
import VisualisationExpandingParticles from "components/VisualisationExpandingParticles";

import { visualisationsList } from 'context/initialState';
import { useOptionsState } from 'context/OptionsContext';
import useAnimationFrame from 'hooks/useAnimationFrame';
import useBeeper from 'hooks/useBeeper';
import { usePageVisibility } from 'hooks/visibility';

const useStyles = makeStyles(() => ({
  mainContainer: {
    marginTop: '-20px',
  }
}));

const AppMain = () => {
  const classes = useStyles();

  const {
    vibrateOnCount,
    soundOnCount,
    vibrateOnChange,
    soundOnChange,
    showInstructions,
    secondsPerCount,
    currentPattern,
    currentVisualisation,
  } = useOptionsState();

  const phaseTimeElapsed = useRef(0);
  const countTimeElapsed = useRef(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phaseDuration = useRef(currentPattern.phases[0].units * secondsPerCount * 1000);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [count, setCount] = useState(1);

  const isVisible = usePageVisibility();
  const doCountBeep = useBeeper();
  const doChangeBeep = useBeeper(2);
  const dummyBeep = useBeeper(1, 0);

  // Use a dummy beep that we play as soon as sound settings are
  // turned on (but with a volume of 0). This is to avoid auto play issues.
  useEffect(() => {
    if (soundOnChange || soundOnCount) {
      dummyBeep();
    }
  }, [soundOnChange, soundOnCount, dummyBeep]);

  // Handles making a sound (and/or vibrating) on each count
  useEffect(() => {
    if (isVisible && vibrateOnCount && navigator.vibrate && !(vibrateOnChange && count === 1)) {
      navigator.vibrate(50);
    }
    if (isVisible && soundOnCount && !(soundOnChange && count === 1)) {
      doCountBeep();
    }
  }, [count, doCountBeep, isVisible, soundOnChange, soundOnCount, vibrateOnChange, vibrateOnCount]);

  // Handles making a sound (and/or vibrating) on each breath change (phase change)
  useEffect(() => {
    if (isVisible && vibrateOnChange && navigator.vibrate) {
      navigator.vibrate(200);
    }
    if (isVisible && soundOnChange) {
      doChangeBeep();
    }
  }, [phaseIndex, doChangeBeep, isVisible, soundOnChange, vibrateOnChange]);

  // Every time the progress increases we check whether we should update the phase and/or count
  useEffect(() => {
    const updatePhase = () => {
      let newPhaseIndex = 0;
      phaseTimeElapsed.current = 0;
      countTimeElapsed.current = 0;
      setPhaseProgress(0);
      setCount(1);

      if (phaseIndex < currentPattern.phases.length - 1) {
        newPhaseIndex = phaseIndex + 1;
      }
      setPhaseIndex(newPhaseIndex);
      phaseDuration.current = currentPattern.phases[newPhaseIndex].units * secondsPerCount * 1000;
    };

    const updateCounter = () => {
      countTimeElapsed.current = 0;
      setCount(previousCount => previousCount + 1);
    };

    if (phaseProgress >= 1) {
      updatePhase();
    }
    if (countTimeElapsed.current >= phaseDuration.current / currentPattern.phases[phaseIndex].units) {
      updateCounter();
    }
  }, [phaseProgress, currentPattern.phases, isVisible, phaseIndex, secondsPerCount, doChangeBeep, soundOnChange, vibrateOnChange]);

  // On requestAnimationFrame we update our progress
  // (and from there calculate the whether we change the count or progress - via useEffects above).
  useAnimationFrame((frameTime) => {
    if (!currentPattern.phases[phaseIndex]) {
      return;
    }
    phaseTimeElapsed.current += frameTime;
    countTimeElapsed.current += frameTime;

    setPhaseProgress(phaseTimeElapsed.current/phaseDuration.current);
  });

  // Using a method so that we can add additional visualisations (needs refactoring)
  const visualisation = () => {
    if (currentVisualisation === visualisationsList.expandingParticles) {
      return (<VisualisationExpandingParticles
        currentPhase={currentPattern.phases[phaseIndex].name}
        progress={phaseProgress}
      />);
    }
    return (<VisualisationSimple
      currentPhase={currentPattern.phases[phaseIndex].name}
      progress={phaseProgress}
    />);
  };

  return (
    <main className={classes.mainContainer}>
      { currentPattern.phases[phaseIndex] && (
        visualisation()
      )}
      { showInstructions && currentPattern.phases[phaseIndex] && (
        <TextPrompt
          currentInstruction={currentPattern.phases[phaseIndex].instruction}
          patternName={currentPattern.name}
          progress={phaseProgress/100}
          count={count}
        />
      )}
    </main>
  );
};

export default AppMain;
