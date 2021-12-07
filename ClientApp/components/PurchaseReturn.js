import React from 'react';
import {
  required,
  SimpleForm,
  NumberInput,
  DisabledInput,
  AutocompleteInput,
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
  SelectInput,
} from 'react-admin';

import Icon from '@material-ui/icons/RemoveShoppingCart';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const PurchaseReturnIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

export const PurchaseReturnList = props => (
  <List {...props} title="Purchase Returns">
    <Datagrid>
      <NumberField source="purchaseId" label="Purchase" />
      <TextField source="product" label="Product" />
      <NumberField source="quantity" label="Quantity" />
      <NumberField source="price" label="Price" />
      <NumberField source="returnAmount" label="Return Amount" />
      <TextField source="returnType" label="Return Type" />
      <TextField source="reason" label="Reason" />

      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const PurchaseReturnTitle = ({ record }) => {
  return <span>Purchase Return - {record ? `${record.id}` : ''}</span>;
};

export const PurchaseReturnEdit = props => (
  <Edit title={<PurchaseReturnTitle />} {...props}>
    <SimpleForm>
      <NumberInput source="purchaseId" label="Purchase" validate={required} />
      <TextInput source="upcScanCode" label="Upc Scan Code" />
      <TextInput multiline source="description" label="Description" />
      <NumberInput source="quantity" label="Quantity" validate={required} />
      <NumberInput source="price" label="Price" />
      <NumberInput source="returnAmount" label="Return Amount" />
      <ReferenceInput
        label="Reason"
        source="reasonId"
        reference="rejectreasons"
        perPage={100}
        sort={{ field: 'reason', order: 'ASC' }}
      >
        <SelectInput optionText="reason" />
      </ReferenceInput>
      <TextInput source="returnType" label="Return Type" />
      <TextInput disabled source="batchId" label="Batch" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const PurchaseReturnCreate = props => (
  <Create title="Create a Purchase Return" {...props}>
    <SimpleForm>
      <NumberInput source="purchaseId" label="Purchase" validate={required} />
      <TextInput source="upcScanCode" label="Upc Scan Code" />
      <TextInput multiline source="description" label="Description" />
      <NumberInput source="quantity" label="Quantity" validate={required} />
      <NumberInput source="price" label="Price" />
      <NumberInput source="returnAmount" label="Return Amount" />
      <ReferenceInput
        label="Reason"
        source="reasonId"
        reference="rejectreasons"
        perPage={100}
        sort={{ field: 'reason', order: 'ASC' }}
      >
        <SelectInput optionText="reason" />
      </ReferenceInput>
      <TextInput source="returnType" label="Return Type" />
    </SimpleForm>
  </Create>
);

export const PurchaseReturnDelete = props => (
  <Delete {...props} title={<PurchaseReturnTitle />} />
);
