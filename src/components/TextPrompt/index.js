import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  phaseInstruction: {
    color: '#f5f5f5',
    fontSize: '18px',
    marginTop: '20px',
    textAlign: 'center',
  },
  phaseCount: {
    display: 'inline-block',
    width: '20px',
  },
  fadeOut: {
    opacity: 0,
    transition: '0.35s opacity',
  },
  fadeIn: {
    opacity: 1,
    transition: '0.2s opacity',
  },
}));

const TextPrompt = (props) => {
  const {
    currentInstruction,
    progress,
    count,
  } = props;

  const classes = useStyles();

  return (
    <div className={`${classes.phaseInstruction} ${progress >= 0.9 ? classes.fadeOut : classes.fadeIn}`}>
      {currentInstruction}
      <span className={classes.phaseCount}>
        {(count > 1) ? count : '…'}
      </span>
    </div>
  );
}

TextPrompt.propTypes = {
  currentPhase: PropTypes.string,
  progress: PropTypes.number,
  count: PropTypes.number,
};

TextPrompt.defaultProps = {
  currentPhase: 'in',
  progress: 0,
  count: 0,
};

export default TextPrompt;
