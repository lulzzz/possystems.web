import React, { useState, useEffect } from 'react';
import { useNotify } from 'react-admin';
import Button from '@material-ui/core/Button';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import axios from 'axios';

export default function FormDialog() {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]);

  const notify = useNotify();

  const handleChange = event => {
    setRole(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAssign = () => {
    axios
      .post(`api/roleclaims/assign/${role}`)
      .then(() => {
        notify('resources.roleclaims.success', 'info');
      })
      .catch(err => {
        notify('resources.roleclaims.error', 'warning');
      })
      .then(() => setOpen(false));
  };

  useEffect(() => {
    axios
      .get('api/roles')
      .then(r => {
        setRoles(r.data);
        return r.data;
      })
      .catch(err => {
        notify('pos.resources.roles.error', 'warning');
      })
      .then(r => {
        const [first] = r;
        first && setRole(first.id);
      });
  }, []);

  return (
    <div>
      <Button
        color="primary"
        onClick={handleClickOpen}
        style={{ height: 30 }}
        startIcon={<AllInclusiveIcon />}
      >
        Assign all
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please select the role to be assigned with all the claims.
          </DialogContentText>
          <Select onChange={handleChange} value={role}>
            {roles.map(r => (
              <MenuItem key={r.id} value={r.id}>
                {r.roleName}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssign} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
