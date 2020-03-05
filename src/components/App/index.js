import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import VisualisationSimple from 'components/VisualisationSimple';

const App = () => {

  const [timeAccumulator, setTimeAccumulator] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [timeUnitInSeconds, setTimeUnitInSeconds] = useState(1);
  
  const tickTimeInSeconds = 0.05;

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

  const changeTimeUnit = (event) => {
    setTimeUnitInSeconds(event.target.value);
  };

  useEffect(() => {
    let interval = null;

    if (timeAccumulator <= phasePattern[phaseIndex].units * timeUnitInSeconds) {
      interval = setInterval(() => {
        setTimeAccumulator(timeAccumulator => timeAccumulator + tickTimeInSeconds);
      }, tickTimeInSeconds * 1000);
    } else {
      clearInterval(interval);
      setTimeAccumulator(0);
      if (phaseIndex < phasePattern.length - 1) {
        setPhaseIndex(phaseIndex + 1);
      } else {
        setPhaseIndex(0);
      }
    }

    setPhaseProgress(timeAccumulator/(phasePattern[phaseIndex].units * timeUnitInSeconds) * 100);

    return () => clearInterval(interval);
  }, [phaseIndex, timeAccumulator, phasePattern, timeUnitInSeconds, tickTimeInSeconds]);

  return (
    <section className={styles.App}>
      <header className={styles.header}>
        Breathonome
      </header>
      <main>
        <VisualisationSimple currentPhase={phasePattern[phaseIndex].name} progress={phaseProgress/100} />
      </main>
      <footer className={styles.footer}>
        <input type="range" min={0.5} max={1.5} step={0.05} defaultValue={timeUnitInSeconds} onChange={changeTimeUnit} className={styles.speedControl} />
      </footer>
    </section>
  );
};

export default App;
