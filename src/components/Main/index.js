import React, { useState, useEffect, useRef } from 'react';

import styles from './Main.module.css';
import VisualisationSimple from 'components/VisualisationSimple';
import BreathingTextPrompt from 'components/BreathingTextPrompt';
import { usePageVisibility } from 'hooks/visibility';

const audioContext = new AudioContext();

const Main = (props) => {

  const {
    buzzOnSecond,
    beepOnSecond,
    buzzOnChange,
    beepOnChange,
    timeUnitInSeconds,
    showInstructions,
  } = props;

  const [timeAccumulator, setTimeAccumulator] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [currentCount, setCurrentCount] = useState(0);
  const tickDivider = useRef(0.02);
  const isVisible = usePageVisibility();

  const phasePattern = [
    {
      name: 'in',
      units: 4,
    },
    {
      name: 'pause',
      units: 4,
    },
    {
      name: 'out',
      units: 4,
    },
    {
      name: 'pause',
      units: 4,
    },
  ];

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
    let interval = null;
    let totalPhaseTime = phasePattern[phaseIndex].units * timeUnitInSeconds;
    let tickTimeInSeconds = tickDivider.current * timeUnitInSeconds;

    if (timeAccumulator <= totalPhaseTime) {
      interval = setInterval(() => {
        setTimeAccumulator(timeAccumulator => timeAccumulator + tickTimeInSeconds);
        if (timeAccumulator >= currentCount * totalPhaseTime/phasePattern[phaseIndex].units) {
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
      clearInterval(interval);
      setTimeAccumulator(0);
      setCurrentCount(0);
      if (isVisible && buzzOnChange && navigator.vibrate) {
        navigator.vibrate(200);
      }
      if (isVisible && beepOnChange) {
        doBeep(40, 880, 50);
      }
      if (phaseIndex < phasePattern.length - 1) {
        setPhaseIndex(phaseIndex + 1);
      } else {
        setPhaseIndex(0);
      }
    }

    setPhaseProgress(timeAccumulator/(phasePattern[phaseIndex].units * timeUnitInSeconds) * 100);

    return () => clearInterval(interval);
  }, [phaseIndex, timeAccumulator, phasePattern, timeUnitInSeconds, buzzOnChange, buzzOnSecond, beepOnChange, beepOnSecond, currentCount, isVisible]);

  return (
    <div className={styles.Main}>
      <div className={styles.content}>
        <VisualisationSimple currentPhase={phasePattern[phaseIndex].name} progress={phaseProgress/100} />
        { showInstructions && <BreathingTextPrompt currentPhase={phasePattern[phaseIndex].name} progress={phaseProgress/100} count={currentCount} /> }
      </div>
    </div>
  );
};

export default Main;
