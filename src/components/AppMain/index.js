// @flow
import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextPrompt from 'components/TextPrompt';
import VisualisationSimple from 'components/VisualisationSimple';

import { useOptionsState } from 'context/OptionsContext';
import useInterval from 'hooks/useInterval';
import { usePageVisibility } from 'hooks/visibility';
import type { Pattern } from 'utils/flow/flow-types';

const audioContext = new window.AudioContext();

const useStyles = makeStyles(() => ({
  mainContainer: {
    marginTop: '-20px',
  }
}));

type Props = {
  timeUnitInSeconds: number,
  pattern: Pattern,
};

const AppMain = (props: Props) => {
  const {
    timeUnitInSeconds,
    pattern,
  } = props;

  const classes = useStyles();

  const {
    vibrateOnCount,
    soundOnCount,
    vibrateOnChange,
    soundOnChange,
    showInstructions,
  } = useOptionsState();

  const [timeAccumulator, setTimeAccumulator] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const tickDivider = useRef(0.02);
  const [tickTimeInSeconds, setTickTimeInSeconds] = useState(tickDivider.current * timeUnitInSeconds);
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
  }, [pattern.id]);

  useEffect(() => {
    setTickTimeInSeconds(tickDivider.current * timeUnitInSeconds);
  }, [timeUnitInSeconds]);

  useInterval(() => {
    if (!pattern.phases[phaseIndex]) {
      return;
    }

    const totalPhaseTime = pattern.phases[phaseIndex].units * timeUnitInSeconds;

    if (timeAccumulator <= totalPhaseTime) {      
      setTimeAccumulator(() => timeAccumulator + tickTimeInSeconds);
      if (timeAccumulator >= currentCount * totalPhaseTime/pattern.phases[phaseIndex].units) {
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
      if (phaseIndex < pattern.phases.length - 1) {
        setPhaseIndex(phaseIndex + 1);
      } else {
        setPhaseIndex(0);
      }
    }

    setPhaseProgress(timeAccumulator/(pattern.phases[phaseIndex].units * timeUnitInSeconds) * 100);

  }, tickTimeInSeconds * 1000);

  return (
    <main className={classes.mainContainer}>
      { pattern.phases[phaseIndex] && (
        <VisualisationSimple currentPhase={pattern.phases[phaseIndex].name} progress={phaseProgress/100} />
      )}
      { showInstructions && pattern.phases[phaseIndex] && (
        <TextPrompt
          currentInstruction={pattern.phases[phaseIndex].instruction}
          patternName={pattern.name}
          progress={phaseProgress/100}
          count={currentCount}
        />
      )}
    </main>
  );
};

export default AppMain;
