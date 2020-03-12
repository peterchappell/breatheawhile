import React from 'react';
import PropTypes from 'prop-types';
import styles from './BreathingTextPrompt.module.css';

const BreathingTextPrompt = (props) => {
  const {
    currentPhase,
    progress,
    count,
  } = props;

  const stringLookup = {
    in: 'Breathe in',
    out: 'Breathe out',
    pause: 'Hold',
  }

  return (
    <div className={`${styles.phaseInstruction} ${progress >= 0.9 ? styles.fadeOut : styles.fadeIn}`}>
      {stringLookup[currentPhase]}
      <span className={styles.phaseCount}>
        {(count > 1) ? count : '…'}
      </span>
    </div>
  );
}

BreathingTextPrompt.propTypes = {
  currentPhase: PropTypes.string,
  progress: PropTypes.number,
  count: PropTypes.number,
};

BreathingTextPrompt.defaultProps = {
  currentPhase: 'in',
  progress: 0,
  count: 0,
};

export default BreathingTextPrompt;
