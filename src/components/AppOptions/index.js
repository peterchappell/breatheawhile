// @flow
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

import DisplayOptions from 'components/DisplayOptions';
import PatternOptions from 'components/PatternOptions';
import SoundOptions from 'components/SoundOptions';
import SpeedOptions from 'components/SpeedOptions';

const useStyles = makeStyles(() => ({
  popoverStyle: {
    transform: `translateY(-20px)`,
    marginBottom: '56px',
  },
  fullWidthPopover: {
    width: '100%',
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
        className={classes.popoverStyle}
        data-testid="popover_sound"
      >
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
        className={classes.popoverStyle}
        data-testid="popover_display"
      >
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
        <PatternOptions onPatternSelected={closeAllDrawers} />
      </Popover>
    </>
  )
};

export default AppOptions;
