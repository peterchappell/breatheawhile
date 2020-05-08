// @flow
import React  from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import actions from 'context/actions';
import { useOptionsState, useOptionsDispatch } from 'context/OptionsContext';

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    padding: theme.spacing(3),
  },
  root: {
    color: theme.palette.secondary.main,
    marginTop: theme.spacing(2),
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: theme.palette.secondary.main,
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
  active: {
    color: theme.palette.secondary.dark,
  }
}));

export const normaliseSliderValue = (value: number) => {
  if (typeof value === 'undefined') {
    return 1;
  }
  return 1 - value + 0.5;
};

const SpeedOptions = () => {
  const { secondsPerCount } = useOptionsState();
  const dispatchSettingsChange = useOptionsDispatch();

  const changeTimeUnit = (event, value) => {
    dispatchSettingsChange({
      type: actions.SET_SECONDS_PER_COUNT,
      payload: normaliseSliderValue(value),
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.sliderContainer}>
      <Typography id="speed-slider">
        {
          secondsPerCount === 1 ? (
            `Count every ${secondsPerCount.toFixed(2)} second`
          ) : (
            `Count every ${secondsPerCount.toFixed(2)} seconds`
          )
        }
      </Typography>
      <Slider
        defaultValue={0.5}
        min={0}
        max={1}
        step={0.01}
        track={false}
        onChange={changeTimeUnit}
        classes={{
          root: classes.root,
          thumb: classes.thumb,
          track: classes.track,
          rail: classes.rail,
          active: classes.active,
        }}
        aria-labelledby="speed-slider" />
    </div>
  )
};

export default SpeedOptions;
