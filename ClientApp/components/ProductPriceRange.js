import React from 'react';
import {
  SelectInput,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
  required,
} from 'react-admin';

import Icon from '@material-ui/icons/Assistant';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const ProductPriceRangeIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

const ProductPriceRangeTitle = ({ record }) => {
  return (
    <span>Product Price Range - {record ? `${record.tableName}` : ''}</span>
  );
};

export const ProductPriceRangeList = props => (
  <List {...props} title="Product Price Ranges">
    <Datagrid>
      <TextField source="tableName" label="Table" />
      <TextField source="costPreference" label="Cost Preference" />

      <EditButton />
    </Datagrid>
  </List>
);

export const ProductPriceRangeEdit = props => (
  <Edit title={<ProductPriceRangeTitle />} {...props} filter={{ status: 'A' }}>
    <SimpleForm>
      <TextInput source="tableName" label="Table" validate={required()} />
      <SelectInput
        source="costPreference"
        label="Cost Preference"
        choices={[
          { id: 'Q', name: 'Acquisition' },
          { id: 'W', name: 'AWP' },
        ]}
        validate={required()}
      />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const ProductPriceRangeCreate = props => (
  <Create title="Create a Product Price Range" {...props}>
    <SimpleForm>
      <TextInput source="tableName" label="Table" validate={required()} />
      <SelectInput
        source="costPreference"
        label="Cost Preference"
        validate={required()}
        choices={[
          { id: 'Q', name: 'Acquisition' },
          { id: 'W', name: 'AWP' },
        ]}
      />
    </SimpleForm>
  </Create>
);

export const ProductPriceRangeDelete = props => (
  <Delete {...props} title={<PriceRangeTitle />} />
);
