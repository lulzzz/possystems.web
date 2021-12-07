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
  RichTextField,
  required,
} from 'react-admin';

import Icon from '@material-ui/icons/Business';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const ManufacturerIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const ManufacturerList = props => (
  <List {...props} title="Manufacturers" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="name" label="Name" />
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

const ManufacturerTitle = ({ record }) => {
  return <span>Manufacturer - {record ? `${record.name}` : ''}</span>;
};

export const ManufacturerEdit = props => (
  <Edit title={<ManufacturerTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
      <TextInput multiline source="description" label="Description" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const ManufacturerCreate = props => (
  <Create title="Create a Manufacturer" {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" validate={required()} />
      <TextInput multiline source="description" label="Description" />
    </SimpleForm>
  </Create>
);

export const ManufacturerDelete = props => (
  <Delete {...props} title={<ManufacturerTitle />} />
);
