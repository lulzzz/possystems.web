import React from 'react';
import {
  Filter,
  EmailField,
  SimpleForm,
  List,
  Datagrid,
  TextField,
  NumberInput,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
  required,
} from 'react-admin';

import Icon from '@material-ui/icons/NaturePeople';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const CustomerIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

const CustomerFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Card Number" source="q" alwaysOn />
    <TextInput label="Search Name" source="searchName" alwaysOn />
  </Filter>
);

export const CustomerList = props => (
  <List
    {...props}
    title="Customers"
    filters={<CustomerFilter />}
    filter={{ status: 'A' }}
  >
    <Datagrid>
      <TextField source="customerName" label="Name" />
      <TextField source="phone" label="Phone" />
      <EmailField source="email" label="Email" />
      <TextField source="loyaltyCardNumber" label="Loyalty Card Number" />
      <TextField source="loyaltyPointEarned" label="Loyalty Point Earned" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />

      <EditButton />
    </Datagrid>
  </List>
);

const CustomerTitle = ({ record }) => {
  return <span>Customer - {record ? `${record.customerName}` : ''}</span>;
};

export const CustomerEdit = props => (
  <Edit title={<CustomerTitle />} {...props}>
    <SimpleForm>
      <TextInput source="customerName" label="Name" validate={required()} />
      <TextInput source="phone" label="Phone" validate={required()} />
      <TextInput source="email" label="Email" validate={required()} />
      <TextInput
        source="loyaltyCardNumber"
        label="Loyalty Card Number"
        validate={required()}
      />
      <TextField source="initialPointRewarded" label="Initial Point Rewarded" />
      <TextField source="loyaltyPointEarned" label="Loyalty Point Earned" />
      <TextField source="dollarAmountSpend" label="Dollar Amount Spend" />

      <NumberInput
        source="redeemThresholdPoint"
        label="Redeem Threshold Point"
      />
      <NumberInput
        source="dollarPointConversionRatio"
        label="Dollar to Point Conversion Ratio"
      />
      <NumberInput
        source="pointDollarConversionRatio"
        label="Point to Dollar Conversion Ratio"
      />

      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const CustomerCreate = props => (
  <Create title="Create a customer" {...props}>
    <SimpleForm>
      <TextInput source="customerName" label="Name" validate={required()} />
      <TextInput source="phone" label="Phone" validate={required()} />
      <TextInput source="email" label="Email" validate={required()} />
      <TextInput
        source="loyaltyCardNumber"
        label="Loyalty Card Number"
        validate={required()}
      />
    </SimpleForm>
  </Create>
);

export const CustomerDelete = props => (
  <Delete {...props} title={<CustomerTitle />} />
);
