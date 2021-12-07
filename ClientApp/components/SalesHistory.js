import React from 'react';
import {
  TopToolbar,
  ImageField,
  ListButton,
  DateInput,
  TextInput,
  Filter,
  NumberField,
  ReferenceManyField,
  Show,
  Tab,
  TabbedShowLayout,
  List,
  Datagrid,
  TextField,
  DateField,
  ShowButton,
  RefreshButton,
} from 'react-admin';

import PrintInvoiceButton from '../custom/buttons/PrintInvoiceButton';
import Icon from '@material-ui/icons/AccountBalance';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const SalesHistoryIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

const SalesHistoryFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="q" alwaysOn />
    <DateInput label="Sales Date" source="salesDate" />
  </Filter>
);

export const SalesHistoryList = props => (
  <List {...props} title="Sales History" filters={<SalesHistoryFilter />}>
    <Datagrid>
      <TextField source="invoiceNo" label="Invoice No" />
      <TextField source="status" label="Status" />
      <DateField source="salesDate" label="Sales Date" />
      <TextField source="grandTotal" label="Total" />
      <TextField source="salesTax" label="Tax" />
      <TextField source="totalDiscount" label="Discount" />
      <ShowButton />
    </Datagrid>
  </List>
);

const SalesHistoryTitle = ({ record }) => {
  return (
    <span>
      Sales history of Invoice No.: {record ? `${record.invoiceNo}` : ''}
    </span>
  );
};

const SalesActions = ({ data, basePath, refresh }) => (
  <TopToolbar>
    <PrintInvoiceButton record={data} />
    <ListButton basePath={basePath} />
    <RefreshButton />
  </TopToolbar>
);

export const SalesHistoryShow = props => (
  <Show title={<SalesHistoryTitle />} actions={<SalesActions />} {...props}>
    <TabbedShowLayout>
      <Tab label="General">
        <DateField source="salesDate" label="Sales Date" />
        <TextField source="grandTotal" label="Total" />
        <TextField source="salesTax" label="Tax" />
        <TextField source="totalDiscount" label="Discount Total" />
        <TextField
          source="discountPercentage"
          label="Overall Discount Percentage"
        />
        <TextField source="terminal.terminalName" label="Terminal" />
        <TextField source="pointsEarned" label="Points Earned" />
        <TextField source="pointsRedeemed" label="Points Redeemed" />
        <TextField source="invoiceRedeemAmount" label="Redeemed Amount" />

        <ReferenceManyField
          label="Details"
          reference="salesdetails"
          target="id"
        >
          <Datagrid selectable="false">
            <TextField source="product" label="Product" />
            <TextField source="refPrescriptionId" label="Rx" />
            <NumberField source="quantity" label="Quantity" />
            <NumberField source="unitPriceAfterTax" label="Price" />
            <TextField source="upcCode" label="UPC Code" />
            <NumberField
              source="discountItemPercentage"
              label="Discount Percentage"
            />
            <NumberField source="itemTotalDiscount" label="Total Discount" />
          </Datagrid>
        </ReferenceManyField>

        <ReferenceManyField
          label="Transactions"
          reference="transactions"
          target="id"
        >
          <Datagrid selectable="false">
            <NumberField source="amount" label="Amount" />
            <TextField source="payMethod" label="Pay Method" />
            <TextField source="transactionType" label="Transaction Type" />
            <TextField source="cardType" label="Card Type" />
            <TextField source="maskedAcct" label="Masked Acct" />
            <TextField source="token" label="Token" />
          </Datagrid>
        </ReferenceManyField>
      </Tab>
      <Tab label="Signature">
        <ImageField source="signature" label="Signature" />
      </Tab>
    </TabbedShowLayout>
  </Show>
);
