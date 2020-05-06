// @flow
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';

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
    <Snackbar
      open={showReload}
      message="New version available"
      onClick={reloadPage}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={reloadPage}
        >
          Reload
        </Button>
      }
    />
  )
};

export default ServiceWorkerManager;
