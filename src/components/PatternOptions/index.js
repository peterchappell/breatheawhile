import React from 'react';

import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Typography from '@material-ui/core/Typography';

import breathingPatterns from 'utils/breathingPatterns';

const PatternOptions = (props) => {
  const {
    selectedPattern,
    handlePatternSelect,
  } = props;

  return (
    <Container maxWidth="md">
      <List>
        {breathingPatterns.map((pattern) => {
          const labelId = `select_${pattern.id}`;

          return (
            <ListItem
              key={`${pattern.id}_key`}
              alignItems="flex-start"
              button
              selected={selectedPattern.id === pattern.id}
              onClick={event => handlePatternSelect(event, pattern)}
            >
              <ListItemIcon>
                { selectedPattern.id === pattern.id ? (
                  <RadioButtonCheckedIcon />
                ) : (
                  <RadioButtonUncheckedIcon />
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