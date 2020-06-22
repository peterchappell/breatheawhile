// @flow
import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Typography from '@material-ui/core/Typography';

type Option = {
  name: string,
  description: string,
  id: number | string,
};

type Props = {
  selectHandler: Function,
  options: Array<Option>,
  selectedId: number,
};

const RadioButtonList = (props: Props) => {
  const {
    options,
    selectedId,
    selectHandler,
  } = props;

  const handleSelectOption = (event, option) => {
    selectHandler(option);
  };

  return (
    <List component="div">
      {options.map((option) => {
        const isSelected = option.id === selectedId;

        return (
          <ListItem
            key={`${option.id}_key`}
            alignItems="flex-start"
            button
            selected={isSelected}
            onClick={event => handleSelectOption(event, option)}
          >
            <ListItemIcon>
              { isSelected ? (
                <RadioButtonCheckedIcon title="Selected" aria-hidden={false} color="secondary" />
              ) : (
                <RadioButtonUncheckedIcon title="Unselected" aria-hidden={false} />
              )}
            </ListItemIcon>
            <ListItemText
              id={`${option.id}_label_key`}
              primary={option.name}
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {option.description}
                </Typography>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default RadioButtonList;