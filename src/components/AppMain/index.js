// @flow
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextPrompt from 'components/TextPrompt';
import VisualisationSimple from 'components/VisualisationSimple';
import VisualisationExpandingParticles from "components/VisualisationExpandingParticles";

import { visualisationsList } from 'context/initialState';
import { useOptionsState } from 'context/OptionsContext';
import useInterval from 'hooks/useInterval';
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

  const [timeAccumulator, setTimeAccumulator] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const tickDivider = useRef(0.02);
  const [tickTimeInSeconds, setTickTimeInSeconds] = useState(tickDivider.current * secondsPerCount);
  const isVisible = usePageVisibility();
  const doCountBeep = useBeeper();
  const doChangeBeep = useBeeper(2);
  const dummyBeep = useBeeper(1, 0);

  useEffect(() => {
    setTimeAccumulator(0);
    setPhaseProgress(0);
    setPhaseIndex(0);
    setCurrentCount(0);
  }, [currentPattern.id]);

  useEffect(() => {
    setTickTimeInSeconds(tickDivider.current * secondsPerCount);
  }, [secondsPerCount]);

  useEffect(() => {
    if (soundOnChange || soundOnCount) {
      dummyBeep();
    }
  }, [soundOnChange, soundOnCount, dummyBeep]);

  useInterval(() => {
    if (!currentPattern.phases[phaseIndex]) {
      return;
    }

    const totalPhaseTime = currentPattern.phases[phaseIndex].units * secondsPerCount;

    setPhaseProgress(timeAccumulator/(currentPattern.phases[phaseIndex].units * secondsPerCount) * 100);

    if (timeAccumulator <= totalPhaseTime && currentCount < currentPattern.phases[phaseIndex].units + 1) {
      setTimeAccumulator(() => timeAccumulator + tickTimeInSeconds);
      if (timeAccumulator >= currentCount * totalPhaseTime/currentPattern.phases[phaseIndex].units) {
        if (isVisible && vibrateOnCount && navigator.vibrate && !(vibrateOnChange && currentCount === 0)) {
          navigator.vibrate(50);
        }
        if (isVisible && soundOnCount && !(soundOnChange && currentCount === 0)) {
          doCountBeep();
        }
        setCurrentCount(currentCount + 1);
      }
    } else {
      setTimeAccumulator(0);
      setCurrentCount(0);
      if (isVisible && vibrateOnChange && navigator.vibrate) {
        navigator.vibrate(200);
      }
      if (isVisible && soundOnChange) {
        doChangeBeep();
      }
      if (phaseIndex < currentPattern.phases.length - 1) {
        setPhaseIndex(phaseIndex + 1);
      } else {
        setPhaseIndex(0);
      }
    }

  }, tickTimeInSeconds * 1000);

  const visualisation = () => {
    if (currentVisualisation === visualisationsList.expandingParticles) {
      return (<VisualisationExpandingParticles
        currentPhase={currentPattern.phases[phaseIndex].name}
        progress={phaseProgress/100}
      />);
    }
    return (<VisualisationSimple
      currentPhase={currentPattern.phases[phaseIndex].name}
      progress={phaseProgress/100}
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
          count={currentCount}
        />
      )}
    </main>
  );
};

export default AppMain;
