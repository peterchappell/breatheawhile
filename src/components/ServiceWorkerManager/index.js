// @flow
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

import * as serviceWorker from 'serviceWorker';

const ServiceWorkerManager = () => {
  const [showReload, setShowReload] = useState(false);
  const [waitingWorker, setWaitingWorker] = useState(false);

  const onServiceWorkerUpdate = (registration) => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  }

  const reloadPage = () => {
    if (waitingWorker && waitingWorker.postMessage) {
      waitingWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setShowReload(false);
    window.location.reload(true);
  };

  useEffect(() => {
    serviceWorker.register(
      {
        onUpdate: onServiceWorkerUpdate,
      });
  }, []);

  return (
    <Dialog
      open={showReload}
      aria-labelledby="new-version-message"
    >
      <DialogContent>
        <DialogContentText component="div" id="new-version-message">
          <Typography variant="body1" component="p" gutterBottom>
            Breatheawhile has been updated. Reload to get the latest version.
          </Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          size="small"
          onClick={reloadPage}
          autoFocus
        >
          Reload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ServiceWorkerManager;
