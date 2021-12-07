import React from 'react';
import {
  Filter,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
  BooleanInput,
  BooleanField,
  required,
} from 'react-admin';

import Icon from '@material-ui/icons/Widgets';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const ProductCategoryIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

const ProductCategoryFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Category Name" source="q" alwaysOn />
  </Filter>
);

export const ProductCategoryList = props => (
  <List
    {...props}
    title="Product Categories"
    filters={<ProductCategoryFilter />}
    filter={{ status: 'A' }}
  >
    <Datagrid>
      <TextField source="categoryName" label="Name" />
      <BooleanField source="taxInd" label="Taxable?" />
      <BooleanField source="signatureReq" label="Signature Required?" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />

      <EditButton />
    </Datagrid>
  </List>
);

const ProductCategoryTitle = ({ record }) => {
  return (
    <span>Product Category - {record ? `${record.categoryName}` : ''}</span>
  );
};

export const ProductCategoryEdit = props => (
  <Edit title={<ProductCategoryTitle />} {...props}>
    <SimpleForm>
      <TextInput source="categoryName" label="Name" validate={required()} />
      <TextInput multiline source="description" label="Description" />
      <BooleanInput source="taxInd" label="Is Taxable?" />
      <BooleanInput source="signatureReq" label="Signature Required?" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const ProductCategoryCreate = props => (
  <Create title="Create a Product Category" {...props}>
    <SimpleForm>
      <TextInput source="categoryName" label="Name" validate={required()} />
      <TextInput multiline source="description" label="Description" />
      <BooleanInput source="taxInd" label="Is Taxable?" />
      <BooleanInput source="signatureReq" label="Signature Required?" />
    </SimpleForm>
  </Create>
);

export const ProductCategoryDelete = props => (
  <Delete {...props} title={<ProductCategoryTitle />} />
);
