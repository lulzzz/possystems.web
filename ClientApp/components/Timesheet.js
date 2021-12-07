import React from 'react';
import {
  SimpleForm,
  List,
  Datagrid,
  TextField,
  DateField,
  DateTimeInput,
  EditButton,
  Edit,
  Filter,
  Create,
  TextInput,
  ReferenceInput,
  SelectInput,
  required,
} from 'react-admin';

import Icon from '@material-ui/icons/ViewList';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const TimesheetIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

const TimesheetFilter = props => (
  <Filter {...props}>
    <ReferenceInput
      label="User"
      source="Q"
      reference="users"
      perPage={10}
      sort={{ field: 'userName', order: 'ASC' }}
      alwaysOn
    >
      <SelectInput optionText="userName" />
    </ReferenceInput>
    <DateTimeInput source="startTime" label="Start Time" />
    <DateTimeInput source="endTime" label="End Time" />
  </Filter>
);

export const TimesheetList = props => (
  <List
    {...props}
    title="Timesheets"
    filters={<TimesheetFilter />}
    filter={{ status: 'A' }}
    sort={{ field: 'startTime', order: 'ASC' }}
  >
    <Datagrid>
      <TextField source="username" label="Username" />
      <DateField source="startTime" label="Start Time" showTime />
      <DateField source="endTime" label="End Time" showTime />
      <TextField source="createdBy" label="Created By" />
      <TextField source="modifiedBy" label="Modified By" />
      <EditButton />
    </Datagrid>
  </List>
);

const TimesheetTitle = ({ record }) => {
  return <span>Edit/Delete a timesheet session</span>;
};

export const TimesheetEdit = props => (
  <Edit title={<TimesheetTitle />} {...props}>
    <SimpleForm>
      <ReferenceInput
        label="User"
        source="userId"
        validate={required()}
        reference="users"
        perPage={10}
        sort={{ field: 'userName', order: 'ASC' }}
      >
        <SelectInput optionText="userName" />
      </ReferenceInput>
      <DateTimeInput source="startTime" label="Start Time" />
      <DateTimeInput source="endTime" label="End Time" />
      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const TimesheetCreate = props => (
  <Create title="Create a timesheet session" {...props}>
    <SimpleForm>
      <ReferenceInput
        label="User"
        source="userId"
        validate={required()}
        reference="users"
        perPage={10}
        sort={{ field: 'userName', order: 'ASC' }}
      >
        <SelectInput optionText="userName" />
      </ReferenceInput>
      <DateTimeInput source="startTime" label="Start Time" />
      <DateTimeInput source="endTime" label="End Time" />
    </SimpleForm>
  </Create>
);

export const TimesheetDelete = props => (
  <Delete {...props} title={<TimesheetTitle />} />
);
