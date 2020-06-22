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

import RadioButtonList from 'components/RadioButtonList';
import visualisations from 'utils/visualisations';
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

  const handleVisualisationChange = (visualisation) => {
    dispatchSettingsChange({ type: actions.SET_VISUALISATION, payload: visualisation.id });
  };

  return (
    <Container maxWidth="md">
      <FormControl component="fieldset" className={globalClasses.formControl}>
        <FormLabel component="legend">Visualisation</FormLabel>
        <RadioButtonList
          options={visualisations}
          selectedId={currentVisualisation}
          selectHandler={handleVisualisationChange}
        />
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