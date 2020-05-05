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
      payload: {
        secondsPerCount: normaliseSliderValue(value),
      }
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
        className={classes.speedControl}
        aria-labelledby="speed-slider" />
    </div>
  )
};

export default SpeedOptions;
