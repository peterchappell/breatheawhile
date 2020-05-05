// @flow
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextPrompt from 'components/TextPrompt';
import VisualisationSimple from 'components/VisualisationSimple';

import { useOptionsState } from 'context/OptionsContext';
import useInterval from 'hooks/useInterval';
import { usePageVisibility } from 'hooks/visibility';

const audioContext = new window.AudioContext();

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
  } = useOptionsState();

  const [timeAccumulator, setTimeAccumulator] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const tickDivider = useRef(0.02);
  const [tickTimeInSeconds, setTickTimeInSeconds] = useState(tickDivider.current * secondsPerCount);
  const isVisible = usePageVisibility();

  const doBeep = (vol, freq, duration) => {
    const v = audioContext.createOscillator();
    const u = audioContext.createGain();
    v.connect(u);
    v.frequency.value = freq;
    v.type = 'sine';
    u.connect(audioContext.destination);
    u.gain.value = vol*0.01;
    v.start(audioContext.currentTime);
    v.stop(audioContext.currentTime + duration*0.001);
  };

  useEffect(() => {
    setTimeAccumulator(0);
    setPhaseProgress(0);
    setPhaseIndex(0);
    setCurrentCount(0);
  }, [currentPattern.id]);

  useEffect(() => {
    setTickTimeInSeconds(tickDivider.current * secondsPerCount);
  }, [secondsPerCount]);

  useInterval(() => {
    if (!currentPattern.phases[phaseIndex]) {
      return;
    }

    const totalPhaseTime = currentPattern.phases[phaseIndex].units * secondsPerCount;

    if (timeAccumulator <= totalPhaseTime) {      
      setTimeAccumulator(() => timeAccumulator + tickTimeInSeconds);
      if (timeAccumulator >= currentCount * totalPhaseTime/currentPattern.phases[phaseIndex].units) {
        if (isVisible && vibrateOnCount && navigator.vibrate && !(vibrateOnChange && currentCount === 0)) {
          navigator.vibrate(50);
        }
        if (isVisible && soundOnCount && !(soundOnChange && currentCount === 0)) {
          doBeep(5, 880, 50);
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
        doBeep(40, 880, 50);
      }
      if (phaseIndex < currentPattern.phases.length - 1) {
        setPhaseIndex(phaseIndex + 1);
      } else {
        setPhaseIndex(0);
      }
    }

    setPhaseProgress(timeAccumulator/(currentPattern.phases[phaseIndex].units * secondsPerCount) * 100);

  }, tickTimeInSeconds * 1000);

  return (
    <main className={classes.mainContainer}>
      { currentPattern.phases[phaseIndex] && (
        <VisualisationSimple currentPhase={currentPattern.phases[phaseIndex].name} progress={phaseProgress/100} />
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
