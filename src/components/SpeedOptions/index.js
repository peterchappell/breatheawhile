// @flow
import React  from 'react';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import FormLabel from "@material-ui/core/FormLabel";
import Slider from '@material-ui/core/Slider';
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
  },
  sliderGrid: {
    justifyContent: 'space-between',
    display: 'flex',
    margin: [[-theme.spacing(1), -theme.spacing(1), 0, -theme.spacing(1)]],
  },
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

  const onSlowDown = () => {
    if (secondsPerCount < 1.5) {
      dispatchSettingsChange({
        type: actions.SET_SECONDS_PER_COUNT,
        payload: secondsPerCount + 0.01,
      });
    }
  };

  const onSpeedUp = () => {
    if (secondsPerCount > 0.5) {
      dispatchSettingsChange({
        type: actions.SET_SECONDS_PER_COUNT,
        payload: secondsPerCount - 0.01,
      });
    }
  };

  const classes = useStyles();

  return (
    <div className={classes.sliderContainer}>
      <FormLabel
        component="legend"
        id="speed-slider"
      >
        Adjust the count speed
      </FormLabel>
      <Slider
        value={normaliseSliderValue(secondsPerCount)}
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
      <div className={classes.sliderGrid}>
        <Button
          onClick={onSlowDown}
          startIcon={<ArrowBackIcon />}
        >
          Longer breaths
        </Button>
        <Button
          onClick={onSpeedUp}
          endIcon={<ArrowForwardIcon />}
        >
          Shorter breaths
        </Button>
      </div>
    </div>
  )
};

export default SpeedOptions;
