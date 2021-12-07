import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification as showNotificationAction } from 'react-admin';

//import FileSaver from 'file-saver';
//let download = require('./download.min');
//var fileDownload = require('react-file-download')
class GenerateButton extends Component {
  handleClick = () => {
    //console.log(this.props);
    const { record, showNotification } = this.props;
    const updatedRecord = { ...record, is_approved: true };
    fetch(`api/reports/${record.id}/file`, {
      method: 'GET',
      body: updatedRecord,
    })
      .then(response => {
        return response.blob();
      })
      .then(function(blob) {
        if (blob.type == 'application/ms-excel') {
          fileDownload(blob, `${record.reportName}.xlsx`);
        } else if (blob.type == 'application/pdf') {
          fileDownload(blob, `${record.reportName}.pdf`);
        }
      })
      .catch(e => {
        console.error(e);
        showNotification('Error: Report generation failed.', 'warning');
      });
  };

  render() {
    return <Button label="Generate" onClick={this.handleClick} />;
  }
}

GenerateButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification: showNotificationAction,
})(GenerateButton);
