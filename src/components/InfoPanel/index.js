// @flow
import React from 'react';

import Button from "@material-ui/core/Button";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

type Props = {
  isOpen: boolean,
  closeHandler: Function,
};

const InfoPanel = (props: Props) => {
  const {
    isOpen,
    closeHandler,
  } = props;

  return (
    <Dialog
      open={isOpen}
      scroll="paper"
      aria-labelledby="dialog-title-about-breatheawhile"
    >
      <DialogTitle id="dialog-title-about-breatheawhile">
        About Breatheawhile
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="div">
          <Typography variant="body1" component="p" gutterBottom>
            Breathing exercises can help with relaxation and stress relief.
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