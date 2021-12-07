import { Title, useNotify, usePermissions } from 'react-admin';
import Icon from '@material-ui/icons/Timer';
import { useTheme, withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { Alert, AlertTitle } from '@material-ui/lab';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const SessionIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

let user = { userName: null, fullName: null, email: null };
let chars = [];

const Session = () => {
  const [session, setSession] = useState({
    startTime: null,
    endTime: null,
    onGoing: false,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(true);

  const notify = useNotify();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleAgree = () => {
    punch();
  };

  const handleClickOpen = () => {
    setDialogOpen(true);
  };

  const punch = () => {
    let barcode = chars.join('');
    axios
      .post(`api/sessions/punch?barcode=${barcode}`)
      .then(res => {
        setSession(res.data);
        if (res.data.onGoing) {
          notify('pos.session.start', 'info');
        } else {
          notify('pos.session.end', 'info');
          setDialogOpen(false);
        }
      })
      .catch(err => {
        notify('pos.session.error.barcode', 'warning');
        setDialogOpen(false);
      })
      .then(() => {
        chars = [];
      });
  };

  const scanBarcode = useCallback(
    e => {
      if (
        (e.which >= 48 && e.which <= 57) ||
        (e.which >= 65 && e.which <= 90)
      ) {
        chars.push(e.key);
      }

      if (e.which == 13 && chars.length > 0) {
        if (session.onGoing) {
          handleClickOpen();
        } else {
          punch();
        }
      }
    },
    [session, dialogOpen],
  );

  useEffect(() => {
    axios
      .get('api/users/current')
      .then(u => {
        user = u.data;
        axios
          .get('api/sessions/status')
          .then(res => {
            setSession(res.data);
          })
          .catch(err => {
            notify('pos.session.error.status', 'warning');
          });
      })
      .catch(err => {
        notify('pos.session.error.user', 'warning');
      });
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', scanBarcode, false);

    return () => {
      document.removeEventListener('keydown', scanBarcode, false);
    };
  }, [scanBarcode]);

  const { permissions } = usePermissions();

  return permissions?.includes('session') ? (
    <>
      <Title title="Session" />
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Collapse in={alertOpen}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setAlertOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                >
                  Please scan the id card given to you to{' '}
                  {session.onGoing ? 'end' : 'start'} session.
                </Alert>
              </Collapse>
            </Grid>
            {session.onGoing ? (
              <Grid item>
                <Alert severity="warning">
                  <AlertTitle>Warning</AlertTitle>
                  You have a session ongoing started from —{' '}
                  <strong>
                    {session.startTimeStr} ({session.sessionTime} hours now)
                  </strong>
                </Alert>
              </Grid>
            ) : (
              <Grid item>
                <Alert severity="info">
                  <AlertTitle>Info</AlertTitle>
                  Your last session was — from{' '}
                  <strong>{session.startTimeStr}</strong> to{' '}
                  <strong>
                    {session.endTimeStr} ({session.sessionTime} hours)
                  </strong>
                </Alert>
              </Grid>
            )}
            <Grid item>Username: {user.userName}</Grid>
            <Grid item>Full name: {user.fullName}</Grid>
            <Grid item>Email: {user.email}</Grid>
          </Grid>
        </CardContent>
      </Card>
      <Dialog
        fullScreen={fullScreen}
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{'End Session?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your session will end now. Do you agree?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  ) : (
    <Card>
      <Title title="Not Authorized" />
      <CardContent>
        <h1>Access not authorized</h1>
      </CardContent>
    </Card>
  );
};

export default Session;
