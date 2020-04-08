import React from 'react';

import Popover from '@material-ui/core/Popover';

import DisplayOptions from 'components/DisplayOptions';
import PatternOptions from 'components/PatternOptions';
import SoundOptions from 'components/SoundOptions';
import SpeedOptions from 'components/SpeedOptions';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  popoverStyle: {
    transform: `translateY(-20px)`,
    marginBottom: '56px',
  },
  fullWidthPopover: {
    width: '100%',
  },
}));

const AppOptions = (props) => {
  const {
    navValue,
    closeAllDrawers,
    popoverAnchorRef,
    beepOnSecond,
    toggleBeepOnSecond,
    beepOnChange,
    toggleBeepOnChange,
    buzzOnSecond,
    toggleBuzzOnSecond,
    buzzOnChange,
    toggleBuzzOnChange,
    showInstructions,
    toggleShowInstructions,
    selectedPattern,
    handlePatternSelect,
    setTimeUnitInSeconds,
  } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
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
      >
        <SoundOptions
          beepOnSecond = {beepOnSecond}
          toggleBeepOnSecond = {toggleBeepOnSecond}
          beepOnChange = {beepOnChange}
          toggleBeepOnChange = {toggleBeepOnChange}
          buzzOnSecond = {buzzOnSecond}
          toggleBuzzOnSecond = {toggleBuzzOnSecond}
          buzzOnChange = {buzzOnChange}
          toggleBuzzOnChange = {toggleBuzzOnChange}
        />
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
      >
        <SpeedOptions setTimeUnitInSeconds={setTimeUnitInSeconds} />
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
      >
        <DisplayOptions
          showInstructions = {showInstructions}
          toggleShowInstructions = {toggleShowInstructions}
        />
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
      >
        <PatternOptions
          selectedPattern={selectedPattern}
          handlePatternSelect={handlePatternSelect}
        />
      </Popover>
    </React.Fragment>
  )
};

export default AppOptions;
