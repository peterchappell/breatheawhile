import React, { useState } from 'react';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  sliderContainer: {
    padding: theme.spacing(3),
  },
}));

const SpeedOptions = (props) => {
  const { setTimeUnitInSeconds } = props;

  const [sliderValue, setSliderValue] = useState(0.5);

  const changeTimeUnit = (event, value) => {
    setSliderValue(value);
    setTimeUnitInSeconds(1 - value + 0.5);
  };

  const classes = useStyles();

  return (
    <div className={classes.sliderContainer}>
      <Typography id="speed-slider">
        Speed
      </Typography>
      <Slider
        value={sliderValue}
        min={0}
        max={1}
        step={0.05}
        track={false}
        onChange={changeTimeUnit}
        className={classes.speedControl}
        aria-labelledby="speed-slider" />
    </div>
  )
};

export default SpeedOptions;
