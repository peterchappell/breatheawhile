// @flow
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

import CloseIcon from "@material-ui/icons/Close";
import DisplayOptions from 'components/DisplayOptions';
import IconButton from "@material-ui/core/IconButton";
import PatternOptions from 'components/PatternOptions';
import SoundOptions from 'components/SoundOptions';
import SpeedOptions from 'components/SpeedOptions';

const useStyles = makeStyles((theme) => ({
  popoverStyle: {
    transform: `translateY(-20px)`,
    marginBottom: '56px',
  },
  fullWidthPopover: {
    paddingTop: theme.spacing(3),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: '700px',
    }
  },
  popoverContents: {
    paddingTop: theme.spacing(3),
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

type Props = {
  navValue: string,
  closeAllDrawers: Function,
  popoverAnchorRef: any, // should be a React.ElementRef but it's flaky
};

const AppOptions = (props: Props) => {
  const {
    navValue,
    closeAllDrawers,
    popoverAnchorRef,
  } = props;

  const classes = useStyles();

  const closeButton = (
    <IconButton
      color="inherit"
      className={classes.closeButton}
      onClick={closeAllDrawers}
      aria-label="close"
    >
      <CloseIcon />
    </IconButton>
  );

  return (
    <>
      <Popover
        anchor="bottom"
        open={navValue === 'sound'}
        onClose={closeAllDrawers}
        anchorEl={popoverAnchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{
          root: classes.popoverStyle,
          paper: classes.popoverContents,
        }}
        data-testid="popover_sound"
      >
        {closeButton}
        <SoundOptions />
      </Popover>
      <Popover
        anchor="bottom"
        open={navValue === 'speed'}
        onClose={closeAllDrawers}
        anchorEl={popoverAnchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.fullWidthPopover,
        }}
        className={classes.popoverStyle}
        data-testid="popover_speed"
      >
        {closeButton}
        <SpeedOptions />
      </Popover>
      <Popover
        anchor="bottom"
        open={navValue === 'display'}
        onClose={closeAllDrawers}
        anchorEl={popoverAnchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{
          root: classes.popoverStyle,
          paper: classes.popoverContents,
        }}
        data-testid="popover_display"
      >
        {closeButton}
        <DisplayOptions />
      </Popover>
      <Popover
        anchor="bottom"
        open={navValue === 'pattern'}
        onClose={closeAllDrawers}
        anchorEl={popoverAnchorRef.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        classes={{
          paper: classes.fullWidthPopover,
        }}
        className={classes.popoverStyle}
        data-testid="popover_pattern"
      >
        {closeButton}
        <PatternOptions onPatternSelected={closeAllDrawers} />
      </Popover>
    </>
  )
};

export default AppOptions;
