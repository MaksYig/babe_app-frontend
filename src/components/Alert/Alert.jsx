import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});
function SlideTransition(props) {
  return <Slide {...props} direction='up' />;
}

const AlertsToast = (props) => {
  const alerts = useSelector((state) => state?.alert);
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {alerts.length > 0 &&
        alerts.map((alert) => {
          return (
            <Snackbar
              open={open}
              onClose={handleClose}
              key={alert.id}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert
                onClose={handleClose}
                severity={alert?.alertType}
                sx={{ width: '100%' }}
              >
                {alert?.msg}
              </Alert>
            </Snackbar>
          );
        })}
    </div>
  );
};

export default AlertsToast;
