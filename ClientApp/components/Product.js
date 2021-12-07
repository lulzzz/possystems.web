import React from 'react';
import {
  TopToolbar,
  CreateButton,
  Filter,
  ReferenceInput,
  NumberInput,
  NumberField,
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
  required,
  RefreshButton,
  SelectInput,
  useListContext,
  AutocompleteInput,
} from 'react-admin';

import Icon from '@material-ui/icons/LocalPharmacy';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

import ImportButton from '../custom/buttons/ImportButton';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const styles = {
  icon: {
    color: deepOrange[600],
  },
  cardActionStyle: {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
  },
};

export const ProductIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

const ProductTitle = ({ record }) => {
  return <span>Product {record ? `- ${record.productName}` : ''}</span>;
};

const Empty = () => {
  const { basePath, resource } = useListContext();
  return (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        No products available
      </Typography>
      <Typography variant="body1">Create one or import from a file</Typography>
      <CreateButton basePath={basePath} />
      <ImportButton url="api/products/import" />
    </Box>
  );
};

const ProductActions = ({ basePath }) => (
  <TopToolbar style={styles.cardActionStyle}>
    <CreateButton basePath={basePath} />
    <RefreshButton />
    <ImportButton url="api/products/import" />
  </TopToolbar>
);

const ProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Name" source="searchName" alwaysOn />
    <TextInput label="Search UPC scan code" source="Q" alwaysOn />
    <TextInput label="Search Category Name" source="searchCatName" alwaysOn />
  </Filter>
);

export const ProductList = props => (
  <List
    empty={<Empty />}
    {...props}
    title="Products"
    actions={<ProductActions />}
    filters={<ProductFilter />}
    filter={{ status: 'A' }}
  >
    <Datagrid>
      <TextField source="productName" label="Product" />
      <TextField source="upcCode" label="UPC Code" />
      <TextField source="upcScanCode" label="UPC Scan Code" />
      <NumberField source="quantity" label="Quantity" />
      <TextField source="measurementUnit" label="Units" />
      <TextField source="categoryName" label="Category" />
      <NumberField source="purchasePrice" label="Purchase Price" />
      <NumberField source="salesPrice" label="Sales Price" />
      <TextField source="taxIndStr" label="Is Taxable?" />
      <TextField source="supplier" label="Supplier" />
      <TextField source="status" label="Status" />
      <EditButton />
    </Datagrid>
  </List>
);

export const ProductEdit = props => (
  <Edit title={<ProductTitle />} {...props}>
    <SimpleForm>
      <TextInput source="productName" label="Name" validate={required()} />
      <TextInput multiline source="description" />
      <NumberInput source="quantity" label="Quantity" validate={required()} />
      <ReferenceInput
        label="Measurement"
        source="measurementId"
        validate={required()}
        reference="measurementunits"
        perPage={10}
        sort={{ field: 'measurementName', order: 'ASC' }}
      >
        <AutocompleteInput optionText="measurementName" />
      </ReferenceInput>
      <ReferenceInput
        label="Manufacturer"
        source="manufacturerId"
        reference="manufacturers"
        perPage={10}
        sort={{ field: 'name', order: 'ASC' }}
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="purchasePrice" label="Purchase Price" />
      <NumberInput
        source="salesPrice"
        label="Sales Price"
        validate={required()}
      />
      <ReferenceInput
        label="Category"
        source="categoryId"
        validate={required()}
        reference="productcategories"
        perPage={10}
        sort={{ field: 'categoryName', order: 'ASC' }}
      >
        <AutocompleteInput optionText="categoryName" />
      </ReferenceInput>
      <NumberInput source="minStock" label="Min Stock" />
      <NumberInput source="maxStock" label="Max Stock" />
      <NumberInput source="reorderLevel" label="Reorder Quantity" />
      <ReferenceInput
        label="Table"
        source="productPriceRangeId"
        reference="productpriceranges"
        sort={{ field: 'tableName', order: 'ASC' }}
        allowEmpty
      >
        <SelectInput optionText="tableName" />
      </ReferenceInput>
      <BooleanInput source="taxInd" label="Is Taxable?" />
      <ReferenceInput
        label="Supplier"
        source="supplierId"
        validate={required()}
        reference="suppliers"
        perPage={10}
        sort={{ field: 'supplierName', order: 'ASC' }}
      >
        <SelectInput optionText="supplierName" />
      </ReferenceInput>
      <TextInput source="upcCode" label="UPC Code" validate={required()} />
      <TextInput
        source="upcScanCode"
        label="UPC Scan Code"
        validate={required()}
      />
      <TextInput source="strength" label="Strength" />
      <NumberInput source="packageSize" label="Package Size" />
      <TextInput source="itemNo" label="Item No" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
      <TextField source="status" label="Status" />
    </SimpleForm>
  </Edit>
);

export const ProductCreate = props => (
  <Create title="Create a Product" {...props}>
    <SimpleForm>
      <TextInput source="productName" label="Name" validate={required()} />
      <TextInput multiline source="description" />
      <NumberInput source="quantity" label="Quantity" validate={required()} />
      <ReferenceInput
        label="Measurement"
        source="measurementId"
        validate={required()}
        reference="measurementunits"
        perPage={10}
        sort={{ field: 'measurementName', order: 'ASC' }}
      >
        <AutocompleteInput optionText="measurementName" />
      </ReferenceInput>
      <ReferenceInput
        label="Manufacturer"
        source="manufacturerId"
        reference="manufacturers"
        perPage={10}
        sort={{ field: 'name', order: 'ASC' }}
      >
        <SelectInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="purchasePrice" label="Purchase Price" />
      <NumberInput
        source="salesPrice"
        label="Sales Price"
        validate={required()}
      />
      <ReferenceInput
        label="Category"
        source="categoryId"
        validate={required()}
        reference="productcategories"
        perPage={10}
        sort={{ field: 'categoryName', order: 'ASC' }}
      >
        <AutocompleteInput optionText="categoryName" />
      </ReferenceInput>
      <NumberInput source="minStock" label="Min Stock" />
      <NumberInput source="maxStock" label="Max Stock" />
      <NumberInput source="reorderLevel" label="Reorder Quantity" />
      <ReferenceInput
        label="Table"
        source="productPriceRangeId"
        reference="productpriceranges"
        sort={{ field: 'tableName', order: 'ASC' }}
        allowEmpty
      >
        <SelectInput optionText="tableName" />
      </ReferenceInput>
      <BooleanInput source="taxInd" label="Is Taxable?" />
      <ReferenceInput
        label="Supplier"
        source="supplierId"
        validate={required()}
        reference="suppliers"
        perPage={10}
        sort={{ field: 'supplierName', order: 'ASC' }}
        allowEmpty
      >
        <SelectInput optionText="supplierName" />
      </ReferenceInput>
      <TextInput source="upcCode" label="UPC Code" validate={required()} />
      <TextInput
        source="upcScanCode"
        label="UPC Scan Code"
        validate={required()}
      />
      <TextInput source="strength" label="Strength" />
      <NumberInput source="packageSize" label="Package Size" />
      <TextInput source="itemNo" label="Item No" />
    </SimpleForm>
  </Create>
);

export const ProductDelete = props => (
  <Delete {...props} title={<ProductTitle />} />
);
