import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CashDialog from './CashDialog';
import CheckDialog from './CheckDialog';
import PropTypes from 'prop-types';

const PayDialog = ({ open, handleClose, onOverride }) => {
  const [cashOpen, setCashOpen] = React.useState(false);
  const [checkOpen, setCheckOpen] = React.useState(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Payment method</DialogTitle>
      <DialogContent>
        <DialogContentText>Please select the payment method</DialogContentText>

        <div>
          <div style={styles.actionRow}>
            <Button
              style={{ ...styles.actionButton, backgroundColor: '#263238' }}
            >
              Credit Debit
            </Button>
            <Button
              style={{ ...styles.actionButton, backgroundColor: '#004D40' }}
            >
              FSA
            </Button>
          </div>
          <div style={styles.actionRow}>
            <Button
              style={{ ...styles.actionButton, backgroundColor: '#33691E' }}
              onClick={() => setCashOpen(true)}
            >
              Cash
            </Button>
            <Button
              style={{ ...styles.actionButton, backgroundColor: '#827717' }}
              onClick={() => setCheckOpen(true)}
            >
              Bank Check
            </Button>
          </div>
          <div style={styles.actionRow}>
            <Button
              style={{ ...styles.actionButton, backgroundColor: '#F57F17' }}
              onClick={() => onOverride()}
            >
              Discount
            </Button>
          </div>
          <div style={styles.actionRow}>
            <Button
              style={{ ...styles.actionButton, backgroundColor: '#4A148C' }}
            >
              Manual Entry
            </Button>
            <Button
              style={{ ...styles.actionButton, backgroundColor: '#311B92' }}
            >
              Manual FSA
            </Button>
          </div>

          <CashDialog open={cashOpen} handleClose={() => setCashOpen(false)} />
          <CheckDialog
            open={checkOpen}
            handleClose={() => setCheckOpen(false)}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const styles = {
  actionRow: {
    display: 'flex',
    flexDirection: 'row',
    padding: 1,
  },
  actionButton: {
    color: '#fff',
    margin: 2,
    width: '48%',
    minHeight: 75,
    minWidth: 75,
  },
};

export default PayDialog;

PayDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onOverride: PropTypes.func,
};
