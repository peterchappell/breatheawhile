// @flow
import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';

type Props = {
  isOpen: boolean,
  closeHandler: Function,
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    margin: '0 auto',
    maxWidth: '700px',
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(5),
    }
  },
  installContainer: {
    alignItems: 'center',
    backgroundColor: theme.palette.grey["100"],
    display: 'flex',
    justifyContent: 'space-between',
    margin: [[theme.spacing(2)*-1, theme.spacing(3)*-1, theme.spacing(3), theme.spacing(3)*-1]],
  },
  installContainerCell: {
    padding: theme.spacing(3),
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

const InfoPanel = (props: Props) => {
  const {
    isOpen,
    closeHandler,
  } = props;
  const classes = useStyles();
  const [installPromptEvent, setInstallPromptEvent] = useState();
  const [isInstallStarted, setIsInstallStarted] = useState(false);

  const handleInstall = () => {
    installPromptEvent.prompt();
    setIsInstallStarted(true);
  };

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    setInstallPromptEvent(event);
  });

  return (
    <Dialog
      fullScreen
      open={isOpen}
      scroll="paper"
      aria-labelledby="dialog-title-about-breatheawhile"
      TransitionComponent={Transition}
    >
      <DialogTitle id="dialog-title-about-breatheawhile">
        <IconButton edge="start" color="inherit" onClick={closeHandler} aria-label="close">
          <CloseIcon />
        </IconButton>
        About Breatheawhile
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="div">
          <div className={classes.dialogContent}>
            { (installPromptEvent && !isInstallStarted) && (
              <div className={classes.installContainer}>
                <Typography variant="subtitle2" component="p" className={classes.installContainerCell}>
                  Access Breatheawhile more easily with our FREE&nbsp;APP!
                </Typography>
                <div className={classes.installContainerCell}>
                  <Button variant="contained" color="primary" size="small" onClick={handleInstall}>
                    Install
                  </Button>
                </div>
              </div>
            )}
            <Typography variant="body1" component="p" gutterBottom>
              Breathing exercises can help with relaxation and stress relief.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Select one of the patterns and adjust the speed to suit your depth of breath. The visualisations can help you keep your rhythm. You can also use the sound and vibrations to keep in time.
            </Typography>
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeHandler} color="primary" autoFocus data-testid="close_button_text">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
};

export default InfoPanel;