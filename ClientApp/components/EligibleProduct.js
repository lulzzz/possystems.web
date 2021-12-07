import React from 'react';
import {
  TopToolbar,
  SimpleShowLayout,
  List,
  Datagrid,
  TextField,
  RichTextField,
  DateField,
  ShowButton,
  Show,
  TextInput,
  Filter,
  RefreshButton,
} from 'react-admin';
import Icon from '@material-ui/icons/BeachAccess';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const EligibleProductIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const EligibleProductFilter = props => (
  <Filter {...props}>
    <TextInput label="Search Name" source="searchName" alwaysOn />
    <TextInput label="Search UPC" source="q" alwaysOn />
  </Filter>
);

const EligibleProductActions = ({ basePath }) => (
  <TopToolbar style={cardActionStyle}>
    <RefreshButton />
  </TopToolbar>
);

export const EligibleProductList = props => (
  <List
    {...props}
    title="Eligible Products"
    actions={<EligibleProductActions />}
    filters={<EligibleProductFilter />}
    filter={{ status: 'A' }}
  >
    <Datagrid>
      <TextField source="id" label="UPC" />
      <TextField source="gtin" label="GTIN" />
      <RichTextField
        source="description"
        label="Description"
        sortable={false}
      />
      <TextField source="flc" label="flc" />
      <TextField
        source="categoryDescription"
        label="Category"
        sortable={false}
      />
      <TextField
        source="subCategoryDescription"
        label="Sub Category"
        sortable={false}
      />
      <TextField
        source="finestCategoryDescription"
        label="Finest Category"
        sortable={false}
      />
      <TextField source="manufacturerName" label="Manufacturer" />
      <TextField source="changeDate" label="Change Date" />
      <TextField source="changeIndicator" label="Change Indicator" />
      <DateField source="modifiedDate" label="Modified Date" />
      <ShowButton />
    </Datagrid>
  </List>
);

const EligibleProductTitle = ({ record }) => {
  return (
    <span>Eligible Product - {record ? `${record.description}` : ''}</span>
  );
};

export const EligibleProductShow = props => (
  <Show title={<EligibleProductTitle />} {...props}>
    <SimpleShowLayout>
      <TextField source="id" label="UPC" />
      <TextField source="gtin" label="GTIN" />
      <RichTextField
        source="description"
        label="Description"
        sortable={false}
      />
      <TextField source="flc" label="flc" />
      <TextField
        source="categoryDescription"
        label="Category Description"
        sortable={false}
      />
      <TextField
        source="subCategoryDescription"
        label="Sub Category Description"
        sortable={false}
      />
      <TextField
        source="finestCategoryDescription"
        label="Finest Category Description"
        sortable={false}
      />
      <TextField source="manufacturerName" label="Manufacturer" />
      <TextField source="changeDate" label="Change Date" />
      <TextField source="changeIndicator" label="Change Indicator" />
      <TextField source="createdBy" label="Created By" />
      <DateField source="createdDate" label="Created Date" />
      <TextField source="modifiedBy" label="Modified By" />
      <DateField source="modifiedDate" label="Modified Date" />
    </SimpleShowLayout>
  </Show>
);
