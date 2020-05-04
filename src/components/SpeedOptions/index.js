// @flow
import React  from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    padding: theme.spacing(3),
  },
}));

export const normaliseSliderValue = (value: number) => {
  if (!value) {
    return 0.5;
  }
  return 1 - value + 0.5;
};

type Props = {
  setTimeUnitInSeconds: Function,
  timeUnitInSeconds: number,
}

const SpeedOptions = (props: Props) => {
  const { 
    setTimeUnitInSeconds,
    timeUnitInSeconds, 
  } = props;

  const changeTimeUnit = (event, value) => {
    setTimeUnitInSeconds(normaliseSliderValue(value));
  };

  const classes = useStyles();

  return (
    <div className={classes.sliderContainer}>
      <Typography id="speed-slider">
        {
          timeUnitInSeconds === 1 ? (
            `Count every ${timeUnitInSeconds.toFixed(2)} second`
          ) : (
            `Count every ${timeUnitInSeconds.toFixed(2)} seconds`
          )
        }
      </Typography>
      <Slider
        value={normaliseSliderValue(timeUnitInSeconds)}
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
