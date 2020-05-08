import React, { useState } from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import InfoPanel from 'components/InfoPanel';

const useStyles = makeStyles(() => ({
  siteName: {
    fontFamily: "'Pacifico', cursive",
  },
  toolbar: {
    justifyContent: 'space-between',
  }
}));

const AppHeader = () => {
  const classes = useStyles();
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const openInfo = () => {
    setIsInfoOpen(true);
  };

  const closeInfo = () => {
    setIsInfoOpen(false);
  };

  return (
    <AppBar position="static" component="header">
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' component='h1' className={classes.siteName}>
          Breatheawhile
        </Typography>
        <div>
          <IconButton edge="end" color="inherit" aria-label="information" onClick={openInfo}>
            <InfoIcon />
          </IconButton>
        </div>
      </Toolbar>
      <InfoPanel isOpen={isInfoOpen} closeHandler={closeInfo} />
    </AppBar>
  )
};

export default AppHeader;