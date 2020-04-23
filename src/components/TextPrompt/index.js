import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: '20px',
    textAlign: 'center',
  },
  phaseInstructions: {
    marginTop: '5px',
  },
  phaseCount: {
    display: 'inline-block',
    width: '18px',
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
    patternName,
  } = props;

  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="body2">
        {patternName}
      </Typography>
      <div className={`${classes.phaseInstructions} ${progress >= 0.9 ? classes.fadeOut : classes.fadeIn}`}>
        <Typography variant="h6">
          {currentInstruction}
          <span className={classes.phaseCount}>
            {(count > 1) ? count : '…'}
          </span>
        </Typography>
      </div>
    </div>
  );
}

TextPrompt.propTypes = {
  currentInstruction: PropTypes.string,
  patternName: PropTypes.string,
  progress: PropTypes.number,
  count: PropTypes.number,
};

TextPrompt.defaultProps = {
  currentInstruction: '',
  patternName: '',
  progress: 0,
  count: 0,
};

export default TextPrompt;
