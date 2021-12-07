import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification } from 'react-admin';
import CircularProgress from '@material-ui/core/CircularProgress';
import { push } from 'connected-react-router';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';

const styles = {
  selectButton: {
    fontWeight: 'bold',
    backgroundColor: '#0288d1',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#01579b',
    },
  },
  importButton: {
    fontWeight: 'bold',
  },
};

class ImportButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0,
      progressing: false,
    };
  }

  checkMimeType = event => {
    const { showNotification } = this.props;

    //getting file object
    let files = event.target.files;
    //define message container
    let err = [];
    // list allow mime type
    const types = [
      '',
      'csv',
      'text/csv',
      'application/vnd.ms-excel',
      'application/csv',
      'text/x-csv',
      'application/x-csv',
      'text/comma-separated-values',
      'text/x-comma-separated-values',
    ];
    // loop access array
    for (var x = 0; x < files.length; x++) {
      // compare file type find doesn't matach
      if (types.every(type => files[x].type !== type)) {
        // create error message and assign to container
        err[x] = files[x].type + ' is not a supported format\n';
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      showNotification(err[z], 'warning');
      event.target.value = null;
      return false;
    }

    return true;
  };

  maxSelectFile = event => {
    const { showNotification } = this.props;
    let files = event.target.files; // create file object
    if (files.length > 3) {
      const msg = 'Only 1 images can be uploaded at a time';
      event.target.value = null; // discard selected file
      showNotification(msg, 'warning');
      return false;
    }

    return true;
  };

  checkFileSize = event => {
    const { showNotification } = this.props;
    let files = event.target.files;
    let size = 5000000;
    let err = [];
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].type + 'is too large, please pick a smaller file\n';
      }
    }
    for (var z = 0; z < err.length; z++) {
      // if message not same old that mean has error
      // discard selected file
      showNotification(err[z], 'warning');
      event.target.value = null;
      return false;
    }
    return true;
  };

  onChangeHandler = event => {
    var files = event.target.files;
    if (
      this.maxSelectFile(event) &&
      this.checkMimeType(event) &&
      this.checkFileSize(event)
    ) {
      // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded: 0,
      });
    }
  };

  onClickHandler = event => {
    const { showNotification, url } = this.props;

    this.setState({ progressing: true });
    showNotification('pos.productImportWait', 'info');

    const data = new FormData();
    for (var x = 0; x < this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x]);
    }

    axios
      .post(url, data, {
        onUploadProgress: ProgressEvent => {
          this.setState({
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100,
          });
        },
      })
      .then(res => {
        this.setState({ progressing: false, selectedFile: null, loaded: 0 });
        showNotification('pos.productImported', 'info');
      })
      .catch(err => {
        this.setState({ progressing: false });
        showNotification('pos.productImportFailed', 'warning');
      });
  };

  render() {
    const {
      state: { progressing, selectedFile, loaded },
    } = this;
    return (
      <>
        <Button
          variant="contained"
          component="label"
          style={{ ...styles.selectButton, marginLeft: 5 }}
          startIcon={<AttachFileIcon />}
        >
          {selectedFile ? 'Files Selected' : 'Select File'}
          <input
            accept=".csv"
            type="file"
            style={{ display: 'none' }}
            onChange={this.onChangeHandler}
          />
        </Button>

        <Button
          variant="contained"
          color="default"
          disabled={!selectedFile}
          icon={
            progressing ? <CircularProgress size={25} thickness={2} /> : null
          }
          onClick={this.onClickHandler}
          style={{ ...styles.importButton, marginLeft: 5 }}
          startIcon={<CloudUploadIcon />}
        >
          Import
        </Button>

        {progressing && <LinearProgress />}
      </>
    );
  }
}

ImportButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(ImportButton);
