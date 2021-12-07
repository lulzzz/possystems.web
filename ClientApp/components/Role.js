import React from 'react';
import {
  required,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  RichTextField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
  LongTextInput,
} from 'react-admin';

import Icon from '@material-ui/icons/PersonPin';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const RoleIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const RoleList = props => (
  <List {...props} title="Role" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="roleName" label="Name" />
      <RichTextField
        source="description"
        label="Description"
        sortable={false}
      />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const RoleTitle = ({ record }) => {
  return <span>Role - {record ? `${record.roleName}` : ''}</span>;
};

export const RoleEdit = props => (
  <Edit title={<RoleTitle />} {...props}>
    <SimpleForm>
      <TextInput source="roleName" label="Name" validate={required()} />
      <TextInput multiline source="description" label="Description" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const RoleCreate = props => (
  <Create title="Create a Role" {...props}>
    <SimpleForm>
      <TextInput source="roleName" label="Name" validate={required()} />
      <TextInput multiline source="description" label="Description" />
    </SimpleForm>
  </Create>
);

export const RoleDelete = props => <Delete {...props} title={<RoleTitle />} />;
