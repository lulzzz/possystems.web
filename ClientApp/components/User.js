import React from 'react';
import {
  required,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
} from 'react-admin';

import Icon from '@material-ui/icons/SupervisorAccount';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const UserIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const UserList = props => (
  <List {...props} title="User" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="userName" label="User Name" />
      <TextField source="displayName" label="Display Name" />
      <TextField source="fullName" label="Full Name" />
      <TextField source="designation" label="Designation" />
      <TextField source="contactNo" label="Phone" />
      <TextField source="email" label="Email Address" />
      <TextField source="address" label="Full Address" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserTitle = ({ record }) => {
  return <span>User - {record ? `${record.userName}` : ''}</span>;
};

export const UserEdit = props => (
  <Edit title={<UserTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="userName" label="User Name" />
      <TextInput source="barcode" label="Barcode" />
      <TextInput
        source="password"
        label="Password"
        type="password"
        validate={required()}
      />
      <TextInput
        source="displayName"
        label="Display Name"
        validate={required()}
      />
      <TextInput source="fullName" label="Full Name" />
      <TextInput source="designation" label="Designation" />
      <TextInput source="contactNo" label="Phone" validate={required()} />
      <TextInput source="email" label="Email Address" type="email" />
      <TextInput source="address" label="Full Address" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const UserCreate = props => (
  <Create title="Create a User" {...props}>
    <SimpleForm>
      <TextInput source="userName" label="User Name" validate={required()} />
      <TextInput source="barcode" label="Barcode" />
      <TextInput
        source="password"
        label="Password"
        type="password"
        validate={required()}
      />
      <TextInput
        source="displayName"
        label="Display Name"
        validate={required()}
      />
      <TextInput source="fullName" label="Full Name" />
      <TextInput source="designation" label="Designation" />
      <TextInput source="contactNo" label="Phone" validate={required()} />
      <TextInput source="email" label="Email Address" type="email" />
      <TextInput source="address" label="Full Address" />
    </SimpleForm>
  </Create>
);

export const UserDelete = props => <Delete {...props} title={<UserTitle />} />;
