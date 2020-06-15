/* eslint-disable */

// @flow
import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import Divider from "@material-ui/core/Divider";
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import Hidden from "@material-ui/core/Hidden";

import actions from 'context/actions';
import { useOptionsState, useOptionsDispatch } from 'context/OptionsContext';
import useGlobalStyles from 'hooks/useGlobalStyles';

const DisplayOptions = () => {
  const globalClasses = useGlobalStyles();
  const dispatchSettingsChange = useOptionsDispatch();

  const {
    showInstructions,
    currentVisualisation,
  } = useOptionsState();

  return (
    <Container maxWidth="md">
      <FormControl component="fieldset" className={globalClasses.formControl}>
        <FormLabel component="legend">Visualisation</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={currentVisualisation === 'simple'}
                onChange={() => dispatchSettingsChange({ type: actions.SET_VISUALISATION, payload: 'simple' })}
              />
            }
            label="Timer with icons"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={currentVisualisation === 'expandingParticles'}
                onChange={() => dispatchSettingsChange({ type: actions.SET_VISUALISATION, payload: 'expandingParticles' })}
              />
            }
            label="Dreamy bubbles"
          />
        </FormGroup>
      </FormControl>
      <Hidden smUp>
        <Divider />
      </Hidden>
      <FormControl component="fieldset" className={globalClasses.formControl}>
        <FormLabel component="legend">Text</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={showInstructions}
                onChange={() => dispatchSettingsChange({ type: actions.TOGGLE_SHOW_INSTRUCTIONS })}
                data-testid="display_options_checkbox"
              />
            }
            label="Show instruction text"
          />
        </FormGroup>
      </FormControl>
    </Container>
  );
};

export default DisplayOptions;