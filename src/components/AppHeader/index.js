import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import PointRightIcon from '@material-ui/icons/ArrowRightAlt';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

type Props = {
  infoButtonHandler: Function,
  showInstallPrompt: Boolean,
};

const useStyles = makeStyles((theme) => ({
  siteName: {
    fontFamily: "'Pacifico', cursive",
  },
  toolbar: {
    justifyContent: 'space-between',
  },
  secondaryArea: {
    alignItems: 'center',
    display: 'flex',
  },
  installPrompt: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    height: '48px',
    marginRight: '-10px',
    paddingRight: '30px',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      marginRight: 0,
    },
    '&:focus': {
      outline: 'none',
    }
  },
  installPromptIcon: {
    animation: `$promptIconMovement 1.5s ease 1s infinite`,
    bottom: 0,
    height: '48px',
    position: 'absolute',
    right: '4px',
    top: 0,
  },
  '@keyframes promptIconMovement': {
    '30%, 60%': {
      right: '4px',
    },
    '50%, 80%': {
      right: 0,
    },
  }
}));

const AppHeader = (props: Props) => {
  const {
    infoButtonHandler,
    showInstallPrompt,
  } = props;
  const classes = useStyles();

  return (
    <AppBar position="static" component="header">
      <Toolbar className={classes.toolbar}>
        <Typography variant='h5' component='h1' className={classes.siteName}>
          Breatheawhile
        </Typography>
        <div className={classes.secondaryArea}>
          { showInstallPrompt && (
            <div
              className={classes.installPrompt}
              onClick={infoButtonHandler}
              onKeyUp={infoButtonHandler}
              role="button"
              tabIndex="-1"
            >
              <Typography variant='body2' component='p'>
                Free App
              </Typography>
              <PointRightIcon className={classes.installPromptIcon} />
            </div>
          )}
          <IconButton edge="end" color="inherit" aria-label="information" onClick={infoButtonHandler}>
            <InfoIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
};

export default AppHeader;