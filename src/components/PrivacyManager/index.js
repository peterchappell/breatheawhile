// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import DialogTitle from "@material-ui/core/DialogTitle";
import {makeStyles} from "@material-ui/core/styles";

type Props = {
  continueHandler: Function,
};

const useStyles = makeStyles((theme) => ({
  paragraph: {
    margin: [[0, 0, theme.spacing(1)]],
  },
  list: {
    margin: [[theme.spacing(1), 0]],
    paddingLeft: theme.spacing(3),
  }
}));

const ServiceWorkerManager = (props: Props) => {
  const {
    continueHandler,
  } = props;

  const classes = useStyles();

  return (
    <Dialog
      open
      aria-labelledby="privacy-message"
    >
      <DialogTitle id="dialog-title-about-breatheawhile">
        Privacy and data
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText component="div" id="privacy-message">
          <Typography variant="body1" component="div" gutterBottom>
            <p className={classes.paragraph}>Like most things on the web, Breatheawhile stores some data.</p>
            <ul className={classes.list}>
              <li>We don&apos;t ask for or store any of your personal details.</li>
              <li>We track some non-personal data for analytics.</li>
            </ul>
            <p className={classes.paragraph}>A <a href="/privacy.html" target="_blank">privacy policy</a> is provided (opens in a new tab).</p>
            <p className={classes.paragraph}>Do you want to continue?</p>
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          onClick={continueHandler}
          autoFocus
        >
          Agree and continue
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceWorkerManager;
