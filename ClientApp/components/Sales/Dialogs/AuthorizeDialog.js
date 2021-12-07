import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

export default function AuthorizeDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Override Authorization</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the credentials needed to perform this action
        </DialogContentText>

        <TextField
          autoFocus
          id="outlined-textfield-username"
          margin="dense"
          label="Username"
          variant="outlined"
          fullWidth
        />

        <br />
        <TextField
          id="outlined-textfield-password"
          label="Password"
          type="password"
          margin="dense"
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClose} color="primary">
          Access
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AuthorizeDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
