import React from 'react';
import PropTypes from 'prop-types';
import styles from './VisualisationSimple.module.css';

const VisualisationSimple = (props) => {
  const {
    currentPhase,
    progress,
  } = props;

  const radius = 100;
  const circumference = radius * 2 * Math.PI;

  return (
    <div className={styles.container}>
      <div className={styles.phase}>
        {currentPhase}
      </div>
      <svg className={styles.circle}>
        <circle
          className={styles.background}
          cx="120"
          cy="120"
          r={radius}
          stroke={currentPhase === 'pause' ? 'green' : '#333'}
        />
        <circle
          className={styles.progress}
          cx="120"
          cy="120"
          r={radius}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={circumference - progress * circumference}
          stroke={currentPhase === 'pause' ? '#333' : 'green'}
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
