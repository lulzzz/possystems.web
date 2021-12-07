import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showNotification } from 'react-admin';
import CircularProgress from '@material-ui/core/CircularProgress';
import { push } from 'connected-react-router';
import { httpClient } from '../authProvider';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import pink from '@material-ui/core/colors/pink';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = {
  button: {
    fontWeight: 'bold',
    backgroundColor: pink[500],
    color: '#fff',
    '&:hover': {
      backgroundColor: pink[900],
    },
  },
};

const StyledButton = withStyles(styles)(({ classes, ...props }) => (
  <Button className={classes.button} {...props} />
));

class ParamDownloadButton extends Component {
  state = {
    progressing: false,
  };

  handleClick = () => {
    const { showNotification } = this.props;

    this.setState({ progressing: true });
    showNotification('Downloading params. Please wait...', 'info');

    var $this = this;

    httpClient('api/paramdownload', { method: 'GET' })
      .then(response => {
        return response;
      })
      .then(function(params) {
        $this.setState({ progressing: false });
        showNotification('Params downloaded.', 'info');
      })
      .catch(e => {
        $this.setState({ progressing: false });
        showNotification('Error: Params downloading failed.', 'warning');
      });
  };

  render() {
    const {
      state: { progressing },
    } = this;

    return (
      <StyledButton
        variant="contained"
        startIcon={
          progressing ? (
            <CircularProgress size={25} thickness={2} />
          ) : (
            <GetAppIcon />
          )
        }
        onClick={this.handleClick}
      >
        Params
      </StyledButton>
    );
  }
}

ParamDownloadButton.propTypes = {
  push: PropTypes.func,
  record: PropTypes.object,
  showNotification: PropTypes.func,
};

export default connect(null, {
  showNotification,
  push,
})(ParamDownloadButton);
