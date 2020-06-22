// @flow
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormLabel from "@material-ui/core/FormLabel";

import RadioButtonList from "components/RadioButtonList";
import actions from 'context/actions';
import { useOptionsState, useOptionsDispatch } from 'context/OptionsContext';
import breathingPatterns from 'utils/breathingPatterns';

type Props = {
  onPatternSelected: Function,
};

const useStyles = makeStyles((theme) => ({
  listContainer: {
    padding: [[theme.spacing(3), 0]],
  },
}));

const PatternOptions = (props: Props) => {
  const { onPatternSelected } = props;
  const dispatchSettingsChange = useOptionsDispatch();
  const { currentPattern } = useOptionsState();

  const classes = useStyles();

  const handleSelectPattern = (pattern) => {
    dispatchSettingsChange({
      type: actions.SET_PATTERN,
      payload: pattern,
    });
    onPatternSelected();
  };

  return (
    <Container maxWidth="md">
      <div className={classes.listContainer}>
        <FormLabel>Select a Breathing Pattern</FormLabel>
        <RadioButtonList
          options={breathingPatterns}
          selectedId={currentPattern && currentPattern.id}
          selectHandler={handleSelectPattern}
        />
      </div>
    </Container>
  );
};

export default PatternOptions;