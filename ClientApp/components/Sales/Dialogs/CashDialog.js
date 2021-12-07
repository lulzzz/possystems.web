import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

export default function CashDialog({ open, handleClose }) {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleclick = e => {
    dispatch({ type: 'PAY_CASH', payload: { cash: e.target.value } });
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Cash payment</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter the amount you want to pay by cash
        </DialogContentText>

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            autoFocus
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            margin="dense"
            type="number"
            value={cart.total}
          />
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleclick} color="primary">
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

CashDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
