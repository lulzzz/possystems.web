import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { Title, showNotification } from 'react-admin';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import MenuItem from '@material-ui/core/MenuItem';

import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import XlsxIcon from '../../css/xlsx.svg';

import authProvider from '../../custom/authProvider';

var fileDownload = require('react-file-download');

import axios from 'axios';

const styles = {
  label: { width: '10em', display: 'inline-block' },
  button: { margin: '1em' },
};

class InventoryReport extends Component {
  constructor(props) {
    super(props);

    this.state = {
      permitted: false,
      productname: '',
      upcscancode: '',
      suppliers: [],
      productcategories: [],
    };
  }

  handleSupplierChange = (event, value) => {
    this.setState({
      supplierId: value,
    });
  };

  handleProductCategoryChange = (event, value) => {
    this.setState({
      productcategoryId: value,
    });
  };

  handleProductNameChange = value => {
    this.setState({
      productname: value,
    });
  };

  handleUPCScanCodeChange = value => {
    this.setState({
      upcscancode: value,
    });
  };

  buildQueryString = (prefix, pdf) => {
    let supplierId = '',
      productcategoryId = '';

    if (this.state.supplierId !== undefined)
      supplierId = this.state.supplierId.props.value;

    if (this.state.productcategoryId !== undefined)
      productcategoryId = this.state.productcategoryId.props.value;

    return `${prefix}supplierid=${supplierId}&productcategoryid=${productcategoryId}&productname=${this.state.productname}&upcscancode=${this.state.upcscancode}${pdf}`;
  };

  handleClick = query => {
    const { showNotification } = this.props;
    axios
      .get('api/inventoryreport/file' + this.buildQueryString('?', query), {
        responseType: 'blob',
      })
      .then(function(res) {
        if (res.headers['content-type'] == 'application/ms-excel') {
          fileDownload(res.data, 'Inventory Report.xlsx');
        } else if (res.headers['content-type'] == 'application/pdf') {
          fileDownload(res.data, 'Inventory Report.pdf');
        }
      })
      .catch(e => {
        showNotification('errors.reportGeneration', 'warning');
      });
  };

  hasPermission = async () => {
    const permissions = authProvider.getPermissions();
    let permitted = await permissions.then(p => p.includes('report'));
    this.setState({ permitted: permitted });
  };

  componentDidMount() {
    this.hasPermission();

    axios
      .get('api/suppliers')
      .then(res => res.data)
      .then(json => {
        this.setState({ suppliers: json });
      });

    axios
      .get('api/productcategories')
      .then(res => res.data)
      .then(json => {
        this.setState({ productcategories: json });
      });
  }

  render() {
    return this.state.permitted ? (
      <Card>
        <Title title="Inventory Report" />
        <CardContent>
          <form>
            <TextField
              id="product-name"
              label="Product Name"
              placeholder="Product Name"
              value={this.state.productname}
              onChange={this.handleProductNameChange}
            />
            <br />
            <br />
            <TextField
              id="upc-scan-code"
              label="UPC Scan Code"
              placeholder="UPC Scan Code"
              value={this.state.upcscancode}
              onChange={this.handleUPCScanCodeChange}
            />
            <br />
            <br />
            <TextField
              id="standard-select-supplier"
              select
              label="Select Supplier"
              onChange={this.handleSupplierChange}
              helperText="Please select your supplier"
              value={this.state.supplierId}
            >
              {this.state.suppliers.map(option => (
                <MenuItem key={option.supplierName} value={option.id}>
                  {option.supplierName}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />
            <TextField
              id="standard-select-supplier"
              select
              label="Select Product Category"
              onChange={this.handleProductCategoryChange}
              helperText="Please select your product category"
              value={this.state.productcategoryId}
            >
              {this.state.productcategories.map(option => (
                <MenuItem key={option.categoryName} value={option.id}>
                  {option.categoryName}
                </MenuItem>
              ))}
            </TextField>
            <br />

            <Button
              style={styles.button}
              label="Excel"
              color="default"
              variant="contained"
              onClick={() => this.handleClick('')}
            >
              <img
                src={XlsxIcon}
                alt="Xlsx"
                width={20}
                style={{ marginRight: 10 }}
              />
              Excel
            </Button>
            <Button
              style={styles.button}
              label="Pdf"
              color="default"
              variant="contained"
              info="true"
              onClick={() => this.handleClick('&isPdf=True')}
              startIcon={<PictureAsPdfIcon />}
            >
              Pdf
            </Button>
          </form>
        </CardContent>
      </Card>
    ) : (
      <Card>
        <Title title="Not Authorized" />
        <CardContent>
          <h1>Access not authorized</h1>
        </CardContent>
      </Card>
    );
  }
}

InventoryReport.propTypes = {
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
})(InventoryReport);
