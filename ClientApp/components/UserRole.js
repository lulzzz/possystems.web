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
  AutocompleteInput,
  ReferenceInput,
  SelectInput,
  TextInput,
} from 'react-admin';

import Icon from '@material-ui/icons/PeopleOutline';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const UserRoleIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const UserRoleList = props => (
  <List {...props} title="User Role" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="userName" label="User Name" />
      <TextField source="roleName" label="Role Name" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const UserRoleTitle = ({ record }) => {
  return <span>User Role - {record ? `${record.userName}` : ''}</span>;
};

export const UserRoleEdit = props => (
  <Edit title={<UserRoleTitle />} {...props}>
    <SimpleForm>
      <TextInput disabled source="userName" label="User Name" />
      <ReferenceInput label="Role Name" source="roleId" reference="roles">
        <SelectInput optionText="roleName" />
      </ReferenceInput>
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const UserRoleCreate = props => (
  <Create title="Create an User Role" {...props}>
    <SimpleForm>
      <ReferenceInput label="User Name" source="userId" reference="users">
        <SelectInput optionText="userName" />
      </ReferenceInput>
      <ReferenceInput label="Role Name" source="roleId" reference="roles">
        <SelectInput optionText="roleName" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const UserRoleDelete = props => (
  <Delete {...props} title={<UserRoleTitle />} />
);
