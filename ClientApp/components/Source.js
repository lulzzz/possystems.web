import React from 'react';
import {
  NumberInput,
  choices,
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
  ReferenceInput,
} from 'react-admin';

import Icon from '@material-ui/icons/Storage';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const SourceIcon = withStyles(styles)(({ classes, ...props }) => (
  <Icon className={classes.icon} {...props} />
));

export const SourceList = props => (
  <List {...props} title="Sources" filter={{ status: 'A' }}>
    <Datagrid>
      <TextField source="fileType" label="File Type" />
      <TextField source="supplierName" label="Supplier" />
      <TextField source="hostAddress" label="Host" />
      <TextField source="status" label="Status" />
      <DateField source="createdDate" label="Created Date" />

      <EditButton />
    </Datagrid>
  </List>
);

const SourceTitle = ({ record }) => {
  return <span>Source</span>;
};

export const SourceEdit = props => (
  <Edit title={<SourceTitle />} {...props}>
    <SimpleForm>
      <SelectInput
        label="File Type"
        source="fileType"
        choices={[
          { id: 'Edi832', name: 'Edi832' },
          { id: 'Edi850', name: 'Edi850' },
          { id: 'Edi855', name: 'Edi855' },
          { id: 'CSV', name: 'CSV' },
          { id: 'ZIP', name: 'ZIP' },
        ]}
        validation={choices(
          ['Edi832', 'Edi850', 'Edi855', 'CSV', 'ZIP'],
          'Must be Edi832 or Edi850 or Edi855 or CSV or ZIP',
        )}
      />
      <TextInput
        source="hostAddress"
        label="Host Address"
        validate={required()}
      />
      <TextInput source="userName" label="Username" />
      <TextInput source="password" label="Password" />
      <NumberInput source="port" label="Port" />
      <TextInput source="hostKey" label="Key" />
      <TextInput source="uploadPath" label="Upload Path" />
      <TextInput source="downloadPath" label="Download Path" />
      <TextInput source="wildcard" label="Wildcard" />
      <TextInput source="localPath" label="Local Path" validate={required()} />
      <TextInput source="subLocalPath" label="Sub Local Path" />
      <TextInput source="processingPath" label="Processing Path" />
      <TextInput source="interchangeSenderId" label="Interchange Sender Id" />
      <TextInput
        source="interchangeReceiverId"
        label="Interchange Receiver Id"
      />
      <TextInput source="employeeId" label="Employee Id" />
      <TextInput source="vendorCustomerNo" label="Vendor Customer No" />
      <ReferenceInput
        label="Supplier"
        source="supplierId"
        reference="suppliers"
        perPage={10}
        sort={{ field: 'supplierName', order: 'ASC' }}
        validate={required()}
      >
        <SelectInput optionText="supplierName" />
      </ReferenceInput>
      <TextInput source="fieldSeperator" label="Field Seperator" />

      <TextInput disabled source="status" label="Is Active?" />
      <DateField source="createdDate" label="Created Date" showTime />
      <TextInput disabled source="createdBy" label="Created By" />
      <DateField source="modifiedDate" label="Last Modified Date" showTime />
      <TextInput disabled source="modifiedBy" label="Last Modified By" />
    </SimpleForm>
  </Edit>
);

export const SourceCreate = props => (
  <Create title="Create a Source" {...props}>
    <SimpleForm>
      <SelectInput
        label="File Type"
        source="fileType"
        choices={[
          { id: 'Edi832', name: 'Edi832' },
          { id: 'Edi850', name: 'Edi850' },
          { id: 'Edi855', name: 'Edi855' },
          { id: 'CSV', name: 'CSV' },
          { id: 'ZIP', name: 'ZIP' },
        ]}
        validation={choices(
          ['Edi832', 'Edi850', 'Edi855', 'CSV', 'ZIP'],
          'Must be Edi832 or Edi850 or Edi855 OR CSV or ZIP',
        )}
      />
      <TextInput
        source="hostAddress"
        label="Host Address"
        validate={required()}
      />
      <TextInput source="userName" label="Username" />
      <TextInput source="password" label="Password" />
      <NumberInput source="port" label="Port" />
      <TextInput source="hostKey" label="Key" />
      <TextInput source="uploadPath" label="Upload Path" />
      <TextInput source="downloadPath" label="Download Path" />
      <TextInput source="wildcard" label="Wildcard" />
      <TextInput source="localPath" label="Local Path" validate={required()} />
      <TextInput source="subLocalPath" label="Sub Local Path" />
      <TextInput source="processingPath" label="Processing Path" />
      <TextInput source="interchangeSenderId" label="Interchange Sender Id" />
      <TextInput
        source="interchangeReceiverId"
        label="Interchange Receiver Id"
      />
      <TextInput source="employeeId" label="Employee Id" />
      <TextInput source="vendorCustomerNo" label="Vendor Customer No" />
      <ReferenceInput
        label="Supplier"
        source="supplierId"
        reference="suppliers"
        perPage={10}
        sort={{ field: 'supplierName', order: 'ASC' }}
        validate={required()}
      >
        <SelectInput optionText="supplierName" />
      </ReferenceInput>
      <TextInput source="fieldSeperator" label="Field Seperator" />
    </SimpleForm>
  </Create>
);

export const SourceDelete = props => (
  <Delete {...props} title={<SourceTitle />} />
);
