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

import useGlobalStyles from 'hooks/useGlobalStyles';

const SoundOptions = (props) => {

  const {
    beepOnSecond,
    toggleBeepOnSecond,
    beepOnChange,
    toggleBeepOnChange,
    buzzOnSecond,
    toggleBuzzOnSecond,
    buzzOnChange,
    toggleBuzzOnChange,
  } = props;

  const globalClasses = useGlobalStyles();

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
                checked={beepOnSecond}
                onChange={toggleBeepOnSecond}
              />
            }
            label="On every count"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={beepOnChange}
                onChange={toggleBeepOnChange}
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
                checked={buzzOnSecond}
                onChange={toggleBuzzOnSecond}
              />
            }
            label="On every count"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={buzzOnChange}
                onChange={toggleBuzzOnChange}
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