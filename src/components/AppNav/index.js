// @flow
import React from 'react';
import type { ElementRef } from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SpeedIcon from '@material-ui/icons/Speed';
import TuneIcon from '@material-ui/icons/Tune';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

type Props = {
  navValue: string,
  handleNavChange: Function,
  popoverAnchorRef: ElementRef,
};

const AppNav = (props: Props) => {
  const {
    navValue,
    handleNavChange,
    popoverAnchorRef,
  } = props;

  return (
    <BottomNavigation showLabels component="nav" value={navValue} onChange={handleNavChange} ref={popoverAnchorRef}>
      <BottomNavigationAction label="Sound" value="sound" icon={<VolumeUpIcon />} />
      <BottomNavigationAction label="Speed" value="speed" icon={<SpeedIcon />} />
      <BottomNavigationAction label="Display" value="display" icon={<VisibilityIcon />} />
      <BottomNavigationAction label="Pattern" value="pattern" icon={<TuneIcon />} />
    </BottomNavigation>
  )
};

export default AppNav;
