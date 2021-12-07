import React from 'react';
import {
  SimpleForm,
  List,
  Datagrid,
  TextField,
  NumberField,
  EditButton,
  Edit,
  Create,
  ReferenceInput,
  AutocompleteInput,
  NumberInput,
  SelectInput,
} from 'react-admin';

import Icon from '@material-ui/icons/AspectRatio';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const PriceRangeIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const PriceRangeList = props => (
  <List {...props} title="Price Range" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="tableName" label="Table" />
      <NumberField source="minRange" label="Min Range" />
      <NumberField source="maxRange" label="Max Range" />
      <NumberField source="markup" label="Markup" />

      <EditButton />
    </Datagrid>
  </List>
);

const PriceRangeTitle = ({ record }) => {
  return <span>Price Range</span>;
};

export const PriceRangeEdit = props => (
  <Edit title={<PriceRangeTitle />} {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Table"
        source="productPriceRangeId"
        reference="productpriceranges"
        perPage={10}
        sort={{ field: 'tableName', order: 'ASC' }}
      >
        <SelectInput optionText="tableName" />
      </ReferenceInput>

      <NumberInput source="minRange" label="Min Range" />
      <NumberInput source="maxRange" label="Max Range" />
      <NumberInput source="markup" label="Markup" />
      <TextField source="status" label="Status" />
    </SimpleForm>
  </Edit>
);

export const PriceRangeCreate = props => (
  <Create title="Create a Price Range" {...props}>
    <SimpleForm>
      <ReferenceInput
        label="Table"
        source="productPriceRangeId"
        reference="productpriceranges"
        perPage={10}
        sort={{ field: 'tableName', order: 'ASC' }}
      >
        <SelectInput optionText="tableName" />
      </ReferenceInput>

      <NumberInput source="minRange" label="Min Range" />
      <NumberInput source="maxRange" label="Max Range" />
      <NumberInput source="markup" label="Markup" />
    </SimpleForm>
  </Create>
);

export const PriceRangeDelete = props => (
  <Delete {...props} title={<PriceRangeTitle />} />
);
