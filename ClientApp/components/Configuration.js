import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';
import ParamDownloadButton from '../custom/buttons/ParamDownloadButton';
import SaveIcon from '@material-ui/icons/Save';
import { httpClient } from '../custom/authProvider';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';
import { Title, useNotify } from 'react-admin';
import Icon from '@material-ui/icons/SettingsApplications';
import TimezoneSelect from 'react-timezone-select';
import FormLabel from '@material-ui/core/FormLabel';

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

export const ConfigurationIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

const Configuration = () => {
  const notify = useNotify();
  const [values, setValues] = useState({
    vssIntegrated: false,
    vssUrl: null,
    deviceId: null,
    authorization: null,
    sigisInterval: null,
    edi832Interval: null,
    edi855Interval: null,
    profitMargin: null,
    taxPercentage: null,
    followMarkup: false,
    trancloudEnabled: false,
    creditCardLikeCash: false,
    rxSignatureNeeded: false,
    printOnlyRx: false,
    initialPointReward: null,
    redeemThresholdPoint: null,
    dollarPointConversionRatio: null,
    pointDollarConversionRatio: null,
    printCopy: null,
    loyaltyEnabled: false,
    timezone: '',
  });

  useEffect(() => {
    httpClient(`api/configurations?pageSize=${50}`, { method: 'GET' })
      .then(res => JSON.parse(res.body))
      .then(json => {
        json.forEach(c => {
          if (typeof values[c.configCode] === 'boolean') {
            c.configValue = c.configValue.toLowerCase() == 'true';
          }

          if (c.status !== 'Active') c.configValue = null;

          setValues(prevValues => ({
            ...prevValues,
            [c.configCode]: c.configValue,
          }));
        }, this);
      });
  }, []);

  const handleSubmit = () =>
    httpClient('api/configurations', {
      method: 'PUT',
      body: JSON.stringify(values),
    })
      .then(response => {
        notify('Configuration updated');
      })
      .catch(error => {
        // failure side effects go here
        notify(`Configuration saving error: ${error.message}`, 'warning');
      });

  const handleTimezoneChange = e => {
    console.log(e);

    setValues(prevValues => ({ ...prevValues, timezone: e.value }));
  };

  const handleInputChange = e => {
    e.persist();
    setValues(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSwitchChange = (e, value) => {
    e.persist();
    setValues(prevValues => ({ ...prevValues, [e.target.name]: value }));
  };

  return (
    <>
      <Title title="Configurations" />

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
          <ParamDownloadButton />
        </div>
      </div>
      <Card>
        <CardContent>
          <div style={{ width: 300 }}>
            <FormLabel component="legend">Timezone</FormLabel>
            <TimezoneSelect
              value={values.timezone}
              onChange={handleTimezoneChange}
            />
          </div>
          <br />
          <FormGroup row>
            {values.printCopy !== null && (
              <TextField
                label="Print Copy"
                name="printCopy"
                onChange={handleInputChange}
                style={{ width: 100 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                value={values.printCopy}
              />
            )}
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            {values.vssIntegrated !== null && (
              <FormControlLabel
                control={
                  <Switch
                    name="vssIntegrated"
                    checked={values.vssIntegrated}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  <Typography style={{ fontSize: 12 }}>
                    Is Vss Enabled
                  </Typography>
                }
              />
            )}
            {values.printOnlyRx !== null && (
              <FormControlLabel
                control={
                  <Switch
                    name="printOnlyRx"
                    checked={values.printOnlyRx}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  <Typography style={{ fontSize: 12 }}>
                    Print only rx
                  </Typography>
                }
              />
            )}
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            {values.vssUrl !== null && (
              <TextField
                label="VSS Url"
                name="vssUrl"
                onChange={handleInputChange}
                style={{ width: 300, marginRight: 20 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                value={values.vssUrl}
              />
            )}
            {values.deviceId !== null && (
              <TextField
                label="Device"
                onChange={handleInputChange}
                style={{ marginRight: 20 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                name="deviceId"
                value={values.deviceId}
              />
            )}
            {values.authorization !== null && (
              <TextField
                label="Token"
                onChange={handleInputChange}
                style={{ width: 300 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                name="authorization"
                value={values.authorization}
              />
            )}
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            {values.sigisInterval !== null && (
              <TextField
                name="sigisInterval"
                value={values.sigisInterval}
                onChange={handleInputChange}
                label="Sigis Interval"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end"> days</InputAdornment>
                  ),
                }}
                style={{ width: 150, marginRight: 20 }}
              />
            )}
            {values.edi832Interval !== null && (
              <TextField
                name="edi832Interval"
                value={values.edi832Interval}
                onChange={handleInputChange}
                label="Edi832 Interval"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end"> minutes</InputAdornment>
                  ),
                }}
                style={{ width: 150, marginRight: 20 }}
              />
            )}
            {values.edi855Interval !== null && (
              <TextField
                name="edi855Interval"
                value={values.edi855Interval}
                onChange={handleInputChange}
                label="Edi855 Interval"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end"> minutes</InputAdornment>
                  ),
                }}
                style={{ width: 150 }}
              />
            )}
          </FormGroup>

          <FormGroup row style={{ marginTop: 30 }}>
            {values.profitMargin !== null && (
              <TextField
                name="profitMargin"
                value={values.profitMargin}
                onChange={handleInputChange}
                label="Profit Margin"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end"> %</InputAdornment>
                  ),
                }}
                style={{ width: 150 }}
              />
            )}
            {values.taxPercentage !== null && (
              <TextField
                name="taxPercentage"
                value={values.taxPercentage}
                onChange={handleInputChange}
                label="Tax Percentage"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end"> %</InputAdornment>
                  ),
                }}
                style={{ marginLeft: 20, width: 150 }}
              />
            )}
          </FormGroup>

          {values.followMarkup !== null && (
            <FormGroup row style={{ marginTop: 30 }}>
              <FormControlLabel
                control={
                  <Switch
                    name="followMarkup"
                    checked={values.followMarkup}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  <Typography style={{ fontSize: 12 }}>
                    Follow Markup
                  </Typography>
                }
              />
            </FormGroup>
          )}

          <FormGroup row>
            {values.trancloudEnabled !== null && (
              <FormControlLabel
                control={
                  <Switch
                    name="trancloudEnabled"
                    checked={values.trancloudEnabled}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  <Typography style={{ fontSize: 12 }}>
                    Trancloud Enabled
                  </Typography>
                }
              />
            )}
            {values.rxSignatureNeeded !== null && (
              <FormControlLabel
                control={
                  <Switch
                    name="rxSignatureNeeded"
                    checked={values.rxSignatureNeeded}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  <Typography style={{ fontSize: 12 }}>
                    Rx signature needed
                  </Typography>
                }
              />
            )}
          </FormGroup>
          <FormGroup row>
            {values.loyaltyEnabled !== null && (
              <FormControlLabel
                control={
                  <Switch
                    name="loyaltyEnabled"
                    checked={values.loyaltyEnabled}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  <Typography style={{ fontSize: 12 }}>
                    Loyalty Enabled
                  </Typography>
                }
              />
            )}
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            {values.initialPointReward !== null && (
              <TextField
                label="Initial Reward"
                name="initialPointReward"
                value={values.initialPointReward}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                style={{ width: 150 }}
              />
            )}

            {values.redeemThresholdPoint !== null && (
              <TextField
                label="Redeem Threshold"
                name="redeemThresholdPoint"
                value={values.redeemThresholdPoint}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                style={{ marginLeft: 20, width: 150 }}
              />
            )}

            {values.dollarPointConversionRatio !== null && (
              <TextField
                label="Dollar to point conversion ratio"
                name="dollarPointConversionRatio"
                value={values.dollarPointConversionRatio}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                style={{ marginLeft: 20, width: 150 }}
              />
            )}

            {values.pointDollarConversionRatio !== null && (
              <TextField
                label="Point to dollar conversion ratio"
                name="pointDollarConversionRatio"
                value={values.pointDollarConversionRatio}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"></InputAdornment>
                  ),
                }}
                style={{ marginLeft: 20, width: 150 }}
              />
            )}
          </FormGroup>
          <FormGroup row style={{ marginTop: 30 }}>
            {values.creditCardLikeCash !== null && (
              <FormControlLabel
                control={
                  <Switch
                    name="creditCardLikeCash"
                    checked={values.creditCardLikeCash}
                    onChange={handleSwitchChange}
                  />
                }
                label={
                  <Typography style={{ fontSize: 12 }}>
                    Credit Card like Cash
                  </Typography>
                }
              />
            )}
          </FormGroup>
        </CardContent>
      </Card>
    </>
  );
};

export default Configuration;
