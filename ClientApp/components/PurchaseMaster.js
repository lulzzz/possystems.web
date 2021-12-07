import React from 'react';
import {
  Filter,
  ReferenceManyField,
  TabbedForm,
  FormTab,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  NumberField,
  DateField,
  EditButton,
  Edit,
  Create,
  DateInput,
  NumberInput,
  TextInput,
  ReferenceInput,
  SelectInput,
} from 'react-admin';

import Icon from '@material-ui/icons/ShoppingCart';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const PurchaseMasterIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

const PurchaseMasterFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Purchase Number" source="q" alwaysOn />
  </Filter>
);

export const PurchaseMasterList = props => (
  <List {...props} title="Purchases" filters={<PurchaseMasterFilter />}>
    <Datagrid>
      <TextField source="supplier" label="Supplier" />
      <TextField source="payMethod" label="Payment Method" />
      <DateField source="purchaseDate" label="Date" />
      <NumberField source="payment" label="Payment" />
      <NumberField source="due" label="Due" />
      <TextField source="purchaseMethod" label="Purchase Method" />
      <EditButton />
    </Datagrid>
  </List>
);

const PurchaseMasterTitle = ({ record }) => {
  return <span>Purchase</span>;
};

export const PurchaseMasterEdit = props => (
  <Edit title={<PurchaseMasterTitle />} {...props}>
    <TabbedForm>
      <FormTab label="Purchase">
        <ReferenceInput
          label="Supplier"
          source="supplierId"
          reference="suppliers"
          perPage={100}
          sort={{ field: 'supplierName', order: 'ASC' }}
        >
          <SelectInput optionText="supplierName" />
        </ReferenceInput>
        <TextInput source="payMethod" label="Payment Method" />
        <DateInput source="purchaseDate" label="Date" />
        <NumberInput source="payment" label="Payment" />
        <NumberInput source="due" label="Due" />
        <TextInput disabled source="purchaseMethod" label="Purchase Method" />

        <TextInput disabled source="status" label="Is Active?" />
        <DateField source="createdDate" label="Created Date" showTime />
        <TextInput disabled source="createdBy" label="Created By" />
        <DateField source="modifiedDate" label="Last Modified Date" showTime />
        <TextInput disabled source="modifiedBy" label="Last Modified By" />
      </FormTab>
      <FormTab label="Details">
        <ReferenceManyField
          addLabel={false}
          reference="purchasedetails"
          target="id"
        >
          <Datagrid>
            <TextField source="product" label="Product" />
            <NumberField source="quantity" label="Quantity" />
            <NumberField source="price" label="Price" />
            <NumberField source="returnAmount" label="Return Amount" />
            <TextField source="returnType" label="Return Type" />
            <TextField source="reason" label="Reason" />

            <TextField source="status" label="Status" />
            <DateField source="createdDate" label="Created Date" />
          </Datagrid>
        </ReferenceManyField>
      </FormTab>
    </TabbedForm>
  </Edit>
);

export const PurchaseMasterCreate = props => (
  <Create title="Create a Purchase" {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Supplier"
        source="supplierId"
        reference="suppliers"
        perPage={100}
        sort={{ field: 'supplierName', order: 'ASC' }}
      >
        <SelectInput optionText="supplierName" />
      </ReferenceInput>
      <TextInput source="payMethod" label="Payment Method" />
      <DateInput
        source="purchaseDate"
        label="Purchase Date"
        options={{
          mode: 'landscape',
          minDate: new Date(),
          defaultDate: new Date(),
          disableYearSelection: true,
          hintText: 'Default is today',
          okLabel: 'OK',
          cancelLabel: 'Cancel',
        }}
      />
      <NumberInput source="payment" label="Payment" />
      <NumberInput source="due" label="Due" />
      <TextInput source="purchaseMethod" label="Purchase Method" />
    </SimpleForm>
  </Create>
);

export const PurchaseMasterDelete = props => (
  <Delete {...props} title={<PurchaseMasterTitle />} />
);
