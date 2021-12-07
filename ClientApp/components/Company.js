import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';
import { Title, useNotify, usePermissions } from 'react-admin';
import Icon from '@material-ui/icons/EmojiTransportation';

import axios from 'axios';

const styles = {
  buttonContainer: {
    float: 'right',
    margin: 10,
  },
  saveButton: {
    marginRight: 10,
  },
  icon: {
    color: deepOrange[600],
  },
};

export const CompanyIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

const Company = () => {
  const notify = useNotify();
  const { permissions } = usePermissions();

  const [values, setValues] = useState({
    id: null,
    name: null,
    address: null,
    address2: null,
    phone: null,
    email: null,
    website: null,
    notes: null,
    smtpServer: null,
    smtpUser: null,
    smtpPassword: null,
    smtpPort: null,
  });

  useEffect(() => {
    axios
      .get('api/companies/my')
      .then(res => res.data)
      .then(json => setValues(json));
  }, []);

  const handleSubmit = () =>
    axios
      .put('api/companies/my', values)
      .then(response => {
        notify('Company updated');
      })
      .catch(error => {
        // failure side effects go here
        notify(`Company saving error: ${error.message}`, 'warning');
      });

  const handleInputChange = e => {
    e.persist();
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  return permissions?.includes('company') ? (
    <>
      <Title title="Company" />

      <div style={{ width: '100%' }}>
        <div style={styles.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            style={styles.saveButton}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
      <Card>
        <CardContent>
          <FormGroup row style={{ marginTop: 30 }}>
            <TextField
              label="Name"
              name="name"
              onChange={handleInputChange}
              style={{ width: 300, marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={values.name}
            />
            <TextField
              label="Phone"
              onChange={handleInputChange}
              style={{ marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              name="phone"
              value={values.phone}
            />
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            <TextField
              label="Address"
              name="address"
              onChange={handleInputChange}
              style={{ width: 300, marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={values.address}
            />
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            <TextField
              label="Address2"
              name="address2"
              onChange={handleInputChange}
              style={{ width: 300, marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={values.address2}
            />
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            <TextField
              label="Email"
              name="email"
              onChange={handleInputChange}
              style={{ width: 300, marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={values.email}
            />
            <TextField
              label="Website"
              onChange={handleInputChange}
              style={{ marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              name="website"
              value={values.website}
            />
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            <TextField
              label="Smtp Server"
              name="smtpServer"
              onChange={handleInputChange}
              style={{ width: 300, marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={values.smtpServer}
            />
            <TextField
              label="Smtp Port"
              type="number"
              onChange={handleInputChange}
              style={{ width: 100 }}
              name="smtpPort"
              value={values.smtpPort}
            />
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            <TextField
              label="Smtp User"
              onChange={handleInputChange}
              style={{ marginRight: 20 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              name="smtpUser"
              value={values.smtpUser}
            />
            <TextField
              label="Smtp Password"
              onChange={handleInputChange}
              style={{ width: 500 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              name="smtpPassword"
              value={values.smtpPassword}
            />
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            <TextField
              label="Notes"
              name="notes"
              multiline
              rows={10}
              onChange={handleInputChange}
              style={{ width: 700 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"></InputAdornment>
                ),
              }}
              value={values.notes}
            />
          </FormGroup>
        </CardContent>
      </Card>
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

export default Company;
