// @flow
import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import Hidden from '@material-ui/core/Hidden';

import actions from 'context/actions';
import { useOptionsState, useOptionsDispatch } from 'context/OptionsContext';
import useGlobalStyles from 'hooks/useGlobalStyles';

const SoundOptions = () => {
  const {
    vibrateOnCount,
    soundOnCount,
    vibrateOnChange,
    soundOnChange,
  } = useOptionsState();

  const globalClasses = useGlobalStyles();
  const dispatchSettingsChange = useOptionsDispatch();

  return (
    <Container maxWidth="sm">
      <FormControl component="fieldset" className={globalClasses.formControl}>
        <FormLabel component="legend">Sound</FormLabel>
        <Hidden xsDown>
          <FormHelperText> </FormHelperText>
        </Hidden>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={soundOnCount}
                onChange={() => dispatchSettingsChange({ type: actions.TOGGLE_SOUND_ON_COUNT })}
                data-testid="toggleSoundOnCount"
              />
            }
            label="On every count"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={soundOnChange}
                onChange={() => dispatchSettingsChange({ type: actions.TOGGLE_SOUND_ON_CHANGE })}
                data-testid="toggleSoundOnChange"
              />
            }
            label="On every change"
          />
        </FormGroup>
      </FormControl>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <FormControl component="fieldset" className={globalClasses.formControl}>
        <FormLabel component="legend">Vibration</FormLabel>
        <FormHelperText>(Only for compatible devices)</FormHelperText>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={vibrateOnCount}
                onChange={() => dispatchSettingsChange({ type: actions.TOGGLE_VIBRATE_ON_COUNT })}
                data-testid="toggleVibrateOnCount"
              />
            }
            label="On every count"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={vibrateOnChange}
                onChange={() => dispatchSettingsChange({ type: actions.TOGGLE_VIBRATE_ON_CHANGE })}
                data-testid="toggleVibrateOnChange"
              />
            }
            label="On every change"
          />
        </FormGroup>
      </FormControl>
    </Container>
  );
};

export default SoundOptions;