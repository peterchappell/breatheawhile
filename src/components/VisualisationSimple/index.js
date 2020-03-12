import React from 'react';
import PropTypes from 'prop-types';
import styles from './VisualisationSimple.module.css';
import { ReactComponent as InVisual } from './in.svg';
import { ReactComponent as OutVisual } from './out.svg';
import { ReactComponent as PauseVisual } from './pause.svg';

const VisualisationSimple = (props) => {
  const {
    currentPhase,
    progress,
  } = props;

  const radius = 130;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className={styles.container}>
      <div className={`${styles.phase} ${progress >= 0.9 ? styles.fadeOut : styles.fadeIn}`}>
        <InVisual className={styles.phaseVisual} style={{display: currentPhase === 'in' ? 'block' : 'none'}} />
        <OutVisual className={styles.phaseVisual} style={{display: currentPhase === 'out' ? 'block' : 'none'}} />
        <PauseVisual className={styles.phaseVisual} style={{display: currentPhase === 'pause' ? 'block' : 'none'}} />
      </div>
      <svg className={styles.circle}>
        <circle
          className={styles.background}
          cx="140"
          cy="140"
          r={radius}
          stroke={currentPhase === 'pause' ? '#236385' : '#333'}
        />
        <circle
          className={styles.progress}
          cx="140"
          cy="140"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress * circumference}
          stroke={currentPhase === 'pause' ? '#333' : '#236385'}
        />
      </svg>
    </div>
  );
}

VisualisationSimple.propTypes = {
  currentPhase: PropTypes.string,
  progress: PropTypes.number,
};

VisualisationSimple.defaultProps = {
  currentPhase: 'in',
  progress: 0,
};

export default VisualisationSimple;
