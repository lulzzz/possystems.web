import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import {
  required,
  SimpleForm,
  List,
  Datagrid,
  TextInput,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  SelectInput,
  ReferenceInput,
  TopToolbar,
  CreateButton,
  RefreshButton,
  useListContext,
} from 'react-admin';

import Icon from '@material-ui/icons/PersonPinCircle';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';
import AssignButton from '../custom/buttons/AssignRoleClaims';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const RoleClaimIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

const RoleClaimActions = ({ basePath }) => (
  <TopToolbar style={styles.cardActionStyle}>
    <CreateButton basePath={basePath} />
    <RefreshButton />
    <AssignButton />
  </TopToolbar>
);

const Empty = () => {
  const { basePath, resource } = useListContext();
  return (
    <Box textAlign="center" m={1}>
      <Typography variant="h3" paragraph>
        No role claims available
      </Typography>
      <CreateButton basePath={basePath} />
      <AssignButton />
    </Box>
  );
};

export const RoleClaimList = props => (
  <List
    {...props}
    empty={<Empty />}
    title="Role Claim"
    actions={<RoleClaimActions />}
    filter={{ status: 'A' }}
  >
    <Datagrid>
      <TextField source="roleName" label="Role Name" />
      <TextField source="claimValue" label="Can Access" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const RoleClaimTitle = ({ record }) => {
  return <span>Role Claim</span>;
};

export const RoleClaimEdit = props => (
  <Edit title={<RoleClaimTitle />} {...props}>
    <SimpleForm>
      <ReferenceInput label="Role Name" source="roleId" reference="roles">
        <SelectInput optionText="roleName" />
      </ReferenceInput>
      <ReferenceInput
        label="Claim"
        source="claimValue"
        reference="claims"
        validate={required()}
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const RoleClaimCreate = props => (
  <Create title="Create an Role Claim" {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Role Name"
        source="roleId"
        reference="roles"
        allowEmpty
      >
        <SelectInput optionText="roleName" />
      </ReferenceInput>
      <ReferenceInput
        label="Claim"
        source="claimValue"
        reference="claims"
        validate={required()}
      >
        <SelectInput optionText="value" />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export const RoleClaimDelete = props => (
  <Delete {...props} title={<RoleClaimTitle />} />
);
