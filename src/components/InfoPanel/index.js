// @flow
import React from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';

type Props = {
  isOpen: boolean,
  closeHandler: Function,
};

const useStyles = makeStyles((theme) => ({
  headerIcon: {
    flexGrow: 0,
    flexShrink: 0,
    height: '32px',
    margin: [[0, theme.spacing(1), 0, 0]],
    width: '32px',
  },
  headerContent: {
    display: 'flex',
  },
}));

const InfoPanel = (props: Props) => {
  const {
    isOpen,
    closeHandler,
  } = props;

  const classes = useStyles();

  return (
    <Dialog
      open={isOpen}
      scroll="paper"
      aria-labelledby="dialog-title-about-breatheawhile"
    >
      <DialogTitle id="dialog-title-about-breatheawhile">
        <div className={classes.headerContent}>
          <div className={classes.headerIcon}>
            <IconButton
              aria-label="Go back to results"
              size="small"
              onClick={closeHandler}
              data-testid="close_button_icon"
            >
              <CloseIcon />
            </IconButton>
          </div>
          About Breatheawhile
        </div>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="div">
          <Typography variant="body1" component="p" gutterBottom>
            Breathing in a pattern can help with relaxation and stress relief.
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Select one of the patterns and adjust the speed to suit your depth of breath. The visualisations can help you keep your rhythm. You can also use the sound and vibrations to keep in time.
          </Typography>
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