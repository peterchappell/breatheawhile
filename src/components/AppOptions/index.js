// @flow
import React from 'react';
import type { ElementRef } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

import DisplayOptions from 'components/DisplayOptions';
import PatternOptions from 'components/PatternOptions';
import SoundOptions from 'components/SoundOptions';
import SpeedOptions from 'components/SpeedOptions';
import type { Pattern } from 'utils/flow/flow-types';

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
  popoverAnchorRef: ElementRef,
  timeUnitInSeconds: number,
  setTimeUnitInSeconds: Function,
  selectedPattern: Pattern,
  handlePatternSelect: Function,
};

const AppOptions = (props: Props) => {
  const {
    navValue,
    closeAllDrawers,
    popoverAnchorRef,
    selectedPattern,
    handlePatternSelect,
    timeUnitInSeconds,
    setTimeUnitInSeconds,
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
        <SpeedOptions
          setTimeUnitInSeconds={setTimeUnitInSeconds}
          timeUnitInSeconds={timeUnitInSeconds}
        />
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
        <PatternOptions
          selectedPattern={selectedPattern}
          handlePatternSelect={handlePatternSelect}
        />
      </Popover>
    </>
  )
};

export default AppOptions;
