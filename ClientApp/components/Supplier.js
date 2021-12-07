import React from 'react';
import {
  required,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  UrlField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
} from 'react-admin';

import Icon from '@material-ui/icons/LocalShipping';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const SupplierIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const SupplierList = props => (
  <List {...props} title="Suppliers" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="supplierName" label="Name" />
      <TextField source="city" label="City" />
      <TextField source="state" label="State" />
      <TextField source="zip" label="Zip" />
      <TextField source="country" label="Country" />
      <TextField source="phone" label="Phone" sortable={false} />
      <TextField source="fax" label="Fax" sortable={false} />
      <UrlField source="website" label="Website" sortable={false} />
      <TextField source="contactPerson" label="Contact" sortable={false} />
      <TextField source="email" label="Email" sortable={false} />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const SupplierTitle = ({ record }) => {
  return <span>Supplier - {record ? `${record.supplierName}` : ''}</span>;
};

export const SupplierEdit = props => (
  <Edit title={<SupplierTitle />} {...props}>
    <SimpleForm>
      <TextInput source="supplierName" label="Name" validate={required()} />
      <TextInput multiline source="address1" label="Address1" />
      <TextInput multiline source="address2" label="Address2" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="website" label="Website" type="url" />
      <TextInput source="city" label="City" />
      <TextInput source="state" label="State" />
      <TextInput source="zip" label="Zip" />
      <TextInput source="country" label="Country" />
      <TextInput source="contactPerson" label="Contact" />
      <TextInput source="email" label="Email" type="email" />
      <TextInput source="fax" label="Fax" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const SupplierCreate = props => (
  <Create title="Create a Supplier" {...props}>
    <SimpleForm>
      <TextInput source="supplierName" label="Name" validate={required()} />
      <TextInput multiline source="address1" label="Address1" />
      <TextInput multiline source="address2" label="Address2" />
      <TextInput source="phone" label="Phone" />
      <TextInput source="website" label="Website" type="url" />
      <TextInput source="city" label="City" />
      <TextInput source="state" label="State" />
      <TextInput source="zip" label="Zip" />
      <TextInput source="country" label="Country" />
      <TextInput source="contactPerson" label="Contact" />
      <TextInput source="email" label="Email" type="email" />
      <TextInput source="fax" label="Fax" />
    </SimpleForm>
  </Create>
);

export const SupplierDelete = props => (
  <Delete {...props} title={<SupplierTitle />} />
);
