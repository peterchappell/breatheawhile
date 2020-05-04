// @flow
import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import actions from 'context/actions';
import { useOptionsState, useOptionsDispatch } from 'context/OptionsContext';
import useGlobalStyles from 'hooks/useGlobalStyles';

const DisplayOptions = () => {
  const globalClasses = useGlobalStyles();
  const dispatchSettingsChange = useOptionsDispatch();

  const { showInstructions } = useOptionsState();

  return (
    <Container maxWidth="md">
      <FormControl component="fieldset" className={globalClasses.formControl}>
        <FormLabel component="legend">Display</FormLabel>
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