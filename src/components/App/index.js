import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import VisualisationSimple from 'components/VisualisationSimple';

const App = () => {

  const [timeAccumulator, setTimeAccumulator] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);

  const timeUnitInSeconds = 1;
  const timerGranularity = 20;
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

  useEffect(() => {
    let interval = null;

    if (timeAccumulator <= phasePattern[phaseIndex].units + 1) {
      interval = setInterval(() => {
        setTimeAccumulator(timeAccumulator => timeAccumulator + timeUnitInSeconds/timerGranularity);
      }, timeUnitInSeconds/timerGranularity * 1000);
    } else {
      clearInterval(interval);
      setTimeAccumulator(0);
      if (phaseIndex < phasePattern.length - 1) {
        setPhaseIndex(phaseIndex + 1);
      } else {
        setPhaseIndex(0);
      }
    }

    setPhaseProgress(timeAccumulator/(phasePattern[phaseIndex].units + 1) * 100);

    return () => clearInterval(interval);
  }, [phaseIndex, timeAccumulator, phasePattern]);

  return (
    <section className={styles.App}>
      <header className={styles.header}>
        Breathonome
      </header>
      <main>
        <VisualisationSimple currentPhase={phasePattern[phaseIndex].name} progress={phaseProgress/100} />
      </main>
    </section>
  );
};

export default App;
