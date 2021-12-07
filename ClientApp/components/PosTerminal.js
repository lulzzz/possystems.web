import React from 'react';
import {
  SimpleForm,
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
  required,
} from 'react-admin';

import Icon from '@material-ui/icons/SettingsRemote';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const PosTerminalIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const PosTerminalList = props => (
  <List {...props} title="POS Terminals" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="terminalName" label="Name" />
      <TextField source="refNo" label="RefNo" />
      <TextField source="pinpadIpPort" label="Pinpad Ip Port" />
      <TextField source="pinpadMacAddress" label="Pinpad Mac Address" />
      <TextField source="comPort" label="Com Port" />
      <TextField source="ipAddress" label="Ip Address" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />

      <EditButton />
    </Datagrid>
  </List>
);

const PosTerminalTitle = ({ record }) => {
  return <span>POS Terminal - {record ? `${record.terminalName}` : ''}</span>;
};

export const PosTerminalEdit = props => (
  <Edit title={<PosTerminalTitle />} {...props}>
    <SimpleForm>
      <TextInput source="terminalName" label="Name" validate={required()} />
      <TextInput source="refNo" label="Ref No" />
      <TextInput source="pinpadIpPort" label="Pinpad Ip Port" />
      <TextInput source="pinpadMacAddress" label="Pinpad Mac Address" />
      <TextInput source="comPort" label="Com Port" />
      <TextInput source="ipAddress" label="Ip Address" validate={required()} />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const PosTerminalCreate = props => (
  <Create title="Create a POS Terminal" {...props}>
    <SimpleForm>
      <TextInput source="terminalName" label="Name" validate={required()} />
      <TextInput source="refNo" label="Ref No" />
      <TextInput source="pinpadIpPort" label="Pinpad Ip Port" />
      <TextInput source="pinpadMacAddress" label="Pinpad Mac Address" />
      <TextInput source="comPort" label="Com Port" />
      <TextInput
        source="ipAddress"
        label="Ip Address"
        helperText="0.0.0.1"
        validate={required()}
      />
    </SimpleForm>
  </Create>
);

export const PosTerminalDelete = props => (
  <Delete {...props} title={<PosTerminalTitle />} />
);
