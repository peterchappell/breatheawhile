// @flow
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  itemButton: {
    '&:hover': {
      backgroundColor: 'inherit',
    }
  },
  itemRoot: {
    padding: [['3px', 0]],
  },
  itemIcon: {
    minWidth: 0,
    marginRight: '7px',
  }
}));

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

  const classes = useStyles();

  const handleSelectOption = (event, option) => {
    selectHandler(option);
  };

  return (
    <List component="div" disablePadding>
      {options.map((option) => {
        const isSelected = option.id === selectedId;

        return (
          <ListItem
            key={`${option.id}_key`}
            alignItems="flex-start"
            button
            disableGutters
            onClick={event => handleSelectOption(event, option)}
            classes={{ root: classes.itemRoot, button: classes.itemButton }}
          >
            <ListItemIcon className={classes.itemIcon}>
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