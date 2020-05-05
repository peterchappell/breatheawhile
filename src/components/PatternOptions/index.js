// @flow
import React from 'react';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Typography from '@material-ui/core/Typography';

import actions from 'context/actions';
import { useOptionsState, useOptionsDispatch } from 'context/OptionsContext';
import breathingPatterns from 'utils/breathingPatterns';

type Props = {
  onPatternSelected: Function,
};

const PatternOptions = (props: Props) => {
  const { onPatternSelected } = props;
  const dispatchSettingsChange = useOptionsDispatch();
  const { currentPattern } = useOptionsState();

  const handleSelectPattern = (event, pattern) => {
    dispatchSettingsChange({
      type: actions.SET_PATTERN,
      payload: pattern,
    });
    onPatternSelected();
  };

  return (
    <Container maxWidth="md">
      <List component="div">
        {breathingPatterns.map((pattern) => {
          const labelId = `select_${pattern.id}`;

          return (
            <ListItem
              key={`${pattern.id}_key`}
              alignItems="flex-start"
              button
              selected={currentPattern && currentPattern.id === pattern.id}
              onClick={event => handleSelectPattern(event, pattern)}
            >
              <ListItemIcon>
                { currentPattern && currentPattern.id === pattern.id ? (
                  <RadioButtonCheckedIcon title="Selected" aria-hidden={false} />
                ) : (
                  <RadioButtonUncheckedIcon title="Unselected" aria-hidden={false} />
                )}
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={pattern.name}
                secondary={
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {pattern.description}
                  </Typography>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default PatternOptions;