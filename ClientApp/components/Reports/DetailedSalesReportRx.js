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

class DetailedSalesReportRx extends Component {
  constructor(props) {
    super(props);

    const minDate = new Date();
    const maxDate = new Date();

    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);

    maxDate.setFullYear(minDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      permitted: false,
      minDate: minDate,
      maxDate: maxDate,
      posterminals: [],
      users: [],
    };
    this.getParsedDate = this.getParsedDate.bind(this);
  }

  handleTerminalChange = (event, value) => {
    this.setState({ terminalId: value });
  };

  handleUserChange = (event, value) => {
    this.setState({ userId: value });
  };

  handleChangeMinDate = event => {
    const {
      target: { value },
    } = event;
    this.setState(() => ({ minDate: value }));
  };

  handleChangeMaxDate = event => {
    const {
      target: { value },
    } = event;
    this.setState(() => ({ maxDate: value }));
  };

  getParsedDate = date => {
    date = String(date).split(' ');
    var days = String(date[0]).split('-');
    var hours = String(date[1]).split(':');
    return [
      parseInt(days[0]),
      parseInt(days[1]) - 1,
      parseInt(days[2]),
      parseInt(hours[0]),
      parseInt(hours[1]),
      parseInt(hours[2]),
    ];
  };

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  buildQueryString = (prefix, pdf) => {
    let userId = '',
      terminalId = '',
      supplierId = '';
    if (this.state.userId !== undefined) userId = this.state.userId.props.value;

    if (this.state.terminalId !== undefined)
      terminalId = this.state.terminalId.props.value;

    return `${prefix}terminalid=${terminalId}&userid=${userId}&startDate=${this.state.minDate}&endDate=${this.state.maxDate}${pdf}`;
  };

  handleClick = query => {
    const { showNotification } = this.props;
    axios
      .get(
        'api/detailedsalesreportrx/file' + this.buildQueryString('?', query),
        { responseType: 'blob' },
      )
      .then(function(res) {
        if (res.headers['content-type'] == 'application/ms-excel') {
          fileDownload(res.data, 'Detailed Sales Report-RX.xlsx');
        } else if (res.headers['content-type'] == 'application/pdf') {
          fileDownload(res.data, 'Detailed Sales Report-RX.pdf');
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
      .get('api/posterminals')
      .then(res => res.data)
      .then(json => {
        this.setState({ posterminals: json });
      });

    axios
      .get('api/users')
      .then(res => res.data)
      .then(json => {
        this.setState({ users: json });
      });
  }

  render() {
    return this.state.permitted ? (
      <Card>
        <Title title="Detailed Sales Report - RX" />
        <CardContent>
          <form>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              defaultValue={this.state.minDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeMinDate}
            />

            <br />
            <br />
            <TextField
              id="date"
              label="End Date"
              type="date"
              defaultValue={this.state.maxDate}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeMaxDate}
            />
            <br />
            <br />
            <TextField
              id="standard-select-terminal"
              select
              label="Select Terminal"
              onChange={this.handleTerminalChange}
              helperText="Please select your terminal"
              value={this.state.terminalId}
            >
              {this.state.posterminals.map(option => (
                <MenuItem key={option.terminalName} value={option.id}>
                  {option.terminalName}
                </MenuItem>
              ))}
            </TextField>
            <br />
            <br />

            <TextField
              id="standard-select-user"
              select
              label="Select User"
              onChange={this.handleUserChange}
              helperText="Please select your user"
              value={this.state.userId}
            >
              {this.state.users.map(option => (
                <MenuItem key={option.userName} value={option.id}>
                  {option.userName}
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

DetailedSalesReportRx.propTypes = {
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
})(DetailedSalesReportRx);
