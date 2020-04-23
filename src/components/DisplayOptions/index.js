import React from 'react';

import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import useGlobalStyles from 'hooks/useGlobalStyles';

const DisplayOptions = (props) => {
  const {
    showInstructions,
    toggleShowInstructions,
  } = props;

  const globalClasses = useGlobalStyles();

  return (
    <Container maxWidth="md">
      <FormControl component="fieldset" className={globalClasses.formControl}>
        <FormLabel component="legend">Display</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={showInstructions}
                onChange={toggleShowInstructions}
                data-testid="display_options_checkbox"
              />
            }
            label="Show instruction prompt"
          />
        </FormGroup>
      </FormControl>
    </Container>
  );
};

export default DisplayOptions;