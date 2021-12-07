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

class TimesheetReport extends Component {
  constructor(props) {
    super(props);

    const startTime = new Date();
    const endTime = new Date();

    startTime.setFullYear(startTime.getFullYear());
    startTime.setHours(0, 0, 0, 0);

    endTime.setFullYear(endTime.getFullYear());
    endTime.setHours(0, 0, 0, 0);

    this.state = {
      permitted: false,
      startTime,
      endTime,
      users: [],
      userId: '',
      validationMessage: '',
    };
  }

  handleUserChange = event => {
    const {
      target: { value },
    } = event;
    this.setState(() => ({ userId: value }));
  };

  handleChangeStartTime = event => {
    const {
      target: { value },
    } = event;
    this.setState(() => ({ startTime: value }));
  };

  handleChangeEndTime = event => {
    const {
      target: { value },
    } = event;
    this.setState(() => ({ endTime: value }));
  };

  buildQueryString = (prefix, pdf) => {
    const { userId, startTime, endTime } = this.state;
    return `${prefix}userId=${userId}&startTime=${startTime}&endTime=${endTime}${pdf}`;
  };

  validateTime = () => {
    if (this.state.endTime < this.state.startTime) {
      this.setState({
        validationMessage: 'Start time cannot be greater than end time.',
      });
      return false;
    } else {
      this.setState({ validationMessage: '' });
      return true;
    }
  };

  handleClick = query => {
    if (this.validateTime()) {
      const { showNotification } = this.props;
      axios
        .get('api/timesheetreport/file' + this.buildQueryString('?', query), {
          responseType: 'blob',
        })
        .then(function(res) {
          if (res.headers['content-type'] == 'application/ms-excel') {
            fileDownload(res.data, 'Timesheet Report.xlsx');
          } else if (res.headers['content-type'] == 'application/pdf') {
            fileDownload(res.data, 'Timesheet Report.pdf');
          }
        })
        .catch(e => {
          showNotification('errors.reportGeneration', 'warning');
        });
    }
  };

  hasPermission = async () => {
    const permissions = authProvider.getPermissions();
    let permitted = await permissions.then(p => p.includes('report'));
    this.setState({ permitted: permitted });
  };

  componentDidMount() {
    this.hasPermission();

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
        <Title title="Timesheet Report" />
        <CardContent>
          <form>
            <TextField
              label="Start Time"
              type="datetime-local"
              defaultValue={this.state.startTime}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeStartTime}
            />
            <p style={{ color: 'red' }}>{this.state.validationMessage}</p>
            <br />
            <TextField
              label="End Time"
              type="datetime-local"
              defaultValue={this.state.endTime}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleChangeEndTime}
            />
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

TimesheetReport.propTypes = {
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
})(TimesheetReport);
