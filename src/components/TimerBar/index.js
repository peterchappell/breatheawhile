import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimerBar.module.css';

const TimerBar = (props) => {
  const {
    progress,
  } = props;

  return (
    <div className={styles.temp}>
      {progress}
    </div>
  );
}

TimerBar.propTypes = {
  progress: PropTypes.number,
};

TimerBar.defaultProps = {
  progress: 0,
};

export default TimerBar;
