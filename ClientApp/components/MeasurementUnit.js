import React from 'react';
import {
  SimpleForm,
  List,
  Datagrid,
  TextField,
  DateField,
  EditButton,
  Edit,
  Create,
  TextInput,
  RichTextField,
  required,
} from 'react-admin';

import Icon from '@material-ui/icons/Assessment';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const MeasurementUnitIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

export const MeasurementUnitList = props => (
  <List {...props} title="Measurement Units" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="measurementName" label="Units" />
      <RichTextField
        source="description"
        label="Description"
        sortable={false}
      />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />
      <EditButton />
    </Datagrid>
  </List>
);

const MeasurementUnitTitle = ({ record }) => {
  return (
    <span>Measurement Unit - {record ? `${record.measurementName}` : ''}</span>
  );
};

export const MeasurementUnitEdit = props => (
  <Edit title={<MeasurementUnitTitle />} {...props}>
    <SimpleForm>
      <TextInput source="measurementName" label="Unit" validate={required()} />
      <TextInput multiline source="description" label="Description" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const MeasurementUnitCreate = props => (
  <Create title="Create a Measurement Unit" {...props}>
    <SimpleForm>
      <TextInput source="measurementName" label="Unit" validate={required()} />
      <TextInput multiline source="description" label="Description" />
    </SimpleForm>
  </Create>
);

export const MeasurementUnitDelete = props => (
  <Delete {...props} title={<MeasurementUnitTitle />} />
);
