import React, { Component } from 'react';
import {
  translate,
  ViewTitle,
  showNotification as showNotificationAction,
} from 'react-admin';

import Icon from '@material-ui/icons/AddShoppingCart';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  icon: {
    color: deepOrange[600],
  },
};

export const PurchaseExportIcon = withStyles(
  styles,
)(({ classes, ...props }) => <Icon className={classes.icon} {...props} />);

class PurchaseExport extends Component {
  constructor(props) {
    super(props);

    this._onRowSelection = this._onRowSelection.bind(this);
    this.exportClicked = this.exportClicked.bind(this);
  }

  state = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: true,
    height: '350px',
    chars: [],
    focused: false,
    inprogress: false,
    selectedRows: [],
    exportprogressing: false,
    supplierId: -1,
    suppliers: [],
  };

  handleChange = event => {
    this.setState({ height: event.target.value });
  };

  _handleKeyDown = event => {
    const { showNotification } = this.props;
    if (this.state.focused === false) {
      switch (event.keyCode) {
        case 13:
          this.setState({ inprogress: true });

          var upcCode = this.state.chars.join('');
          httpClient(`api/purchaseexport/${upcCode}`, { method: 'GET' })
            .then(response => {
              this.setState({ inprogress: false });

              var prod = response.json;

              var found = false;
              for (var i = 0; i < tableData.length; i++) {
                if (tableData[i].prodId == prod.id) {
                  found = true;
                  break;
                }
              }

              if (found) {
                showNotification('Already exists in the list.', 'warning');
                return;
              }

              tableData.push({
                prodId: prod.id,
                product: prod.product,
                pkgSize: prod.packageSize,
                itemNo: prod.itemNo,
                minStock: prod.minStock,
                curStock: prod.curStock,
                upcCode: prod.upcCode,
                reorderUnits: 1,
                ref: 'ref' + tableData.length,
              });

              this.state.chars = [];

              showNotification('Product found.');
            })
            .catch(e => {
              this.state.chars = [];

              this.setState({ inprogress: false });

              showNotification(e.message, 'warning');
            });
          break;
        default:
          if (event.keyCode >= 48 && event.keyCode <= 57) {
            this.state.chars.push(String.fromCharCode(event.keyCode));
          }
          break;
      }
    }
  };

  handleSupplierChange = (event, index, supplierId) => {
    this.setState({ supplierId: supplierId });
  };

  componentWillMount() {
    window.addEventListener('keydown', this._handleKeyDown);
  }

  componentDidMount() {
    const { showNotification } = this.props;
    this.setState({ inprogress: true });

    httpClient('api/suppliers?orderby=supplierName', { method: 'GET' })
      .then(response => {
        var suppliersJson = response.json;

        this.setState({ suppliers: suppliersJson });
        this.setState({ inprogress: false });
      })
      .catch(e => {
        this.setState({ inprogress: false });

        showNotification(e.message, 'warning');
      });
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleKeyDown);
  }

  onBlur() {
    this.setState({ focused: false });
  }

  onFocus() {
    this.setState({ focused: true });
  }

  cellClicked(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  onChange(event, ref) {
    if (event.target.value === '') {
      this.refs[ref].state.errorText = 'Required.';
    } else {
      this.refs[ref].state.errorText = '';
    }
  }

  exportClicked(e) {
    const { showNotification } = this.props;

    if (this.state.selectedRows.length == 0) {
      showNotification('No item checked for purchase.', 'warning');
      return;
    } else if (this.state.supplierId == -1) {
      showNotification('Please select a supplier', 'warning');
      return;
    }

    this.setState({ exportprogressing: true });

    var selectedItems = [];
    for (var i = 0; i < this.state.selectedRows.length; i++) {
      var item = tableData[i];
      selectedItems.push({
        upcCode: item.upcCode,
        reorderUnits: this.refs[item.ref].getValue(),
        vendorItemNo: item.itemNo,
      });
    }

    httpClient(`api/purchaseexport/${this.state.supplierId}`, {
      method: 'POST',
      body: JSON.stringify(selectedItems),
    })
      .then(response => {
        this.setState({ exportprogressing: false });

        showNotification('Success.');
      })
      .catch(e => {
        this.state.chars = [];

        this.setState({ exportprogressing: false });
        showNotification(e.message, 'warning');
      });
  }

  _onRowSelection(rows) {
    var srows = [];

    if (rows === 'all') {
      for (var i = 0; i < tableData.length; i++) {
        srows.push(i);
      }
    } else {
      srows = rows;
    }

    this.setState({ selectedRows: srows }, () =>
      this.tableBody.setState({ selectedRows: srows }),
    );
  }

  render() {
    const {
      state: { exportprogressing, inprogress },
    } = this;

    const lprops = {
      style: {
        visibility: inprogress ? 'visible' : 'hidden',
      },
      mode: 'indeterminate',
    };

    return (
      <Card>
        <ViewTitle title="Export Product Order" />

        <Button
          icon={
            exportprogressing ? (
              <CircularProgress size={25} thickness={2} />
            ) : (
              <ActionUpload />
            )
          }
          label="Export"
          labelPosition="before"
          primary={true}
          icon={<ActionUpload />}
          style={styles.buttonActionStyle}
          onClick={this.exportClicked}
        />

        <SelectField
          floatingLabelText="Supplier:"
          floatingLabelFixed={true}
          value={this.state.supplierId}
          onChange={this.handleSupplierChange}
          style={styles.supplierStyle}
        >
          {this.state.suppliers.map((supplierrow, index) => (
            <MenuItem
              value={supplierrow.id}
              key={supplierrow.id}
              primaryText={supplierrow.supplierName}
            />
          ))}
        </SelectField>

        <LinearProgress {...lprops} />

        <Table
          height={this.state.height}
          fixedHeader={true}
          fixedFooter={true}
          selectable={true}
          multiSelectable={true}
          onRowSelection={this._onRowSelection}
        >
          <TableHeader
            displaySelectAll={true}
            adjustForCheckbox={true}
            enableSelectAll={true}
          >
            <TableRow>
              <TableHeaderColumn style={{ width: '50px' }} tooltip="Order">
                Order
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '350px' }} tooltip="Product">
                Product
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: '100px' }} tooltip="Item">
                Item #
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="NDC">NDC #</TableHeaderColumn>
              <TableHeaderColumn tooltip="Pkg Size">Pkg Size</TableHeaderColumn>
              <TableHeaderColumn tooltip="Min Stock">
                Min Stock
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Cur Stock">
                Cur Stock
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="Reorder Units">
                Reorder Units
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={true}
            deselectOnClickaway={false}
            showRowHover={true}
            stripedRows={false}
            ref={tableBody => {
              this.tableBody = tableBody;
            }}
          >
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn style={{ width: '50px' }}>
                  {index}
                </TableRowColumn>
                <TableRowColumn style={{ width: '350px' }}>
                  {row.product}
                </TableRowColumn>
                <TableRowColumn style={{ width: '100px' }}>
                  {row.itemNo}
                </TableRowColumn>
                <TableRowColumn>{row.ndc}</TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>
                  {row.pkgSize}
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>
                  {row.minStock}
                </TableRowColumn>
                <TableRowColumn style={{ textAlign: 'center' }}>
                  {row.curStock}
                </TableRowColumn>
                <TableRowColumn>
                  <TextField
                    hintText="Type a number"
                    type="number"
                    onChange={e => this.onChange(e, row.ref)}
                    defaultValue={row.reorderUnits}
                    ref={row.ref}
                    onFocus={this.onFocus.bind(this)}
                    onBlur={this.onBlur.bind(this)}
                    onClick={this.cellClicked.bind(this)}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={true}>
            <TableRow>
              <TableRowColumn
                colSpan="7"
                style={{ textAlign: 'center' }}
              ></TableRowColumn>
              <TableRowColumn>Total Reorders</TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
    );
  }
}

PurchaseExport.propTypes = {
  showNotification: PropTypes.func,
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
  showNotification: showNotificationAction,
})(translate(PurchaseExport));
