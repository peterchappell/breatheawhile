import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextPrompt from 'components/TextPrompt';
import VisualisationSimple from 'components/VisualisationSimple';

import { usePageVisibility } from 'hooks/visibility';

const audioContext = new window.AudioContext();

const useStyles = makeStyles(() => ({
  mainContainer: {
    marginTop: '-20px',
  }
}));

const AppMain = (props) => {
  const {
    buzzOnSecond,
    beepOnSecond,
    buzzOnChange,
    beepOnChange,
    timeUnitInSeconds,
    showInstructions,
    pattern,
  } = props;

  const classes = useStyles();

  const [timeAccumulator, setTimeAccumulator] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const tickDivider = useRef(0.02);
  const isVisible = usePageVisibility();
  let interval = useRef();

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
    clearInterval(interval.current);
  }, [pattern.id, interval]);

  useEffect(() => {
    if (!pattern.phases[phaseIndex]) {
      return;
    }

    let totalPhaseTime = pattern.phases[phaseIndex].units * timeUnitInSeconds;
    let tickTimeInSeconds = tickDivider.current * timeUnitInSeconds;

    if (timeAccumulator <= totalPhaseTime) {
      interval.current = setInterval(() => {
        setTimeAccumulator(timeAccumulator => timeAccumulator + tickTimeInSeconds);
        if (timeAccumulator >= currentCount * totalPhaseTime/pattern.phases[phaseIndex].units) {
          if (isVisible && buzzOnSecond && navigator.vibrate && !(buzzOnChange && currentCount === 0)) {
            navigator.vibrate(50);
          }
          if (isVisible && beepOnSecond && !(beepOnChange && currentCount === 0)) {
            doBeep(5, 880, 50);
          }
          setCurrentCount(currentCount + 1);
        }
      }, tickTimeInSeconds * 1000);
    } else {
      clearInterval(interval.current);
      setTimeAccumulator(0);
      setCurrentCount(0);
      if (isVisible && buzzOnChange && navigator.vibrate) {
        navigator.vibrate(200);
      }
      if (isVisible && beepOnChange) {
        doBeep(40, 880, 50);
      }
      if (phaseIndex < pattern.phases.length - 1) {
        setPhaseIndex(phaseIndex + 1);
      } else {
        setPhaseIndex(0);
      }
    }

    setPhaseProgress(timeAccumulator/(pattern.phases[phaseIndex].units * timeUnitInSeconds) * 100);

    return () => clearInterval(interval.current);
  }, [interval, phaseIndex, timeAccumulator, pattern, timeUnitInSeconds, buzzOnChange, buzzOnSecond, beepOnChange, beepOnSecond, currentCount, isVisible]);

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
