import React from 'react';
import {
  Filter,
  required,
  SimpleForm,
  NumberInput,
  List,
  Datagrid,
  NumberField,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
} from 'react-admin';

import Icon from '@material-ui/icons/AddShoppingCart';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const PurchaseDetailIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

const PurchaseDetailFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Upc Scan Code" source="q" alwaysOn />
    <TextInput
      label="Search product name"
      source="searchProductName"
      alwaysOn
    />
  </Filter>
);

export const PurchaseDetailList = props => (
  <List {...props} title="Purchase Details" filters={<PurchaseDetailFilter />}>
    <Datagrid>
      <TextField source="purchaseId" label="Purchase Id" />
      <TextField source="product" label="Product" />
      <NumberField source="quantity" label="Quantity" />
      <NumberField source="price" label="Price" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const PurchaseDetailTitle = ({ record }) => {
  return <span>Purchase Detail</span>;
};

export const PurchaseDetailEdit = props => (
  <Edit title={<PurchaseDetailTitle />} {...props}>
    <SimpleForm>
      <NumberInput
        source="purchaseId"
        label="Purchase ID"
        validate={required}
      />
      <TextInput source="upcScanCode" label="Upc Scan Code" />
      <NumberInput source="quantity" label="Quantity" validate={required} />
      <NumberInput source="price" label="Price" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const PurchaseDetailCreate = props => (
  <Create title="Create a Purchase Detail" {...props}>
    <SimpleForm>
      <NumberInput
        source="purchaseId"
        label="Purchase ID"
        validate={required}
      />
      <TextInput source="upcScanCode" label="Upc Scan Code" />
      <NumberInput source="quantity" label="Quantity" validate={required} />
      <NumberInput source="price" label="Price" />
    </SimpleForm>
  </Create>
);

export const PurchaseDetailDelete = props => (
  <Delete {...props} title={<PurchaseDetailTitle />} />
);
